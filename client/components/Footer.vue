<template>
  <footer class="footer text-white pb-10 px-5 md:pb-13">
    <h1 class="text-center font-semibold uppercase">Stay updated</h1>
    <div class="flex items-center justify-center mt-3">
      <a href="#" class="flex items-center">
        <Facebook class="w-5 h-5" />
        <span class="font-semibold text-sm ml-2">Facebook</span>
      </a>
      <a href="#" class="flex items-center ml-6">
        <Instagram class="w-5 h-5" />
        <span class="font-semibold text-sm ml-2">Instagram</span>
      </a>
    </div>
    <div class="text-sm font-semibold text-center mt-5">
      <span>For questions and/or suggestions, please</span>
      <nuxt-link class="uppercase text-xs text-vgreen" :to="{name: 'contact'}">contact us</nuxt-link>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  components: {
    Facebook: () =>
      import(/*webpackChunkName: 'facebook'*/ '~/assets/img/facebook.svg'),
    Instagram: () =>
      import(/*webpackChunkName: 'instagram'*/ '~/assets/img/instagram.svg')
  }
}
</script>

<style scoped>
</style>