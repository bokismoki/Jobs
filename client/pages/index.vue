<template>
  <div class="home px-5 py-10 sm:px-10 md:py-13">
    <NewestJobsPreview :jobs="jobs.slice(0, 3)" />
    <SomethingAboutUs />
    <nuxt-link
      class="relative bg-white text-vgreen font-black rounded text-sm table mt-10 px-5 py-2 mx-auto uppercase lg:px-10 lg:py-4 lg:text-lg"
      :to="{name: 'jobs'}"
    >Get Hired Now!</nuxt-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  head: {
    title: 'Home'
  },
  components: {
    NewestJobsPreview: () =>
      import(
        /*webpackChunkName: 'newest-jobs-preview'*/ '~/components/NewestJobsPreview'
      ),
    SomethingAboutUs: () =>
      import(
        /*webpackChunkName: 'something-about-us'*/ '~/components/SomethingAboutUs'
      )
  },
  computed: {
    ...mapGetters(['jobs'])
  }
}
</script>

<style scoped>
a::before {
  @apply absolute text-white;
  content: '-->';
  left: -25px;
}
a::after {
  @apply absolute text-white;
  content: '<--';
  right: -25px;
}
@media (min-width: 1024px) {
  a::before {
    @apply text-xl;
    left: -45px;
    content: '--->';
    top: 50%;
    transform: translateY(-50%);
  }
  a::after {
    @apply text-xl;
    right: -45px;
    content: '<---';
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
