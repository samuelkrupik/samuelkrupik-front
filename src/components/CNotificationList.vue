<template>
  <div
    class="w-full flex flex-col space-y-4 px-6 sm:w-auto sm:px-0 fixed top-6 sm:bottom-4 sm:left-auto sm:top-auto sm:transform-none right-4 left-1/2 z-50 transform -translate-x-1/2"
  >
    <c-notification
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
      @removeNotification="remove(notification)"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import CNotification from "@/components/CNotification.vue";
export default {
  components: {
    CNotification,
  },
  computed: {
    ...mapState("notifications", {
      notifications: (state) => state.notifications,
    }),
  },
  methods: {
    remove(notification) {
      this.$store.dispatch("notifications/removeNotification", notification);
    },
    // ...mapActions("notifications", {
    //   remove: "removeNotification",
    // }),
  },
};
</script>

<style></style>
