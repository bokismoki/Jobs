<template>
  <a
    :href="job.job_link"
    rel="noopener"
    target="_blank"
    class="job-item-preview relative block h-full w-full bg-white flex bg-center bg-cover bg-no-repeat"
    :style="{'background-image': `url(${randomDefaultBgImage})`}"
  >
    <div class="absolute w-full h-full bg-vblue opacity-90"></div>
    <h1
      class="absolute top-0 w-full text-white mt-3 px-2 uppercase text-center xl:text-xl"
    >{{job.title}}</h1>
    <div class="relative m-auto px-3">
      <p
        class="text-white text-xs font-semibold px-8 leading-tight sm:px-20 xl:text-sm"
      >{{job.description}}</p>
    </div>
    <a
      :href="job.job_link"
      rel="noopener"
      target="_blank"
      class="absolute block bottom-0 w-full text-white py-2 rounded-b-sm text-sm uppercase bg-vgreen xl:text-lg xl:py-3"
    >See job post</a>
  </a>
</template>

<script>
export default {
  name: 'JobItemPreview',
  props: ['job'],
  data() {
    return {
      defaultBgImages: [
        require('~/assets/img/default-job-bg-1.jpg'),
        require('~/assets/img/default-job-bg-2.jpg'),
        require('~/assets/img/default-job-bg-3.jpg'),
        require('~/assets/img/default-job-bg-4.jpg')
      ]
    }
  },
  computed: {
    randomDefaultBgImage() {
      return this.defaultBgImages[Math.floor(Math.random() * 4)]
    }
  }
}
</script>

<style scoped>
</style>