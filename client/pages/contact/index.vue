<template>
  <div class="contact px-5 py-10 sm:px-10 md:py-13 md:px-20">
    <div class="lg:max-w-md xl:max-w-xl mx-auto xl:text-center">
      <h1
        class="text-white uppercase tracking-wider font-semibold text-xl xl:text-3xl"
      >Send us a message</h1>
      <p class="text-white font-semibold text-sm mt-5 xl:text-base">
        <span class="text-vgreen">Contact</span> us if you have any suggestions or in any way want to help our work. You can expect our answer within 1 business day.
      </p>
    </div>
    <div class="xl:flex">
      <div class="xl:w-1/2">
        <ContactForm />
      </div>
      <div class="mt-16 xl:w-1/2 xl:ml-5">
        <Map />
      </div>
    </div>
    <div class="mt-10 text-center text-white font-semibold xl:mt-20">
      <div>
        <LocationPin fill="#41b883" class="w-8 h-8 mx-auto text-vgreen" />
        <p>Belgrade, Serbia 11000. Stepe Stepanovića 85</p>
      </div>
      <div class="mt-10">
        <Letter fill="#41b883" class="w-8 h-8 mx-auto" />
        <p>jobspool@gmail.com</p>
      </div>
      <div class="mt-10">
        <Phone fill="#41b883" class="w-8 h-8 mx-auto" />
        <p>+381/63-73-45892</p>
        <p class="text-xs">09-15h</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Contact'
  },
  components: {
    ContactForm: () =>
      import(/*webpackChunkName: 'contact-form'*/ '~/components/ContactForm'),
    Map: () => import(/*webpackChunkName: 'map'*/ '~/components/Map'),
    LocationPin: () =>
      import(
        /*webpackChunkName: 'location-pin'*/ '~/assets/img/location-pin.svg'
      ),
    Letter: () =>
      import(/*webpackChunkName: 'letter'*/ '~/assets/img/letter.svg'),
    Phone: () => import(/*webpackChunkName: 'phone'*/ '~/assets/img/phone.svg')
  }
}
</script>

<style scoped>
</style>