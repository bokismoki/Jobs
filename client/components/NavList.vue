<template>
  <ul class="nav-list md:mt-10">
    <li
      class="uppercase text-lg mb-2 p-2 text-vblue rounded-sm font-semibold hover:bg-vgreen hover:text-white"
    >
      <nuxt-link :to="{name: 'index'}" class="block">Home</nuxt-link>
    </li>
    <li
      class="uppercase text-lg mb-2 p-2 text-vblue rounded-sm font-semibold hover:bg-vgreen hover:text-white"
    >
      <nuxt-link :to="{name: 'signup'}" class="block">Sign Up</nuxt-link>
    </li>
    <li
      class="uppercase text-lg mb-2 p-2 text-vblue rounded-sm font-semibold hover:bg-vgreen hover:text-white"
    >
      <nuxt-link :to="{name: 'signin'}" class="block">Sign In</nuxt-link>
    </li>
    <li
      class="uppercase text-lg mb-2 p-2 text-vblue rounded-sm font-semibold hover:bg-vgreen hover:text-white"
    >
      <nuxt-link :to="{name: 'dashboard'}" class="block">Dashboard</nuxt-link>
    </li>
    <li
      class="uppercase text-lg mb-2 p-2 text-vblue rounded-sm font-semibold hover:bg-vgreen hover:text-white"
    >
      <nuxt-link :to="{name: 'jobs'}" class="block">Jobs</nuxt-link>
    </li>
    <li
      class="uppercase text-lg mb-2 p-2 text-vblue rounded-sm font-semibold hover:bg-vgreen hover:text-white"
    >
      <nuxt-link :to="{name: 'contact'}" class="block">Contact</nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'NavList'
}
</script>

<style scoped>
.nuxt-link-exact-active {
  @apply text-white;
}
</style>