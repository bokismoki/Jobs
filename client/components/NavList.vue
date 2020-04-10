<template>
  <ul class="nav-list md:pt-10 md:h-full md:flex md:flex-col md:justify-between">
    <div>
      <li
        class="uppercase text-lg mb-2 p-2 text-vblue rounded-sm font-semibold hover:bg-vgreen hover:text-white md:transition-colors md:duration-200"
        :class="{'bg-vgreen': $route.name === 'index'}"
      >
        <nuxt-link :to="{name: 'index'}" class="block">Home</nuxt-link>
      </li>
      <li
        class="uppercase text-lg mb-2 p-2 text-vblue rounded-sm font-semibold hover:bg-vgreen hover:text-white md:transition-colors md:duration-200"
        :class="{'bg-vgreen': $route.name === 'signup'}"
        v-if="!loggedIn"
      >
        <nuxt-link :to="{name: 'signup'}" class="block">Sign Up</nuxt-link>
      </li>
      <li
        class="uppercase text-lg mb-2 p-2 text-vblue rounded-sm font-semibold hover:bg-vgreen hover:text-white md:transition-colors md:duration-200"
        :class="{'bg-vgreen': $route.name === 'signin'}"
        v-if="!loggedIn"
      >
        <nuxt-link :to="{name: 'signin'}" class="block">Sign In</nuxt-link>
      </li>
      <li
        class="uppercase text-lg mb-2 p-2 text-vblue rounded-sm font-semibold hover:bg-vgreen hover:text-white md:transition-colors md:duration-200"
        :class="{'bg-vgreen': $route.name === 'dashboard'}"
        v-if="admin"
      >
        <nuxt-link :to="{name: 'dashboard'}" class="block">Dashboard</nuxt-link>
      </li>
      <li
        class="uppercase text-lg mb-2 p-2 text-vblue rounded-sm font-semibold hover:bg-vgreen hover:text-white md:transition-colors md:duration-200"
        :class="{'bg-vgreen': $route.name === 'jobs'}"
      >
        <nuxt-link :to="{name: 'jobs'}" class="block">Jobs</nuxt-link>
      </li>
      <li
        v-if="loggedIn"
        class="uppercase text-sm pl-8 mb-2 -mt-3 p-2 text-vblue rounded-sm font-semibold hover:bg-vgreen hover:text-white md:transition-colors md:duration-200 md:-mt-6"
        :class="{'bg-vgreen': $route.name === 'jobs-create'}"
      >
        <nuxt-link :to="{name: 'jobs-create'}" class="block">Create</nuxt-link>
      </li>
      <li
        class="uppercase text-lg mb-2 p-2 text-vblue rounded-sm font-semibold hover:bg-vgreen hover:text-white md:transition-colors md:duration-200"
        :class="{'bg-vgreen': $route.name === 'contact'}"
      >
        <nuxt-link :to="{name: 'contact'}" class="block">Contact</nuxt-link>
      </li>
    </div>
    <li v-if="loggedIn" class="text-white md:ml-2">
      <button @click="logout" class="uppercase bg-vblue py-2 rounded-sm w-full">Logout</button>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NavList',
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$store.dispatch('setBurgerNavOpen', false)
      localStorage.removeItem('jwtToken')
    }
  },
  computed: {
    ...mapGetters(['loggedIn', 'admin'])
  }
}
</script>

<style scoped>
.nuxt-link-exact-active {
  @apply text-white;
}
</style>