<template>
  <section
    class="something-about-us bg-white text-vblue mt-16 py-10 -mx-5 px-5 sm:px-10 sm:-mx-10 md:px-5 lg:px-20"
  >
    <div class="xl:max-w-4xl mx-auto">
      <h2 class="font-semibold uppercase md:text-xl xl:text-2xl">Something about us:</h2>
      <p
        class="text-xs font-semibold leading-tight mt-6 xl:text-sm"
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia in facere perspiciatis voluptatibus maiores officiis temporibus qui enim fuga harum, animi amet necessitatibus, numquam modi. Aut accusantium libero possimus veniam.</p>
      <p
        class="text-xs font-semibold leading-tight mt-2 xl:text-sm"
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis esse suscipit quod ab cupiditate provident!</p>
      <div class="mt-6">
        <h2 class="font-semibold uppercase pl-5 xl:text-lg">Our team:</h2>
        <div class="sm:flex items-center">
          <div
            class="team-member mt-5 w-2/3 mx-auto max-w-xs bg-vblue p-2 rounded transition-transform duration-300 sm:w-2/5"
          >
            <img class="rounded" src="~/assets/img/developer.jpg" alt="Developer Image" />
            <h1 class="font-semibold text-white text-sm mt-1 xl:text-base">Boris Bošnjak</h1>
            <h2 class="font-semibold text-white text-xs uppercase xl:text-sm">Developer</h2>
          </div>
          <div
            class="team-member mt-5 w-2/3 mx-auto max-w-xs bg-vblue p-2 rounded transition-transform duration-300 sm:mt-5 sm:w-2/5"
          >
            <img class="rounded" src="~/assets/img/designer.jpg" alt="Designer Image" />
            <h1 class="font-semibold text-white text-sm mt-1 xl:text-base">Monica Nice</h1>
            <h1 class="font-semibold text-white text-xs uppercase xl:text-sm">Designer</h1>
            <h1></h1>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SomethingAboutUs'
}
</script>

<style scoped>
.team-member:hover {
  transform: scale(1.03);
}
</style>