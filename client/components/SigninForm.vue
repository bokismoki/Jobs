<template>
  <form class="signin-form mt-10 max-w-sm mx-auto lg:max-w-md xl:max-w-lg" @submit.prevent="login">
    <div class="mt-3">
      <label class="block mb-1 text-white text-sm font-semibold" for="comp-email">
        Email:
        <span class="text-vgreen font-black">*</span>
      </label>
      <input
        class="rounded-sm px-2 py-1 w-full placeholder-vblue"
        id="comp-email"
        type="email"
        placeholder="email"
        v-model="company.email"
      />
    </div>
    <div class="mt-3">
      <label class="block mb-1 text-white text-sm font-semibold" for="password">
        Password:
        <span class="text-vgreen font-black">*</span>
      </label>
      <input
        class="rounded-sm px-2 py-1 w-full placeholder-vblue"
        id="password"
        type="password"
        placeholder="password"
        v-model="company.password"
      />
    </div>
    <button
      class="bg-vgreen text-white px-5 py-2 rounded-sm mt-5 uppercase text-sm font-bold tracking-wider"
      type="submit"
    >Login</button>
    <nuxt-link class="text-xs block mt-1 text-white opacity-75" :to="{name: 'signup'}">
      Don't have an account?
      <span class="text-vgreen">Register</span>
    </nuxt-link>
  </form>
</template>

<script>
export default {
  name: 'SigninForm',
  data() {
    return {
      company: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      this.$axios
        .post('/company/login', this.company, {
          headers: {
            'content-type': 'application/json'
          }
        })
        .then(response => {
          const { status, data } = response
          if (status === 200) {
            localStorage.setItem('jwtToken', data.jwtToken)
            this.$store.dispatch('login', {
              id: data.id,
              admin: data.admin,
              loggedIn: true
            })
            this.$router.push({ name: 'index' })
          }
        })
        .catch(err => {
          console.error(err)
          console.error(err.response)
        })
    }
  }
}
</script>

<style scoped>
</style>