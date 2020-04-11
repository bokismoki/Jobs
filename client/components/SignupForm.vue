<template>
  <form
    class="signup-form mt-10 max-w-sm mx-auto lg:max-w-md xl:max-w-lg"
    @submit.prevent="register"
  >
    <div
      class="text-red-600 font-semibold"
      v-if="hasErrors"
    >Make sure all required fields are filled in correctly.</div>
    <div class="mt-3">
      <label class="block mb-1 text-white text-sm font-semibold" for="comp-name">
        Company name:
        <span class="text-vgreen font-black">*</span>
      </label>
      <input
        class="rounded-sm px-2 py-1 w-full placeholder-vblue"
        id="comp-name"
        type="text"
        placeholder="company name"
        v-model="company.name"
      />
      <div
        class="error text-xs text-red-600 font-semibold"
        v-if="!$v.company.name.maxLength"
      >Maximum characters allowed: {{$v.company.name.$params.maxLength.max}}</div>
    </div>
    <div class="mt-3">
      <label class="block mb-1 text-white text-sm font-semibold" for="comp-email">
        Company email:
        <span class="text-vgreen font-black">*</span>
      </label>
      <input
        class="rounded-sm px-2 py-1 w-full placeholder-vblue"
        id="comp-email"
        type="email"
        placeholder="company email"
        v-model="company.email"
      />
      <div
        class="error text-xs text-red-600 font-semibold"
        v-if="!$v.company.email.email"
      >Please enter a valid email</div>
    </div>
    <div
      class="error text-xs text-red-600 font-semibold"
      v-if="!$v.company.email.maxLength"
    >Maximum characters allowed: {{$v.company.email.$params.maxLength.max}}</div>
    <div class="mt-3">
      <label class="block mb-1 text-white text-sm font-semibold" for="comp-site">
        Company site:
        <span class="text-vgreen font-black">*</span>
      </label>
      <input
        class="rounded-sm px-2 py-1 w-full placeholder-vblue"
        id="comp-site"
        type="url"
        placeholder="company site"
        v-model="company.site"
      />
      <div
        class="error text-xs text-red-600 font-semibold"
        v-if="!$v.company.site.url"
      >Please enter a valid url</div>
      <div
        class="error text-xs text-red-600 font-semibold"
        v-if="!$v.company.site.maxLength"
      >Maximum characters allowed: {{$v.company.site.$params.maxLength.max}}</div>
    </div>
    <div class="mt-3">
      <label class="block mb-1 text-white text-sm font-semibold" for="comp-location">
        Company location:
        <span class="text-vgreen font-black">*</span>
      </label>
      <input
        class="rounded-sm px-2 py-1 w-full placeholder-vblue"
        id="comp-location"
        type="text"
        placeholder="E.g 'Belgrade, Serbia'"
        v-model="company.location"
      />
      <div
        class="error text-xs text-red-600 font-semibold"
        v-if="!$v.company.location.maxLength"
      >Maximum characters allowed: {{$v.company.location.$params.maxLength.max}}</div>
    </div>
    <div class="mt-3">
      <label class="block mb-1 text-white text-sm font-semibold" for="comp-size">
        Company size:
        <span class="text-vgreen font-black">*</span>
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
        <span class="text-vgreen font-black">*</span>
      </label>
      <input
        class="rounded-sm px-2 py-1 w-full placeholder-vblue"
        id="password"
        type="password"
        placeholder="password"
        v-model="company.password"
      />
      <div
        class="error text-xs text-red-600 font-semibold"
        v-if="!$v.company.password.maxLength"
      >Maximum characters allowed: {{$v.company.password.$params.maxLength.max}}</div>
      <div
        class="error text-xs text-red-600 font-semibold"
        v-if="!$v.company.password.strongPassword && company.password"
      >Minimum 8 characters needed, uppercase, symbols and numbers</div>
    </div>
    <div class="mt-3">
      <label class="block mb-1 text-white text-sm font-semibold" for="password-confirm">
        Confirm Password:
        <span class="text-vgreen font-black">*</span>
      </label>
      <input
        class="rounded-sm px-2 py-1 w-full placeholder-vblue"
        id="password-confirm"
        type="password"
        placeholder="confirm password"
        v-model="company.confirmPassword"
      />
      <div
        class="error text-xs text-red-600 font-semibold"
        v-if="!$v.company.confirmPassword.sameAsPassword && company.confirmPassword"
      >Passwords do not match</div>
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
import {
  required,
  email,
  url,
  maxLength,
  sameAs,
  helpers
} from 'vuelidate/lib/validators'

const strongPassword = helpers.regex(
  'strongPassword',
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
)

export default {
  name: 'SignupForm',
  data() {
    return {
      company: {
        name: '',
        email: '',
        site: '',
        location: '',
        size: 'MD',
        password: '',
        confirmPassword: ''
      },
      hasErrors: false
    }
  },
  validations: {
    company: {
      name: {
        required,
        maxLength: maxLength(100)
      },
      email: {
        required,
        email,
        maxLength: maxLength(255)
      },
      site: {
        required,
        url,
        maxLength: maxLength(255)
      },
      location: {
        required,
        maxLength: maxLength(25)
      },
      size: {
        required
      },
      password: {
        required,
        maxLength: maxLength(255),
        strongPassword
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs('password')
      }
    }
  },
  methods: {
    register() {
      this.$v.company.$touch()
      if (this.$v.company.$anyError) {
        this.hasErrors = true
      } else {
        this.$axios
          .post('/company/signup', this.company, {
            headers: {
              'content-type': 'application/json'
            }
          })
          .then(response => {
            if (response.status === 201) {
              this.$router.push({ name: 'signin' })
            }
          })
          .catch(err => {
            console.error(err)
            console.error(err.response)
          })
      }
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