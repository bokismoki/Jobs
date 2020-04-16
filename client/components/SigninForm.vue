<template>
  <form class="signin-form mt-10 max-w-sm mx-auto lg:max-w-md xl:max-w-lg" @submit.prevent="login">
    <div
      class="text-red-600 font-semibold"
      v-if="hasErrors"
    >Make sure all required fields are filled in correctly.</div>
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
    <recaptcha
      class="mt-5"
      @error="recaptchaError"
      @success="recaptchaSuccess"
      @expired="recaptchaExpired"
    />
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
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'SigninForm',
  data() {
    return {
      company: {
        email: '',
        password: ''
      },
      hasErrors: false,
      recaptcha: false
    }
  },
  validations: {
    company: {
      email: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    async login() {
      try {
        this.$v.company.$touch()
        if (this.$v.company.$anyError) {
          this.hasErrors = true
        } else {
          if (this.recaptcha) {
            const response = await this.$axios.post(
              '/company/login',
              this.company,
              {
                headers: {
                  'content-type': 'application/json'
                }
              }
            )
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
          } else {
            this.$store.dispatch('setPopupMsg', {
              success: false,
              msg: 'Recaptcha did not succeed, try again'
            })
          }
        }
      } catch (err) {
        console.error(err)
        this.$store.dispatch('setPopupMsg', {
          success: false,
          msg: 'Error while signing in'
        })
      }
    },
    recaptchaError(error) {
      console.error('Recaptcha Erorr:', error)
      this.recaptcha = false
    },
    async recaptchaSuccess(token) {
      try {
        const response = await this.$axios.post(
          '/company/recaptcha',
          { token },
          {
            headers: {
              'content-type': 'application/json'
            }
          }
        )
        this.recaptcha = response.data.success
      } catch (err) {
        console.error(err)
      }
    },
    recaptchaExpired() {
      console.error('Recaptcha Expired')
      this.recaptcha = false
    }
  },
  watch: {
    company: {
      deep: true,
      handler() {
        if (this.hasErrors) {
          this.hasErrors = false
        }
      }
    }
  }
}
</script>

<style scoped>
</style>