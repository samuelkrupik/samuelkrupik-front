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
      class="overscroll-contain fixed z-40 w-full h-screen top-0 left-0 bg-white bg-opacity-95 flex items-center justify-center lg:hidden transform"
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

  <nav
    class="fixed w-full transform transition-all z-50 bg-opacity-95"
    ref="navbar"
  >
    <div class="flex items-center justify-between py-5 section">
      <div class="relative">
        <router-link to="/">
          <c-logo class="h-8" @contextmenu.prevent="authOpen" />
        </router-link>
        <div
          v-if="authVisible"
          class="bg-white absolute top-full mt-2 flex flex-col p-1 rounded-lg shadow border border-gray-200"
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
      <div class="hidden lg:flex relative" v-if="authenticated">
        <div
          @click.stop="userMenuToggle"
          class="flex items-center cursor-pointer"
        >
          <img
            :src="user.avatar"
            :alt="user.name"
            class="w-8 rounded-full shadow"
          />
          <span class="ml-2 font-medium">{{ getFirstName }}</span>
          <chevron-down-icon class="h-5 w-5 ml-1" />
        </div>
        <div
          v-if="userMenuVisible"
          v-click-outside="userMenuClose"
          class="bg-white absolute top-full mt-2 flex flex-col p-1 rounded-lg shadow border border-gray-200 whitespace-nowrap"
        >
          <router-link
            to="/vytvorit-projekt"
            class="flex items-center justify-between font-medium text-dark px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
          >
            Vytvoriť projekt
            <plus-icon class="h-5 w-5 ml-2" />
          </router-link>
          <a
            href="/odhlasenie"
            @click.prevent="handleLogout"
            class="flex items-center justify-between font-medium text-red-600 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
          >
            Odhlásiť
            <logout-icon class="h-5 w-5 ml-2" />
          </a>
        </div>
      </div>
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
    </div>
  </nav>
</template>

<script>
import CLogo from "./CLogo";
import { mapGetters, mapState } from "vuex";
import { ChevronDownIcon, PlusIcon } from "@heroicons/vue/solid";
import { LogoutIcon } from "@heroicons/vue/outline";
import debounce from "lodash/debounce";
export default {
  name: "CNavigation",
  components: {
    CLogo,
    LogoutIcon,
    ChevronDownIcon,
    PlusIcon,
  },
  data() {
    return {
      visible: false,
      authVisible: false,
      userMenuVisible: false,
      prevScrollpos: 0,
    };
  },
  computed: {
    ...mapGetters("auth", ["getFirstName"]),
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
  mounted() {
    this.prevScrollpos = window.pageYOffset;
    this.handleScrollDebounced = debounce(this.handleScroll, 5);
    window.addEventListener("scroll", this.handleScrollDebounced);
    this.handleScroll();
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScrollDebounced);
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
    userMenuToggle() {
      this.userMenuVisible = !this.userMenuVisible;
    },
    userMenuClose() {
      this.userMenuVisible = false;
    },
    handleScroll() {
      const styleClasses = ["bg-white", "shadow-xl"];
      const hideClass = "-translate-y-full";
      const currentScrollPos = window.pageYOffset;

      // Make sure navbar is visible when mobile menu is in focus
      // and when scroll position is 0 (navbar won't be visible after page reload)
      if (this.visible || currentScrollPos == 0) {
        this.$nextTick(() => this.$refs.navbar.classList.remove(hideClass));
        return;
      }

      // Show/hide navbar by determining scroll direction
      if (this.prevScrollpos > currentScrollPos) {
        // Avoid flicker at top of the page
        if (currentScrollPos > this.$refs.navbar.clientHeight * 1.5) {
          this.$refs.navbar.classList.add(...styleClasses);
        } else {
          this.$refs.navbar.classList.remove(...styleClasses);
        }
        this.$refs.navbar.classList.remove(hideClass);
      } else {
        this.$refs.navbar.classList.remove(...styleClasses);
        this.$refs.navbar.classList.add(hideClass);
      }
      this.prevScrollpos = currentScrollPos;
    },
  },
};
</script>

<style></style>
