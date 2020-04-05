<template>
  <nav
    class="navigation bg-vgreen shadow-md flex justify-between items-center p-5 md:fixed md:left-0 md:h-screen md:w-1/3 md:max-w-xxs md:flex-col md:items-stretch md:justify-center"
  >
    <Logo />
    <div class="hidden md:block">
      <NavList />
    </div>
    <button @click="toggleBurgerNav" class="md:hidden">
      <Burger v-if="!burgerNavOpen" class="w-8 h-8" />
      <Exit v-else class="w-8 h-8" />
    </button>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Navigation',
  components: {
    Logo: () => import(/*webpackChunkName: 'logo'*/ '~/components/Logo'),
    Burger: () =>
      import(/*webpackChunkName: 'burger'*/ '~/assets/img/menu.svg'),
    Exit: () => import(/*webpackChunkName: 'exit'*/ '~/assets/img/exit.svg'),
    NavList: () =>
      import(/*webpackChunkName: 'nav-list'*/ '~/components/NavList')
  },
  methods: {
    toggleBurgerNav() {
      this.$store.dispatch('setBurgerNavSlide', !this.burgerNavOpen)
    }
  },
  computed: {
    ...mapGetters(['burgerNavOpen'])
  }
}
</script>

<style scoped>
</style>