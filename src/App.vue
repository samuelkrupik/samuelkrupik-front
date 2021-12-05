<template>
  <div class="bg-blurred min-h-screen">
    <router-view />
  </div>
</template>

<style lang="css">
.bg-blurred {
  background: url("../src/assets/img/bg/blurred.svg");
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
