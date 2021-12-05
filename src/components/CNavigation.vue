<template>
  <!-- Overlay -->
  <div
    v-show="visible"
    class="absolute z-10 w-full h-screen top-0 left-0 bg-white bg-opacity-95 flex items-center justify-center lg:hidden"
  >
    <div class="flex flex-col space-y-2 text-center">
      <router-link
        class="p-3 font-semibold text-tertiary"
        :to="link.href"
        v-for="link in links"
        :key="link.index"
        @click="close"
        >{{ link.title }}</router-link
      >
    </div>
  </div>
  <!-- End Overlay -->
  <nav class="flex items-center justify-between py-8">
    <c-logo class="h-8" />
    <div class="hidden lg:flex md:items-center space-x-10">
      <router-link
        class="font-semibold text-dark p-2"
        :to="link.href"
        v-for="link in links"
        :key="link.index"
      >
        {{ link.title }}
      </router-link>
    </div>
    <router-link to="#contact" class="hidden lg:flex button-primary"
      >Objednať</router-link
    >
    <!-- Hamburger -->
    <div class="relative z-20 lg:hidden">
      <svg
        @click="open"
        v-show="!visible"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 transform"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
      <svg
        @click="close"
        v-show="visible"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 transform"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
  </nav>
</template>

<script>
import CLogo from "./CLogo";
export default {
  name: "CNavigation",
  components: {
    CLogo,
  },
  data() {
    return {
      visible: false,
    };
  },
  props: {
    links: {
      type: Array,
    },
  },
  methods: {
    open() {
      this.visible = true;
      document.body.style.overflow = "hidden";
    },
    close() {
      this.visible = false;
      document.body.style.overflow = "auto";
    },
  },
};
</script>

<style></style>
