<template>
  <main class="px-6 min-h-screen flex flex-col items-center justify-center">
    <router-link to="/">
      <c-logo class="h-10" />
    </router-link>
    <div
      class="w-full sm:w-96 px-4 py-8 mt-8 bg-white shadow-md rounded-xl border border-gray-100"
    >
      <slot></slot>
    </div>
  </main>
</template>

<script>
import CLogo from "@/components/CLogo.vue";
export default {
  components: {
    CLogo,
  },
  name: "Auth Card",
};
</script>
