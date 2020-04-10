<template>
  <div class="signup px-5 py-10 sm:px-10 md:py-13 md:px-10">
    <div class="lg:max-w-md xl:max-w-lg mx-auto">
      <h1 class="text-white uppercase tracking-wider font-semibold text-xl xl:text-3xl">Sign Up</h1>
      <h2 class="text-white font-semibold text-sm mt-5 xl:text-base">
        Here you can
        <span class="text-vgreen">register</span> an account for your company.
      </h2>
      <ImportantMessage
        msg=" Please use the valid company details since they will be displayed on created job posts. ( The email and the password will not be displayed )"
      />
    </div>
    <SignupForm />
  </div>
</template>

<script>
export default {
  head: {
    title: 'Sign Up'
  },
  components: {
    ImportantMessage: () =>
      import(
        /*webpackChunkName: 'important-message'*/ '~/components/ImportantMessage'
      ),
    SignupForm: () =>
      import(/*webpackChunkName: 'signup-form'*/ '~/components/SignupForm')
  }
}
</script>

<style scoped>
</style>