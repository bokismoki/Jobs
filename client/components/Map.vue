<template>
  <iframe
    class="map w-full rounded-sm xl:h-full xl:max-w-3xl"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d215588.357910586!2d20.311353984984297!3d44.8117499607172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7aa3d7b53fbd%3A0x1db8645cf2177ee4!2z0JHQtdC-0LPRgNCw0LQ!5e1!3m2!1ssr!2srs!4v1586116202259!5m2!1ssr!2srs"
    allowfullscreen
    aria-hidden="false"
    tabindex="0"
  ></iframe>
</template>

<script>
export default {
  name: 'Map'
}
</script>

<style scoped>
iframe {
  min-height: 250px;
}
@media (min-width: 1024px) {
  iframe {
    min-height: 350px;
  }
}
</style>