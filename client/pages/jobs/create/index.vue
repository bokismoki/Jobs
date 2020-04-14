<template>
  <div class="jobs-create px-5 py-10 sm:px-10 md:py-13">
    <h1
      class="text-white uppercase tracking-wider font-semibold text-xl xl:text-3xl xl:leading-none xl:text-center"
    >Create new job offer</h1>
    <JobForm />
  </div>
</template>

<script>
export default {
  head: {
    title: 'Create New Job'
  },
  components: {
    JobForm: () =>
      import(/*webpackChunkName: 'job-form'*/ '~/components/JobForm')
  },
  asyncData({ store, redirect }) {
    if (!store.getters.loggedIn) {
      redirect({ name: 'index' })
    }
  }
}
</script>

<style scoped>
</style>