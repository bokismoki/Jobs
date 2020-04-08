<template>
  <a
    :href="job.job_link"
    rel="noopener"
    target="_blank"
    class="job-item-preview relative block h-full w-full flex bg-center bg-cover bg-no-repeat"
    :style="{'background-image': `url(http://localhost:8080/api/job/${job.image_path})`}"
  >
    <div class="absolute w-full h-full bg-vblue opacity-85"></div>
    <h1 class="absolute top-0 w-full text-white mt-3 uppercase text-center xl:text-xl">{{job.title}}</h1>
    <div class="relative m-auto px-3">
      <p class="text-white text-xs font-semibold px-8 leading-tight sm:px-20 xl:text-sm">{{job.description}}</p>
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
  props: ['job']
}
</script>

<style scoped>
</style>