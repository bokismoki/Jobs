<template>
  <div class="jobs px-5 py-10 sm:px-10 md:py-13 leading-snug">
    <h1
      class="text-white uppercase tracking-wider font-semibold text-xl xl:text-3xl xl:leading-none xl:text-center"
    >Search for job offers</h1>
    <Filters class="mt-10" />
    <div
      class="dgrid mx-auto lg:grid lg:content-center lg:grid-cols-2 lg:mt-5"
      :class="{'xl:grid-cols-1': filteredJobs.length === 0}"
    >
      <p v-if="filteredJobs.length === 0" class="text-white font-semibold mt-5 xl:text-center">
        There are no jobs.
        <br />Make sure to login if you want to create one.
      </p>
      <template v-else>
        <JobItem v-for="job in filteredJobs" :key="job.id" :job="job" />
      </template>
    </div>
    <button
      class="bg-vgreen text-white px-5 py-2 rounded-sm mt-20 uppercase text-sm table mx-auto font-bold tracking-wider xl:text-lg"
      :class="{'opacity-75': nothingToLoad}"
      :disabled="nothingToLoad"
      @click="loadMore"
    >{{loading ? 'Loading...' : 'Load more...'}}</button>
    <p
      class="text-white text-center mt-3 uppercase tracking-wide font-semibold transition-opacity duration-500"
      :class="{'opacity-0 cursor-default': !nothingToLoadP}"
    >There are no more jobs to be loaded</p>
  </div>
</template>

<!-- <nuxt-link v-if="loggedIn" :to="{name: 'jobs-create'}">Create New Job Post</nuxt-link> -->
<script>
import { mapGetters } from 'vuex'

export default {
  head: {
    title: 'Jobs'
  },
  components: {
    JobItem: () =>
      import(/*webpackChunkName: 'job-item'*/ '~/components/JobItem'),
    Filters: () =>
      import(/*webpackChunkName: 'filters'*/ '~/components/Filters')
  },
  data() {
    return {
      skip: 1,
      loading: false,
      nothingToLoad: false,
      nothingToLoadP: false
    }
  },
  methods: {
    async loadMore() {
      this.loading = true
      const jobs = await this.$axios.get(`/job?skip=${this.skip}`)
      const { data } = jobs
      if (data.length) {
        this.$store.dispatch('addJobs', data)
        this.skip++
      } else {
        this.nothingToLoad = true
        this.nothingToLoadP = true
        setTimeout(() => {
          this.nothingToLoadP = false
        }, 5000)
      }
      this.loading = false
    }
  },
  computed: {
    ...mapGetters(['loggedIn', 'filteredJobs'])
  },
  created() {
    this.$store.dispatch('setFilter', '')
  }
}
</script>

<style scoped>
@media (min-width: 1024px) {
  .dgrid {
    max-width: 950px;
  }
}
</style>