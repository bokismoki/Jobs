<template>
  <div class="admin-job-item text-vblue font-semibold mb-5 md:max-w-sm md:mx-auto">
    <div class="text-xs mb-2">{{$moment(job.created_at).fromNow()}}</div>
    <div class="flex items-start">
      <img
        class="w-1/3 rounded shadow mb-5 mr-2"
        :src="`https://jobs-it-server.herokuapp.com/api/job/${job.image_path}`"
        :alt="job.image_path"
      />
      <div class="w-2/3">
        <h1 class="break-all text-lg">{{job.company.name}}</h1>
        <a
          :href="job.company.site"
          rel="noopener"
          target="_blank"
          class="break-all text-sm underline"
        >{{job.company.site}}</a>
      </div>
    </div>
    <h1 class="text-lg mt-5">{{job.title}}</h1>
    <a
      :href="job.job_link"
      rel="noopener"
      target="_blank"
      class="text-sm break-all underline"
    >{{job.job_link}}</a>
    <p class="text-sm">{{job.description}}</p>
    <div class="mt-5">
      <button @click="approve(job.id)" class="bg-vgreen text-white rounded px-3 py-1">Approve</button>
      <button @click="remove(job.id)" class="ml-5 bg-red-600 text-white rounded px-3 py-1">Remove</button>
    </div>
    <div class="bg-black h-px opacity-25 mt-5"></div>
  </div>
</template>

<script>
export default {
  name: 'AdminJobItem',
  props: ['job', 'index'],
  methods: {
    async approve(id) {
      try {
        const response = await this.$axios.patch(
          `/job/${id}/approve`,
          { email: this.job.company.email },
          {
            headers: {
              'content-type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
            }
          }
        )
        if (response.status === 200) {
          this.$emit('approved', this.index)
          this.$store.dispatch('setPopupMsg', {
            success: true,
            msg: 'Job post approved'
          })
        }
      } catch (err) {
        console.error(err)
        this.$store.dispatch('setPopupMsg', {
          success: false,
          msg: 'Error while approving job post'
        })
      }
    },
    async remove(id) {
      try {
        const response = await this.$axios.delete(`/job/${id}`, {
          data: {
            email: this.job.company.email
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
          }
        })
        if (response.status === 200) {
          this.$emit('removed', this.index)
          this.$store.dispatch('setPopupMsg', {
            success: true,
            msg: 'Job post removed'
          })
        }
      } catch (err) {
        console.error(err)
        this.$store.dispatch('setPopupMsg', {
          success: false,
          msg: 'Error while removing job post'
        })
      }
    }
  }
}
</script>

<style scoped>
</style>