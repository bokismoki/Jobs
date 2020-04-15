<template>
  <div class="signin px-5 py-10 sm:px-10 md:py-13">
    <div class="lg:max-w-md xl:max-w-lg mx-auto">
      <h1
        class="text-white uppercase tracking-wider font-semibold text-xl md:leading-snug xl:leading-none xl:text-3xl"
      >Sign In</h1>
      <h2 class="text-white font-semibold text-sm mt-5 xl:text-base">
        <span class="text-vgreen">Login</span> to your company's account.
      </h2>
    </div>
    <SigninForm />
  </div>
</template>

<script>
export default {
  head: {
    title: 'Sign In'
  },
  components: {
    SigninForm: () =>
      import(/*webpackChunkName: 'signin-form'*/ '~/components/SigninForm')
  }
}
</script>

<style scoped>
.signin {
  min-height: 80vh;
}
</style>