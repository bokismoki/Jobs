<template>
  <form
    class="contact-form mt-10 max-w-sm mx-auto lg:max-w-md xl:max-w-xl xl:mx-0 xl:ml-auto"
    @submit.prevent="sendMessage"
  >
    <div
      class="text-red-600 font-semibold"
      v-if="hasErrors"
    >Make sure all required fields are filled in correctly.</div>
    <div class="mt-3">
      <label class="block mb-1 text-white text-sm font-semibold" for="contact-first-name">
        Tell us your name:
        <span class="text-vgreen font-black">*</span>
      </label>
      <input
        class="rounded-sm px-2 py-1 w-full placeholder-vblue"
        id="contact-first-name"
        type="text"
        placeholder="first name"
        v-model="contact.firstName"
      />
      <input
        class="rounded-sm mt-2 px-2 py-1 w-full placeholder-vblue"
        type="text"
        placeholder="last name"
        v-model="contact.lastName"
      />
    </div>
    <div class="mt-3">
      <label class="block mb-1 text-white text-sm font-semibold" for="contact-email">
        Email:
        <span class="text-vgreen font-black">*</span>
      </label>
      <input
        class="rounded-sm px-2 py-1 w-full placeholder-vblue"
        id="contact-email"
        type="email"
        placeholder="email"
        v-model="contact.email"
      />
      <div
        class="error text-xs text-red-600 font-semibold"
        v-if="!$v.contact.email.email"
      >Please enter a valid email</div>
    </div>
    <div class="mt-3">
      <label class="block mb-1 text-white text-sm font-semibold" for="contact-phone">Phone:</label>
      <input
        class="rounded-sm px-2 py-1 w-full placeholder-vblue"
        id="contact-phone"
        type="text"
        placeholder="phone number"
        v-model="contact.phone"
      />
    </div>
    <div class="mt-3">
      <label class="block mb-1 text-white text-sm font-semibold" for="contact-message">
        Message:
        <span class="text-vgreen font-black">*</span>
      </label>
      <textarea
        class="rounded-sm px-2 py-1 w-full placeholder-vblue"
        id="contact-message"
        placeholder="message"
        v-model="contact.message"
      ></textarea>
    </div>
    <button
      class="bg-vgreen text-white px-5 py-2 rounded-sm mt-5 uppercase text-sm font-bold tracking-wider"
      type="submit"
    >Send Message</button>
  </form>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'ContactForm',
  data() {
    return {
      contact: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        message: ''
      },
      hasErrors: false
    }
  },
  validations: {
    contact: {
      firstName: {
        required
      },
      lastName: {
        required
      },
      email: {
        required,
        email
      },
      message: {
        required
      }
    }
  },
  methods: {
    sendMessage() {
      this.$v.contact.$touch()
      if (this.$v.contact.$anyError) {
        this.hasErrors = true
      } else {
        this.$axios
          .post(
            '/contact',
            {
              ...this.contact,
              name: `${this.contact.firstName} ${this.contact.lastName}`
            },
            {
              headers: {
                'content-type': 'application/json'
              }
            }
          )
          .then(response => {
            if (response.status === 200) {
              console.log('Message successfuly sent')
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
    contact: {
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
textarea {
  min-height: 100px;
  max-height: 250px;
}
</style>