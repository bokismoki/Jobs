<template>
  <form
    class="signup-form mt-10 max-w-sm mx-auto lg:max-w-md xl:max-w-lg"
    @submit.prevent="register"
  >
    <div class="mt-3">
      <label class="block mb-1 text-white text-sm font-semibold" for="comp-name">
        Company name:
        <StarHighlight />
      </label>
      <input
        class="rounded-sm px-2 py-1 w-full placeholder-vblue"
        id="comp-name"
        type="text"
        placeholder="company name"
        v-model="company.name"
      />
    </div>
    <div class="mt-3">
      <label class="block mb-1 text-white text-sm font-semibold" for="comp-email">
        Company email:
        <StarHighlight />
      </label>
      <input
        class="rounded-sm px-2 py-1 w-full placeholder-vblue"
        id="comp-email"
        type="email"
        placeholder="company email"
        v-model="company.email"
      />
    </div>
    <div class="mt-3">
      <label class="block mb-1 text-white text-sm font-semibold" for="comp-location">
        Company location:
        <StarHighlight />
      </label>
      <input
        class="rounded-sm px-2 py-1 w-full placeholder-vblue"
        id="comp-location"
        type="text"
        placeholder="country and/or city name"
        v-model="company.location"
      />
    </div>
    <div class="mt-3">
      <label class="block mb-1 text-white text-sm font-semibold" for="comp-size">
        Company size:
        <StarHighlight />
      </label>

      <select class="p-1" id="comp-size" v-model="company.size">
        <option value>N/A</option>
        <option value="SM">SM (1-20)</option>
        <option value="MD">MD (21-100)</option>
        <option value="LG">LG (101+)</option>
      </select>
    </div>
    <div class="mt-3">
      <label class="block mb-1 text-white text-sm font-semibold" for="password">
        Password:
        <StarHighlight />
      </label>
      <input
        class="rounded-sm px-2 py-1 w-full placeholder-vblue"
        id="password"
        type="password"
        placeholder="password"
        v-model="company.password"
      />
    </div>
    <div class="mt-3">
      <label class="block mb-1 text-white text-sm font-semibold" for="password-confirm">
        Confirm Password:
        <StarHighlight />
      </label>
      <input
        class="rounded-sm px-2 py-1 w-full placeholder-vblue"
        id="password-confirm"
        type="password"
        placeholder="confirm password"
        v-model="company.confirmPassword"
      />
    </div>
    <button
      class="bg-vgreen text-white px-5 py-2 rounded-sm mt-5 uppercase text-sm font-bold tracking-wider"
      type="submit"
    >Register</button>
    <nuxt-link class="text-xs block mt-1 text-white opacity-75" :to="{name: 'signin'}">
      Already have an account?
      <span class="text-vgreen">Login</span>
    </nuxt-link>
  </form>
</template>

<script>
export default {
  name: 'SignupForm',
  components: {
    StarHighlight: () =>
      import(
        /*webpackChunkName: 'star-highlight'*/ '~/components/StarHighlight'
      )
  },
  data() {
    return {
      company: {
        name: '',
        email: '',
        location: '',
        size: 'MD',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    register() {}
  }
}
</script>

<style scoped>
</style>