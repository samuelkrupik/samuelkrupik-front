<template>
  <!-- Overlay -->
  <transition
    enter-active-class="transition-all duration-200 ease-out"
    enter-from-class="opacity-0 -translate-y-full"
    enter-to-class="opacity-100 translate-y-0"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-full"
    leave-active-class="transition-all duration-200 ease-in"
  >
    <div
      v-show="visible"
      class="absolute z-10 w-full h-screen top-0 left-0 bg-white bg-opacity-95 flex items-center justify-center lg:hidden transform"
    >
      <div class="flex flex-col space-y-8 text-center">
        <router-link
          class="nav-link"
          :class="{ 'nav-link-active': link.active }"
          :to="link.to"
          v-for="link in links"
          :key="link.index"
          @click="close"
          >{{ link.title }}</router-link
        >
      </div>
    </div>
  </transition>
  <!-- End Overlay -->
  <nav class="flex items-center justify-between py-8">
    <c-logo class="h-8" />
    <div class="hidden lg:flex md:items-center space-x-10">
      <router-link
        class="nav-link"
        :class="{ 'nav-link-active': link.active }"
        :to="link.to"
        v-for="link in links"
        :key="link.index"
      >
        {{ link.title }}
      </router-link>
    </div>
    <router-link :to="hireLink" class="hidden lg:flex button-primary"
      >Objednať</router-link
    >
    <!-- Hamburger -->
    <div class="relative z-20 lg:hidden">
      <!-- <transition name="fade" mode="out-in"> -->
      <transition
        enter-active-class="transition-all duration-200"
        enter-from-class="opacity-0 scale-75"
        enter-to-class="opacity-100 scale-100"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-75"
        leave-active-class="transition-all duration-200"
        mode="out-in"
      >
        <svg
          @click="open"
          v-if="!visible"
          key="1"
          xmlns="http://www.w3.org/2000/svg"
          class="w-8 transform cursor-pointer"
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
          v-click-outside="close"
          v-else
          key="2"
          xmlns="http://www.w3.org/2000/svg"
          class="w-8 transform cursor-pointer"
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
      </transition>
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
  computed: {
    hireLink() {
      if (this.$route.name === "Home") {
        return "#contact";
      } else if (this.$route.name === "Contact") {
        return "";
      }
      return "/kontakt";
    },
  },
  props: {
    links: {
      type: Array,
    },
  },
  methods: {
    open() {
      this.visible = true;
      document.body.classList.add("overflow-hidden");
    },
    close() {
      this.visible = false;
      document.body.classList.remove("overflow-hidden");
    },
  },
};
</script>

<style></style>
