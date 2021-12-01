<template>
  <div class="bg-blurred min-h-screen">
    <div
      class="w-full px-6 sm:px-10 md:max-w-screen-2xl md:mx-auto lg:max-w-5xl xl:max-w-screen-lg 2xl:max-w-screen-xl"
    >
      <router-view />
    </div>
  </div>
</template>

<style lang="css">
.bg-blurred {
  background-size: cover;
  background: url("../src/assets/img/bg-desktop.svg") fixed center;
}
</style>
