<template>
  <div id="projects">
    <c-loader :loading="loading" />

    <c-navigation />

    <section class="section pt-36">
      <div
        class="text-center px-6 md:w-2/3 md:px-0 mx-auto lg:mx-0 lg:w-2/5 lg:text-left xl:w-1/2"
      >
        <h1 class="heading text-primary">Porfólio</h1>
        <p class="content-text">
          Tu nájdete moje projekty, ak by ste si chceli pozrieť viac, možte tak
          urobiť kliknutím na
          <a href="#" class="link">dribbble.</a>
          Ak vás zaujímajú zdrojové kódy niektorých mojich projektov, môžte sa
          pozrieť na môj
          <a href="#" class="link">github.</a>
        </p>
      </div>
      <div class="lg:w-1/2 mx-auto lg:-mt-12">
        <div class="px-10 sm:w-2/3 sm:px-0 md:w-1/2 mx-auto lg:w-3/4">
          <img src="../assets/img/projects.png" alt="" />
        </div>
        <div
          class="flex relative p-1.5 bg-white items-center rounded-xl shadow-xl border border-gray-100 focus-within:ring-2 ring-blue-200"
        >
          <input
            v-model="searchQuery"
            @keyup="getProjects"
            type="text"
            class="flex-grow px-3 py-2 appearance-none border-none bg-transparent focus:outline-none lg:text-center"
            placeholder="Vyhľadať projekt..."
          />
          <div
            @click="open = !open"
            class="flex lg:hidden items-center bg-gray-100 font-medium rounded-lg py-2 px-3 text-gray-700 cursor-pointer hover:bg-gray-200 transition-colors"
          >
            <span class="mr-1 select-none">{{ activeTag.name }}</span>
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
              class="flex flex-col space-y-1 absolute z-10 top-full transform origin-top right-1.5 bg-white shadow-xl rounded-lg border border-gray-200 p-1"
              v-if="open"
            >
              <template v-for="(tag, index) in tags" :key="index">
                <div
                  @click="filterByTag(tag)"
                  v-if="tag.id !== activeTag.id"
                  class="font-medium text-dark px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                >
                  {{ tag.name }}
                </div>
              </template>
            </div>
          </transition>
          <search-icon
            class="absolute top-1/2 text-gray-400 right-0 h-5 hidden lg:block mr-4 -mt-2.5"
          />
        </div>
        <div class="hidden lg:flex items-center justify-center mt-4 space-x-3">
          <template v-for="(tag, index) in tags" :key="index">
            <div
              @click="filterByTag(tag)"
              :class="{
                'bg-gray-100 hover:bg-gray-200': tag.id === activeTag.id,
              }"
              class="font-medium text-dark px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors whitespace-nowrap"
            >
              {{ tag.name }}
            </div>
          </template>
        </div>
      </div>
      <div class="lg:w-1/3 xl:w-1/4"></div>
    </section>
    <section class="section">
      <div
        class="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mt-12"
      >
        <transition-group
          enter-active-class="transition-all duration-300"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
          leave-active-class="transition-all duration-300"
        >
          <template v-for="project in projects" :key="project.id">
            <router-link
              :to="{
                name: 'Project',
                params: { id: project.id, slug: project.slug },
              }"
            >
              <c-responsive-image
                :image="project.image"
                conversion="preview"
                loading="lazy"
                class="w-full rounded-xl shadow-xl transform"
              />
            </router-link>
          </template>
        </transition-group>
      </div>
      <div class="mt-12 flex justify-center" v-if="canLoadMore">
        <a href="#" @click.prevent="getMoreProjects" class="button-secondary"
          >Načítať viac</a
        >
      </div>
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
import { mapGetters } from "vuex";
import CResponsiveImage from "@/components/CResponsiveImage.vue";
import CLoader from "@/components/CLoader.vue";
export default {
  title: "Projekty",
  components: {
    CNavigation,
    CFooter,
    ChevronDownIcon,
    SearchIcon,
    CResponsiveImage,
    CLoader,
  },
  data() {
    return {
      loading: true,
      searchQuery: "",
      open: false,
      activeTag: {},
    };
  },
  computed: {
    ...mapGetters("projects", {
      projects: "projects",
      canLoadMore: "canLoadMore",
    }),
    ...mapGetters("tags", ["tags"]),
  },
  async created() {
    await this.getTags();
    this.activeTag =
      this.tags.find((tag) => tag.slug == this.$route.query.tag) ??
      this.tags[0];
    this.searchQuery = this.$route.query.s ?? "";
    await this.getProjects();
    this.loading = false;
    console.log(process.env.VUE_APP_BACKEND);
  },
  methods: {
    async getTags() {
      await this.$store.dispatch("tags/getTags");
    },
    getParams() {
      let params = {
        tag: this.activeTag.slug ?? "",
        search: this.searchQuery,
      };
      for (const key of Object.keys(params)) {
        if (params[key] === "") {
          delete params[key];
        }
      }
      return params;
    },
    async getProjects() {
      let query = { tag: this.activeTag.slug };
      if (this.searchQuery.length > 0) {
        query.s = this.searchQuery;
      } else {
        delete query.s;
      }
      this.$router.replace({
        path: "/projekty",
        query: { ...query },
      });
      await this.$store.dispatch("projects/getProjects", this.getParams());
    },
    async filterByTag(tag) {
      this.open = false;
      this.activeTag = tag;
      this.getProjects();
    },
    async getMoreProjects() {
      await this.$store.dispatch("projects/getMoreProjects", this.getParams());
    },
  },
};
</script>
