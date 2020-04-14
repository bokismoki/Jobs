<template>
  <div
    class="job-item relative rounded shadow bg-white overflow-hidden w-full mt-10 bg-center bg-cover bg-no-repeat max-w-sm mx-auto lg:max-w-md lg:m-5 lg:w-auto"
    :style="{'background-image': `url(https://jobs-it-server.herokuapp.com/api/job/${job.image_path})`}"
  >
    <div class="absolute w-full h-full bg-vblue opacity-90"></div>
    <div class="relative w-full h-full flex flex-col justify-between pt-3">
      <h1 class="font-bold text-white uppercase text-center px-3 xl:text-xl">{{job.title}}</h1>
      <p
        class="text-white text-xs font-semibold text-center leading-tight px-3 xl:text-sm"
      >{{job.description}}</p>
      <a
        :href="job.job_link"
        rel="noopener"
        target="_blank"
        class="text-white py-3 rounded-b-sm text-sm text-center font-bold uppercase bg-vgreen xl:text-lg xl:py-3"
      >See job post</a>
      <div
        class="absolute bottom-0 mb-10 left-0 bg-vgreen text-xs capitalize text-white font-bold px-2 py-1 rounded-t"
      >{{$moment(job.created_at).fromNow()}}</div>
      <div
        class="absolute bottom-0 right-0 w-16 h-16 pt-3 pl-3 flex bg-white rounded-tl-full cursor-pointer transition-colors duration-200 hover:bg-gray-300"
        @click="toggleCompanyDetails"
      >
        <Company fill="#34495e" class="w-6 h-6 m-auto" />
      </div>
      <CompanyDetails
        :companyDetailsOn="companyDetailsOn"
        :company="job.company"
        @hideCompanyDetails="hideCompanyDetails"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'JobItem',
  props: ['job'],
  components: {
    Company: () =>
      import(/*webpackChunkName: 'company'*/ '~/assets/img/company.svg'),
    CompanyDetails: () =>
      import(
        /*webpackChunkName: 'company-details'*/ '~/components/CompanyDetails'
      )
  },
  data() {
    return {
      companyDetailsOn: false
    }
  },
  methods: {
    toggleCompanyDetails() {
      this.companyDetailsOn = !this.companyDetailsOn
    },
    hideCompanyDetails() {
      this.toggleCompanyDetails()
    }
  }
}
</script>

<style scoped>
.job-item {
  height: 350px;
}
</style>