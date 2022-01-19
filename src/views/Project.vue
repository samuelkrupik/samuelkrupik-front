<template>
  <div id="project">
    <c-loader :loading="loading" />
    <c-navigation />
    <transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
      leave-active-class="transition-all duration-300"
    >
      <div
        ref="gallery"
        @keyup.esc="closeGallery"
        tabindex="-1"
        v-if="gallery.isVisible"
        class="w-screen h-screen fixed top-0 left-0 z-50 bg-white"
      >
        <swiper
          v-if="!loading"
          @swiper="onSwiper"
          @navigationHide="gallery.closeVisible = false"
          @navigationShow="gallery.closeVisible = true"
          class="w-full h-full relative"
          :effect="swiper.effect"
          :fade-effect="swiper.fadeEffect"
          :lazy="swiper.lazy"
          :space-between="swiper.spaceBetween"
          :slides-per-view="swiper.slidesPerView"
          :watch-slide-visibility="swiper.watchSlideVisibility"
          :preload-images="swiper.preloadImages"
          :navigation="swiper.navigation"
          :modules="swiper.modules"
        >
          <x-icon
            v-if="gallery.closeVisible"
            @click="closeGallery"
            class="absolute right-4 top-4 h-12 p-2 text-dark cursor-pointer bg-white bg-opacity-20 hover:bg-opacity-40 transition-colors z-50 rounded-lg"
          />

          <swiper-slide
            v-for="image in project.images"
            :key="image.id"
            :style="`background: url(${image.conversions.preview.base64svg});background-size: cover;`"
          >
            <div
              class="relative w-full h-full flex items-center justify-center"
            >
              <img
                :data-src="image.conversions.full.url"
                :data-srcset="image.conversions.full.srcset"
                :src="image.conversions.full.base64svg"
                class="swiper-lazy max-h-full max-w-full"
              />

              <svg
                class="swiper-preloader absolute left-1/2 top-1/2 animate-spin h-8 w-8 -ml-4 -mt-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          </swiper-slide>
        </swiper>
        <chevron-left-icon
          class="absolute top-1/2 left-4 h-12 p-1 text-dark swiper-prev cursor-pointer z-50 bg-white bg-opacity-20 hover:bg-opacity-40 transition-colors rounded-lg"
        />
        <chevron-right-icon
          class="absolute top-1/2 right-4 h-12 p-1 text-dark swiper-next cursor-pointer z-50 bg-white bg-opacity-20 hover:bg-opacity-40 transition-colors rounded-lg"
        />
      </div>
    </transition>
    <section class="section pt-36" v-if="!loading">
      <h1 class="heading">{{ project.title }}</h1>
      <div class="mt-10">
        <p
          class="content-text mb-2 whitespace-pre-line last:mb-0 leading-relaxed"
          v-for="(paragraph, index) of paragraphs"
          v-bind:key="index"
          v-html="paragraph"
        ></p>
      </div>
      <!-- <p class="content-text mt-10 whitespace-pre-line">
        {{ project.description }}
      </p> -->
      <div
        class="flex items-center text-sm text-mid mt-2"
        title="Dátum dokončenia"
      >
        <calendar-icon class="h-4 mr-1" />
        <time :datetime="project.finish_date">
          {{ formatDate(project.finish_date) }}
        </time>
      </div>
      <div
        v-if="iframeLoaded"
        class="rounded-xl overflow-hidden mt-4"
        v-html="iframe"
      ></div>
      <!-- <div v-if="project.id === 19" class="iframe-wrapper mt-12">
        <iframe
          src="//www.youtube.com/embed/qAbagrCE19M"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div> -->
      <div
        class="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mt-12"
      >
        <!-- <transition-group
          enter-active-class="transition-all duration-300"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
          leave-active-class="transition-all duration-300"
        > -->
        <template v-for="(image, index) in project.images" :key="image.id">
          <div @click="openGallery(index)" class="relative">
            <c-responsive-image
              :image="image"
              conversion="preview"
              loading="lazy"
              class="w-full rounded-xl shadow-xl transform overflow-hidden"
            />
            <div
              class="top-0 left-0 bg-white bg-opacity-20 opacity-0 hover:opacity-100 absolute w-full h-full flex items-center justify-center transition-opacity cursor-pointer"
            >
              <arrows-expand-icon class="w-10 h-10 text-white" />
            </div>
          </div>
        </template>
        <!-- </transition-group> -->
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
import { mapState } from "vuex";
import CResponsiveImage from "@/components/CResponsiveImage.vue";
import CLoader from "@/components/CLoader.vue";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  XIcon,
  CalendarIcon,
} from "@heroicons/vue/solid";
import { ArrowsExpandIcon } from "@heroicons/vue/outline";
import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue";
import { Navigation, Lazy } from "swiper";
import "swiper/modules/lazy/lazy.scss";
import "swiper/swiper.scss";
import { getIframe } from "../services/youtube";
import { linkify } from "../services/linkify";
export default {
  title: "Projekt",
  components: {
    CNavigation,
    CFooter,
    CResponsiveImage,
    CLoader,
    Swiper,
    SwiperSlide,
    ChevronLeftIcon,
    ChevronRightIcon,
    XIcon,
    CalendarIcon,
    ArrowsExpandIcon,
  },
  data() {
    return {
      swiperInstance: null,
      iframe: "",
      iframeLoaded: false,
      gallery: {
        isVisible: false,
        closeVisible: true,
      },
      loading: true,
      swiper: {
        spaceBetween: 0,
        slidesPerView: 1,
        watchSlideVisibility: true,
        preloadImages: false,
        navigation: {
          nextEl: ".swiper-next",
          prevEl: ".swiper-prev",
          hideOnClick: true,
          hiddenClass: "hidden",
          disabledClass: "opacity-50 cursor-not-allowed",
        },
        lazy: {
          loadingClass: "animate-pulse",
          preloaderClass: "swiper-preloader",
        },
        modules: [Navigation, Lazy],
      },
    };
  },
  computed: {
    ...mapState("projects", {
      project: (state) => state.project,
    }),
    paragraphs() {
      return this.project.description
        .split("\n\n")
        .map((p) => linkify(p, { target: "_blank" }));
    },
  },
  async created() {
    await this.$store.dispatch("projects/getProject", {
      id: this.$route.params.id,
      slug: this.$route.params.slug,
    });
    this.setIframe();
    this.loading = false;
  },
  watch: {
    "gallery.isVisible": function (visible) {
      if (visible) {
        document.body.classList.add("overflow-hidden");
        // Focus gallery element so it could be closed with escape key
        // Focusing is deffered to be executed after the next DOM update, before update it doesn't exist
        this.$nextTick(() => this.$refs.gallery.focus());
      } else {
        document.body.classList.remove("overflow-hidden");
      }
    },
  },
  methods: {
    openGallery(slideIndex) {
      this.gallery.isVisible = true;
      this.$nextTick(() => {
        this.swiperInstance.slideTo(slideIndex, 0, true);
      });
    },
    closeGallery() {
      this.gallery.isVisible = false;
    },
    onSwiper(swiper) {
      this.swiperInstance = swiper;
    },
    formatDate(date) {
      const options = {
        //weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return new Date(Date.parse(date)).toLocaleDateString("sk-SK", options);
    },
    setIframe() {
      if (!this.project.video_url) return;
      const html = getIframe(this.project.video_url);
      if (!html) {
        this.iframeLoaded = false;
        return;
      }
      this.iframe = html;
      this.iframeLoaded = true;
    },
  },
};
</script>
