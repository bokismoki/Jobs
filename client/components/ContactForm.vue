<template>
  <form
    class="contact-form mt-10 max-w-sm mx-auto lg:max-w-md xl:max-w-lg xl:mx-0 xl:ml-auto"
    @submit.prevent="sendMessage"
  >
    <div class="mt-3">
      <label class="block mb-1 text-white text-sm font-semibold" for="contact-first-name">
        Tell us your name:
        <StarHighlight />
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
        <StarHighlight />
      </label>
      <input
        class="rounded-sm px-2 py-1 w-full placeholder-vblue"
        id="contact-email"
        type="email"
        placeholder="email"
        v-model="contact.email"
      />
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
        <StarHighlight />
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
export default {
  name: 'ContactForm',
  components: {
    StarHighlight: () =>
      import(
        /*webpackChunkName: 'star-highlight'*/ '~/components/StarHighlight'
      )
  },
  data() {
    return {
      contact: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        message: ''
      }
    }
  },
  methods: {
    sendMessage() {}
  }
}
</script>

<style scoped>
textarea {
  min-height: 100px;
  max-height: 250px;
}
</style>