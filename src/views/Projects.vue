import branding from '../assets/img/cards/branding.png';
<template>
  <div id="projects">
    <section class="section">
      <c-navigation :links="links" />
    </section>
    <section class="section pt-12">
      <div
        class="text-center px-6 sm:w-2/3 md:w-1/2 md:px-0 mx-auto lg:mx-0 lg:w-2/5 lg:text-left xl:w-1/3"
      >
        <h1 class="heading text-primary">Porfólio</h1>
        <p class="content-text">
          The quick, brown fox jumps over a prog
          <a href="#" class="link">github</a>. Junk MTV by
          <a href="#" class="link">dribbble</a> fox whelps.
        </p>
      </div>
      <div class="lg:w-1/2 mx-auto lg:-mt-24">
        <div class="px-10 sm:w-2/3 sm:px-0 md:w-1/2 mx-auto lg:w-3/4">
          <img src="../assets/img/projects.png" alt="" />
        </div>
        <div
          class="flex relative p-1.5 bg-white items-center rounded-xl shadow-xl border border-gray-100 focus-within:ring-2 ring-blue-200"
        >
          <input
            type="text"
            class="flex-grow px-3 py-2 appearance-none border-none bg-transparent focus:outline-none lg:text-center"
            placeholder="Vyhľadať projekt..."
          />
          <div
            @click="open = !open"
            class="flex lg:hidden items-center bg-gray-100 font-medium rounded-lg py-2 px-3 text-gray-700 cursor-pointer hover:bg-gray-200 transition-colors"
          >
            <span class="mr-1 select-none">{{ getActiveFilter().title }}</span>
            <chevron-down-icon class="h-5" />
          </div>
          <transition
            enter-active-class="transition-all"
            enter-from-class="opacity-0 scale-75"
            enter-to-class="opacity-100 scale-100"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-75"
            leave-active-class="transition-all"
          >
            <div
              class="flex flex-col space-y-1 absolute top-full transform origin-top right-1.5 bg-white shadow-xl rounded-lg border border-gray-200 p-1"
              v-if="open"
            >
              <template v-for="(filter, index) in filters" :key="index">
                <div
                  @click="setFilter(index)"
                  v-if="index !== activeFilter"
                  class="font-medium text-dark px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                >
                  {{ filter.title }}
                </div>
              </template>
            </div>
          </transition>
          <search-icon
            class="absolute top-1/2 text-gray-400 right-0 h-5 hidden lg:block mr-4 -mt-2.5"
          />
        </div>
        <div class="hidden lg:flex items-center justify-center mt-4 space-x-3">
          <template v-for="(filter, index) in filters" :key="index">
            <div
              @click="setFilter(index)"
              :class="{
                'bg-gray-100 hover:bg-gray-200': index === activeFilter,
              }"
              class="font-medium text-dark px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors whitespace-nowrap"
            >
              {{ filter.title }}
            </div>
          </template>
        </div>
      </div>
      <div class="lg:w-1/3 xl:w-1/4"></div>
    </section>
    <section
      class="section grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mt-12"
    >
      <template v-for="n in 16" :key="n">
        <img
          src="https://source.unsplash.com/random/1920x1440"
          alt=""
          class="rounded-xl shadow-xl"
        />
      </template>
    </section>
    <section class="section">
      <c-footer class="pt-24" />
    </section>
  </div>
</template>

<script>
import CNavigation from "@/components/CNavigation.vue";
import CFooter from "@/components/CFooter.vue";
import { ChevronDownIcon, SearchIcon } from "@heroicons/vue/solid";
export default {
  components: {
    CNavigation,
    CFooter,
    ChevronDownIcon,
    SearchIcon,
  },
  data() {
    return {
      open: false,
      activeFilter: 0,
      filters: [
        {
          title: "Všetky",
          query: "",
        },
        {
          title: "3D dizajn",
          query: "3d_design",
        },
        {
          title: "UI/UX",
          query: "ui_ux",
        },
        {
          title: "Tlač",
          query: "print",
        },
        {
          title: "Branding",
          query: "branding",
        },
        {
          title: "Web",
          query: "web",
        },
      ],
      links: [
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
          active: true,
        },
      ],
    };
  },
  methods: {
    setFilter(filterIndex) {
      this.activeFilter = filterIndex;
      this.open = false;
    },
    getActiveFilter() {
      return this.filters[this.activeFilter];
    },
  },
};
</script>
