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
        <button
          class="flex lg:hidden items-center button-primary"
          v-if="authenticated"
          @click="handleLogout"
        >
          <span>Odhlásiť</span>
          <logout-icon class="h-6 w-6 ml-2" />
        </button>
      </div>
    </div>
  </transition>
  <!-- End Overlay -->
  <nav class="flex items-center justify-between py-8">
    <div class="relative">
      <router-link to="/">
        <c-logo class="h-8" @contextmenu.prevent="authOpen" />
      </router-link>
      <div
        v-if="authVisible"
        class="absolute top-full mt-2 flex flex-col p-1 rounded-lg shadow border border-gray-200"
        v-click-outside="authClose"
      >
        <router-link
          v-for="{ link, text } in [
            { link: '/login', text: 'Prihlásiť' },
            { link: '/register', text: 'Registrovať' },
          ]"
          :key="link"
          :to="link"
          class="font-medium text-dark px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
        >
          {{ text }}
        </router-link>
      </div>
    </div>
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
    <button
      class="hidden lg:flex items-center button-primary"
      v-if="authenticated"
      @click="handleLogout"
    >
      <span>Odhlásiť</span>
      <logout-icon class="h-6 w-6 ml-2" />
    </button>
    <router-link v-else :to="hireLink" class="hidden lg:flex button-primary"
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
import { mapState } from "vuex";
import { LogoutIcon } from "@heroicons/vue/outline";
export default {
  name: "CNavigation",
  components: {
    CLogo,
    LogoutIcon,
  },
  data() {
    return {
      visible: false,
      authVisible: false,
    };
  },
  computed: {
    ...mapState("auth", {
      user: (state) => state.user,
      authenticated: (state) => state.authenticated,
    }),
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
      default: () => [
        {
          title: "Domov",
          to: "/",
        },
        {
          title: "Kontakt",
          to: "/kontakt",
        },
        {
          title: "Projekty",
          to: "/projekty",
        },
      ],
    },
  },
  methods: {
    handleLogout() {
      this.$store.dispatch("auth/signOut");
    },
    open() {
      this.visible = true;
      document.body.classList.add("overflow-hidden");
    },
    close() {
      this.visible = false;
      document.body.classList.remove("overflow-hidden");
    },
    authOpen() {
      this.authVisible = true;
    },
    authClose() {
      this.authVisible = false;
    },
  },
};
</script>

<style></style>
