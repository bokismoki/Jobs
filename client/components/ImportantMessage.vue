<template>
  <p class="important-message text-white text-xs mt-1">
    <span class="text-vgreen font-black">*</span>
    <span class="opacity-75">{{msg}}</span>
  </p>
</template>

<script>
export default {
  name: 'ImportantMessage',
  props: ['msg']
}
</script>

<style scoped>
</style>