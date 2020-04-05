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
      >
        <nuxt-link :to="{name: 'signup'}" class="block">Sign Up</nuxt-link>
      </li>
      <li
        class="uppercase text-lg mb-2 p-2 text-vblue rounded-sm font-semibold hover:bg-vgreen hover:text-white md:transition-colors md:duration-200"
        :class="{'bg-vgreen': $route.name === 'signin'}"
      >
        <nuxt-link :to="{name: 'signin'}" class="block">Sign In</nuxt-link>
      </li>
      <li
        class="uppercase text-lg mb-2 p-2 text-vblue rounded-sm font-semibold hover:bg-vgreen hover:text-white md:transition-colors md:duration-200"
        :class="{'bg-vgreen': $route.name === 'dashboard'}"
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
        class="uppercase text-lg mb-2 p-2 text-vblue rounded-sm font-semibold hover:bg-vgreen hover:text-white md:transition-colors md:duration-200"
        :class="{'bg-vgreen': $route.name === 'contact'}"
      >
        <nuxt-link :to="{name: 'contact'}" class="block">Contact</nuxt-link>
      </li>
    </div>
    <li class="text-white md:ml-2">
      <button @click="logout" class="uppercase bg-vblue py-2 rounded-sm w-full">Logout</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'NavList',
  methods: {
    logout() {}
  }
}
</script>

<style scoped>
.nuxt-link-exact-active {
  @apply text-white;
}
</style>