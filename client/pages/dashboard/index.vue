<template>
  <div class="dashboard px-5 py-10 sm:px-10 md:py-13">
    <h1
      class="text-white uppercase tracking-wider font-semibold leading-snug text-xl lg:text-center xl:leading-none xl:text-3xl"
    >Admin Dashboard</h1>
    <div class="max-w-screen mt-10 py-5 -mx-5 px-5 sm:px-10 sm:-mx-10">
      <form @submit.prevent="deleteCompany">
        <div>
          <label class="block mb-1 text-white text-sm font-semibold" for="company">Company ID:</label>
          <input
            class="rounded-sm px-2 py-1 placeholder-vblue inline-block w-56"
            type="text"
            id="company"
            placeholder="Company ID"
            v-model="id"
          />
        </div>
        <button
          class="bg-vgreen text-white px-5 py-2 rounded-sm mt-5 uppercase text-sm font-bold tracking-wider"
          type="submit"
        >Delete Company</button>
      </form>
    </div>
    <div class="bg-white max-w-screen mt-10 py-5 -mx-5 px-5 sm:px-10 sm:-mx-10">
      <p v-if="jobs.length === 0" class="font-semibold text-vblue">No jobs to be approved</p>
      <div v-else class="grid xl:grid-cols-2 xl:mx-auto">
        <AdminJobItem
          :job="job"
          :index="index"
          v-for="(job, index) in jobs"
          :key="job.id"
          @approved="splice"
          @removed="splice"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Admin Dashboard'
  },
  components: {
    AdminJobItem: () =>
      import(/*webpackChunkName: 'admin-job-item'*/ '~/components/AdminJobItem')
  },
  data() {
    return {
      id: ''
    }
  },
  methods: {
    splice(payload) {
      this.jobs.splice(payload, 1)
    },
    async deleteCompany() {
      try {
        const response = await this.$axios.delete(`/company/${this.id}`, {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
          }
        })
        if (response.status === 200) {
          this.$store.dispatch('setPopupMsg', {
            success: true,
            msg: 'Company account succesffully deleted'
          })
        }
      } catch (err) {
        console.error(err)
        if (err.response.data.statusCode === 404) {
          this.$store.dispatch('setPopupMsg', {
            success: false,
            msg: err.response.data.message
          })
        } else {
          this.$store.dispatch('setPopupMsg', {
            success: false,
            msg: 'Error while deleting company account'
          })
        }
        this.id = ''
      }
    }
  },
  async asyncData({ $axios, store, redirect }) {
    if (!store.getters.admin) {
      redirect({ name: 'index' })
    }
    const jobs = await $axios.get('/job/admin', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
      }
    })
    return {
      jobs: jobs.data
    }
  }
}
</script>

<style scoped>
.dashboard {
  min-height: 80vh;
}

.grid {
  max-width: 950px;
}
</style>