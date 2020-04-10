<template>
  <div class="filters flex flex-col sm:flex-row">
    <MagnifyingGlass
      class="w-12 h-12 cursor-pointer bg-vgreen rounded-full p-2"
      @click="toggleFilter"
    />
    <input
      class="rounded placeholder-black sm:max-w-xs mt-2 transition-all duration-500 sm:mt-0 sm:ml-5 sm:self-center"
      :class="{'w-0 px-0 py-0': !showFilter, 'w-full p-2': showFilter}"
      type="text"
      placeholder="'UI', 'Frontend', 'Junior', 'USA', 'Remote', ..."
      v-model="filter"
      @keyup="filterOut"
    />
  </div>
</template>

<script>
export default {
  name: 'Filters',
  components: {
    MagnifyingGlass: () =>
      import(
        /*webpackChunkName: 'magnifying-glass'*/ '~/assets/img/magnifying-glass.svg'
      )
  },
  data() {
    return {
      showFilter: false,
      filter: ''
    }
  },
  methods: {
    toggleFilter() {
      this.showFilter = !this.showFilter
    },
    filterOut() {
      this.$store.dispatch('setFilter', this.filter)
    }
  }
}
</script>

<style scoped>
</style>