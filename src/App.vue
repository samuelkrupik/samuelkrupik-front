<template>
  <div class="bg-blurred min-h-screen">
    <router-view />
  </div>
</template>

<style lang="css">
.bg-blurred {
  background-size: cover;
  background: url("../src/assets/img/bg-desktop.svg") fixed center;
}
</style>
