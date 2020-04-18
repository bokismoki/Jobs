<template>
  <div
    class="company-details absolute bg-white -mt-3 right-0 bottom-0 overflow-hidden transition-all duration-300 flex items-center rounded-sm"
    :class="{'w-0 h-0 opacity-0': !companyDetailsOn, 'w-full h-full opacity-100': companyDetailsOn}"
    :style="{'background-image': `url(${companyDetailsBg})`}"
  >
    <Exit
      fill="#34495e"
      class="absolute top-0 left-0 mt-1 ml-1 w-8 h-8 cursor-pointer"
      @click="hideCompanyDetails"
    />
    <div class="flex-1 h-full px-3 pt-20 flex flex-col">
      <h1 class="uppercase font-bold text-vblue break-all">{{company.name.substr(0, 40)}}</h1>
      <div class="flex-1 flex flex-col justify-between pt-2 pb-20">
        <a class="flex items-center" rel="noopener" target="_blank" :href="company.site">
          <ExternalLink fill="#41b883" class="w-6 h-5" />
          <p class="text-sm text-vblue font-semibold ml-3 break-all">{{company.site.substr(0, 40)}}</p>
        </a>
        <div class="text-vblue">
          <div class="flex items-center">
            <LocationPin fill="#41b883" class="w-6 h-6" />
            <p class="ml-3 text-sm font-semibold">{{company.location}}</p>
          </div>
          <div class="flex items-center mt-3">
            <TeamSize fill="#41b883" class="w-6 h-5" />
            <p class="ml-3 text-sm font-semibold">{{company.size}} - {{teamSize()}} employees</p>
          </div>
        </div>
      </div>
    </div>
    <h2
      class="h-full text-center uppercase px-2 bg-vgreen text-white font-bold lg:px-3"
    >Company Details</h2>
  </div>
</template>

<script>
export default {
  name: 'CompanyDetails',
  props: ['companyDetailsOn', 'company'],
  components: {
    Exit: () => import(/*webpackChunkName: 'exit'*/ '~/assets/img/exit.svg'),
    ExternalLink: () =>
      import(
        /*webpackChunkName: 'external-link'*/ '~/assets/img/external-link.svg'
      ),
    LocationPin: () =>
      import(
        /*webpackChunkName: 'location-pin'*/ '~/assets/img/location-pin.svg'
      ),
    TeamSize: () =>
      import(/*webpackChunkName: 'team-size'*/ '~/assets/img/team-size.svg')
  },
  data() {
    return {
      companyDetailsBg: require('~/assets/img/company-details-bg.jpg')
    }
  },
  methods: {
    hideCompanyDetails() {
      this.$emit('hideCompanyDetails')
    },
    teamSize() {
      switch (this.company.size) {
        case 'SM':
          return '1-20'
          break
        case 'MD':
          return '21-100'
          break
        case 'LG':
          '101+'
          break
        default:
          return 'N/A'
      }
    }
  }
}
</script>

<style scoped>
h2 {
  writing-mode: vertical-rl;
  text-orientation: upright;
}
</style>