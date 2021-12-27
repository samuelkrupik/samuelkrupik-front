<template>
  <div class="bg-blurred min-h-screen">
    <router-view />
    <c-notification-list />
  </div>
</template>

<script>
import CNotificationList from "@/components/CNotificationList.vue";
export default {
  components: {
    CNotificationList,
  },
};
</script>

<style lang="css">
.bg-blurred {
  background: url("../src/assets/img/bg/blurred.svg");
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
