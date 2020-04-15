<template>
  <div class="newest-jobs-preview mx-auto md:max-w-md lg:max-w-2xl">
    <h2
      class="text-white font-semibold uppercase mb-6 md:text-xl md:leading-snug xl:leading-none xl:text-3xl"
    >Newest jobs added:</h2>
    <template>
      <client-only class="placeholder-white" placeholder="Loading...">
        <swiper class="swiper w-full rounded shadow" :options="swiperOption">
          <swiper-slide v-for="job in jobs" :key="job.id">
            <JobItemPreview :job="job" />
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </client-only>
    </template>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'NewestJobsPreview',
  props: ['jobs'],
  components: {
    JobItemPreview: () =>
      import(
        /*webpackChunkName: 'job-item-preview'*/ '~/components/JobItemPreview'
      ),
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  }
}
</script>

<style scoped>
.client-only-placeholder {
  @apply text-white text-lg;
}
.swiper {
  height: 300px;
}
.swiper-slide {
  @apply flex justify-center items-center text-center bg-vblue font-bold;
}
@media (min-width: 1280px) {
  .swiper {
    height: 375px;
  }
}
</style>

<style>
.swiper-pagination-progressbar {
  @apply w-full absolute top-0 !important;
  height: 5px;
}
.swiper-pagination-progressbar-fill {
  @apply bg-vgreen h-full block !important;
}
.swiper-button-disabled {
  @apply opacity-25 !important;
}
.swiper-button-prev {
  @apply text-vgreen !important;
}
.swiper-button-next {
  @apply text-vgreen !important;
}
.swiper-container-initialized {
  @apply relative overflow-hidden !important;
}
.swiper-wrapper {
  height: 300px !important;
}
@media (min-width: 1280px) {
  .swiper-wrapper {
    height: 375px !important;
  }
}
</style>