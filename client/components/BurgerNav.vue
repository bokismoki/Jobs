<template>
  <nav class="burger-nav absolute w-full bg-white p-5">
    <NavList />
  </nav>
</template>

<script>
export default {
  name: 'BurgerNav',
  components: {
    NavList: () =>
      import(/*webpackChunkName: 'nav-list'*/ '~/components/NavList')
  }
}
</script>

<style scoped>
.burger-nav {
  top: 72px;
}
</style>