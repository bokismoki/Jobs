<template>
  <div>
    <PopupMsg v-if="popupMsg" :popupMsg="popupMsg" />
    <div class="flex flex-col md:flex-row">
      <Navigation />
      <div class="view">
        <nuxt />
        <Footer />
      </div>
    </div>
    <transition name="slide">
      <BurgerNav v-if="burgerNavOpen" class="md:hidden" />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {
    Navigation: () =>
      import(/*webpackChunkName: 'navigation'*/ '~/components/Navigation'),
    BurgerNav: () =>
      import(/*webpackChunkName: 'burger-nav'*/ '~/components/BurgerNav'),
    PopupMsg: () =>
      import(/*webpackChunkName: 'popup-msg'*/ '~/components/PopupMsg'),
    Footer: () => import(/*webpackChunkName: 'footer'*/ '~/components/Footer')
  },
  computed: {
    ...mapGetters(['burgerNavOpen', 'popupMsg'])
  }
}
</script>

<style>
*,
*::before,
*::after {
  @apply m-0 p-0;
  box-sizing: border-box;
  outline: none;
}

body {
  @apply bg-vblue;
}

h1,
h2 {
  font-family: 'Roboto', sans-serif;
}

@media (min-width: 768px) {
  .view {
    @apply min-h-screen w-full;
    margin-left: 256px;
  }
}

.slide-enter-active {
  transition: all 500ms ease;
}
.slide-leave-active {
  transition: all 500ms cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
