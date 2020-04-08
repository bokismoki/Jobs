<template>
  <nuxt-link :to="{name: 'index'}" class="logo flex items-end">
    <Jhook class="w-8 h-8 md:w-10 md:h-10 xl:w-12 xl:h-12" fill="#fff" />
    <h1
      class="text-white font-semibold text-2xl tracking-wide uppercase leading-none -ml-1.5 xl:text-3xl"
    >obs Pool</h1>
  </nuxt-link>
</template>

<script>
export default {
  name: 'Logo',
  components: {
    Jhook: () => import(/*webpackChunkName: 'jhook'*/ '~/assets/img/J-hook.svg')
  }
}
</script>

<style scoped>
</style>