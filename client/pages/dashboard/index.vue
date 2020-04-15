<template>
  <div class="dashboard px-5 py-10 sm:px-10 md:py-13">
    <h1
      class="text-white uppercase tracking-wider font-semibold leading-snug text-xl lg:text-center xl:leading-none xl:text-3xl"
    >Admin Dashboard</h1>
    <div class="bg-white max-w-screen mt-10 py-5 -mx-5 px-5 sm:px-10 sm:-mx-10">
      <p v-if="jobs.length === 0" class="font-semibold">No jobs to be approved</p>
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
  methods: {
    splice(payload) {
      this.jobs.splice(payload, 1)
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