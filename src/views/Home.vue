<template>
  <div class="home relative overflow-hidden">
    <c-loader :loading="loading" />
    <img
      class="h-40 hidden lg:block absolute left-0 top-1/6 transform -translate-y-96 -translate-x-1/3 scale-75 2xl:scale-100 2xl:translate-y-0"
      src="../assets/img/bg/dots.svg"
      alt=""
    />
    <img
      class="h-40 hidden lg:block absolute left-0 top-1/3 transform translate-y-8 -translate-x-1/3 scale-75 2xl:scale-100 2xl:translate-y-44"
      src="../assets/img/bg/dots.svg"
      alt=""
    />
    <img
      class="hidden lg:block absolute right-0 top-1/6 transform -translate-y-36 translate-x-1/2 -rotate-30 scale-75 2xl:scale-110 2xl:top-1/3 2xl:translate-y-0"
      src="../assets/img/bg/cube.png"
      alt=""
    />
    <img
      class="hidden lg:block absolute left-0 top-2/3 transform -translate-y-72 -translate-x-1/3 xl:-translate-y-56 rotate-30 scale-75"
      src="../assets/img/bg/cone.png"
      alt=""
    />
    <img
      class="h-40 hidden lg:block absolute right-0 top-2/3 transform -translate-y-44 translate-x-1/3 xl:-translate-y-32"
      src="../assets/img/bg/dots.svg"
      alt=""
    />

    <c-navigation :links="links" />

    <!-- End Nav -->
    <section class="section pt-20" id="home">
      <div
        class="flex items-center w-full flex-col-reverse md:flex-row-reverse xl:flex-row"
      >
        <div class="w-full md:w-1/2 md:pl-4 xl:pl-0 xl:pr-4 pt-12">
          <h1 class="heading">
            Dobrý deň! Som
            <span class="text-primary whitespace-nowrap">Samuel Krupík</span>
          </h1>
          <p class="content-text mt-8">
            Vitajte! Práve si prezeráte moju osobnú stránku. Som grafický
            <span class="font-bold">dizajnér</span> a webový
            <span class="font-bold">vývojár</span>. Neváhajte si pozrieť moju
            prácu.
            <!-- The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax
            quiz prog. Junk MTV quiz graced by fox whelps. -->
          </p>
          <div class="mt-8 flex items-center">
            <router-link to="#contact" class="button-primary"
              >Kontaktujte ma</router-link
            >
            <router-link to="#about" class="ml-4 link"
              >Viac informácii</router-link
            >
          </div>
        </div>
        <div class="w-full sm:w-3/4 md:w-1/2 flex items-center">
          <img src="../assets/img/hero.png" alt="Hero image" class="w-full" />
        </div>
      </div>
    </section>
    <!-- End Hero -->
    <section
      class="section pt-20 md:pt-28 md:flex md:flex-row-reverse md:items-center lg:flex-row lg:pt-44"
      id="about"
    >
      <div class="sm:px-20 md:px-0 lg:px-4 md:w-1/2">
        <img src="../assets/img/about.png" alt="" />
      </div>
      <div class="mt-10 md:mt-0 lg:pb-10 md:w-1/2">
        <h1 class="heading">O Mne</h1>
        <div>
          <p class="content-text mt-6">
            Moje meno je Samuel Krupík, vyštudoval som digitálny grafický dizajn
            a momentálne študujem odbor
            <span class="font-bold">Multimediálne technológie</span> na
            <a href="https://feit.uniza.sk/" class="link"
              >Žilinskej Univerzite.</a
            >
            <!-- <span class="font-bold">consetetur sadipscing</span> elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. -->
          </p>
          <p class="content-text mt-4">
            Grafickému dizajnu a vývoji webstránok sa venujem už viac ako 5
            rokov. Mojim cieľom je nájsť čo
            <span class="font-bold">najjednoduchšie</span> a
            <span class="font-bold">najelegantnejšie</span> riešenie problému so
            zachovaním pôvodnej myšlienky.
            <!-- Lorem ipsum
            <span class="font-bold">dolor sit amet,</span> consetetur sadipscing
            elitr, sed diam nonumy eirmod tempor invidunt. -->
          </p>
        </div>
        <a href="#" class="button-primary mt-4" onclick="alert(':)')"
          >Stiahnuť životopis</a
        >
      </div>
    </section>
    <!-- End About -->
    <section class="section md:pt-24" id="services">
      <div class="mt-20">
        <h1 class="heading">Moje služby</h1>
        <p class="content-text mt-6">
          Vyberte si z mojej ponuky služieb. Každá práca je spracovaná
          profesionálne s maximálnym citom pre detail.
          <!-- The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax
          quiz prog. Junk MTV quiz graced by fox whelps. -->
        </p>
      </div>
      <div class="grid sm:grid-cols-2 gap-5 lg:grid-cols-3 xl:gap-12 py-12">
        <c-card
          heading="UI/UX Dizajn"
          img-name="ui_design.png"
          :link="{ path: '/projekty', query: { tag: 'ui_ux' } }"
          link-text="Zobraziť projekty"
        >
          Kvalitný a použiteľný dizajn pre obrazovky patrí v dnešnej dobe k
          základom úspechu.
          <!-- Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit
          dolore! -->
        </c-card>
        <c-card
          heading="3D Dizajn"
          img-name="3d_design.png"
          :link="{ path: '/projekty', query: { tag: '3d_dizajn' } }"
          link-text="Zobraziť projekty"
        >
          Chcete sa odlíšiť od konkurencie? S moderným 3D dizajnom sa Vám to
          určite podarí.
          <!-- Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea quis
          dolore quos? -->
        </c-card>
        <c-card
          heading="Webstránky"
          img-name="web.png"
          :link="{ path: '/projekty', query: { tag: 'web' } }"
          link-text="Zobraziť projekty"
        >
          Ešte nemáte svoju webstránku? Ponúkam vám kompletné riešenia od návrhu
          až po nasadenie na server.
          <!-- Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi at est
          officiis! -->
        </c-card>
        <c-card
          heading="Videotvorba"
          img-name="video.png"
          :link="{ path: '/projekty', query: { tag: 'video' } }"
          link-text="Zobraziť projekty"
        >
          Potrebujete odprezentovať vašu firmu či produkt? Pomocou videa si
          získate vašich zákazníkov.
          <!-- Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
          ratione? -->
        </c-card>
        <c-card
          heading="Branding"
          img-name="branding.png"
          :link="{ path: '/projekty', query: { tag: 'branding' } }"
          link-text="Zobraziť projekty"
        >
          Zakladáte nový biznis a ešte nemáte vybudovanú firemnú identitu? Poďme
          to spolu zmeniť.
          <!-- Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos eaque
          nihil! -->
        </c-card>
        <c-card
          heading="Tlačoviny"
          img-name="print.png"
          :link="{ path: '/projekty', query: { tag: 'tlac' } }"
          link-text="Zobraziť projekty"
        >
          &bdquo;Tlačové média sú mŕtve!&ldquo; nepovedal nikdy nikto. Veď kto
          by nechcel mať vizitku.
          <!-- Lorem ipsum dolor sit amet consectetur adipisicing elit. Repell! -->
        </c-card>
      </div>
    </section>
    <!-- End Services -->

    <section class="section pt-4 lg:pt-24" id="projects">
      <div class="lg:text-center lg:mx-auto lg:w-3/4 xl:w-1/2">
        <h1 class="font-heading text-5xl md:text-6xl font-bold text-dark">
          Posledné projekty
        </h1>
        <p class="text-dark font-semibold mt-6">
          Pozrite si moje posledné projekty. Ak tu nenájdete to, čo hľadáte,
          pozrite si
          <!-- The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax
          quiz prog. Junk MTV quiz graced by fox whelps. -->
          <router-link to="/projekty" class="link">všetky projekty</router-link>
          alebo ma
          <router-link to="#contact" class="link"> kontaktujte. </router-link>
        </p>
      </div>
      <swiper
        :lazy="swiper.lazy"
        :space-between="20"
        :breakpoints="swiper.breakpoints"
        class="mt-8"
        :preload-images="false"
        :navigation="swiper.navigation"
        :modules="swiper.modules"
      >
        <swiper-slide
          v-for="project in projects"
          :key="project.id"
          class="relative overflow-visible pb-10"
        >
          <router-link
            :to="{
              name: 'Project',
              params: { id: project.id, slug: project.slug },
            }"
          >
            <div class="relative">
              <img
                :data-src="project.image.conversions.preview.url"
                :data-srcset="project.image.conversions.preview.srcset"
                :src="project.image.conversions.preview.base64svg"
                class="swiper-lazy max-h-full max-w-full rounded-xl shadow-squashed-xl"
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
          </router-link>
          <div
            class="absolute z-5 right-0 h-10 -mt-9 top-full w-full text-right pl-10 text-mid text-sm font-semibold truncate"
          >
            {{ project.title }}
          </div>
        </swiper-slide>
        <swiper-slide class="h-auto pb-10">
          <div
            class="w-full h-full bg-white bg-opacity-60 rounded-xl flex flex-col items-center pb-8"
          >
            <img class="w-2/3" src="../assets/img/rocket.png" alt="" />
            <router-link to="/projekty" class="button-secondary">
              Viac projektov
            </router-link>
          </div>
        </swiper-slide>
      </swiper>
      <div class="w-full flex justify-end">
        <chevron-left-icon
          class="w-12 p-2 text-dark swiper-prev cursor-pointer"
        />
        <chevron-right-icon
          class="w-12 p-2 text-dark swiper-next cursor-pointer"
        />
      </div>
    </section>

    <!-- End Latest Projects -->
    <section class="section pt-20" id="contact">
      <div class="md:flex">
        <div class="flex items-center md:pr-4">
          <img src="../assets/img/contact.png" alt="" />
        </div>
        <div>
          <h1 class="heading mt-8">Kontakt</h1>
          <p class="content-text mt-6">
            Kontaktujte ma telefonicky alebo prostredníctvom e-mailu. Prípadne
            použite kontaktný formulár.
          </p>
          <div class="mt-8 flex flex-col space-y-4">
            <a
              href="mailto:samo.krupik@gmail.com"
              class="flex items-center p-1 space-x-4"
            >
              <phone-icon class="h-6 w-6" />
              <span class="link">samo.krupik@gmail.com</span>
            </a>
            <a href="tel:+421950229659" class="flex items-center p-1 space-x-4">
              <mail-icon class="h-6 w-6" />
              <span class="link">+421 950 229 659</span>
            </a>
          </div>
          <router-link
            tag="a"
            to="/kontakny-formular"
            class="button-primary mt-8"
          >
            Prejsť na kontaktný formulár
          </router-link>
        </div>
      </div>
    </section>
    <!-- End Contact -->
    <section class="section pt-40">
      <c-footer />
    </section>
    <!-- End Footer -->
  </div>
</template>

<script>
// @ is an alias to /src
import CLoader from "@/components/CLoader.vue";
import CCard from "../components/CCard";
import CNavigation from "../components/CNavigation.vue";
import CFooter from "../components/CFooter.vue";
import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue";
import { PhoneIcon, MailIcon } from "@heroicons/vue/outline";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/vue/solid";
import "swiper/modules/lazy/lazy.scss";
import "swiper/swiper.scss";
import { Navigation, Lazy } from "swiper";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  title: "Domov",
  components: {
    CLoader,
    CNavigation,
    CFooter,
    Swiper,
    SwiperSlide,
    CCard,
    PhoneIcon,
    MailIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
  },
  data() {
    return {
      loading: true,
      links: [
        {
          title: "Domov",
          to: "#home",
        },
        {
          title: "O mne",
          to: "#about",
        },
        {
          title: "Služby",
          to: "#services",
        },
        {
          title: "Projekty",
          to: "#projects",
        },
        {
          title: "Kontakt",
          to: "#contact",
        },
      ],
      swiper: {
        breakpoints: {
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1536: {
            slidesPerView: 4,
          },
        },
        navigation: {
          nextEl: ".swiper-next",
          prevEl: ".swiper-prev",
          disabledClass: "opacity-50 cursor-not-allowed",
        },
        lazy: {
          loadingClass: "animate-pulse",
          preloaderClass: "swiper-preloader",
        },
        modules: [Navigation, Lazy],
      },
      hash: window.location.hash,
    };
  },
  computed: {
    ...mapGetters("projects", {
      projects: "latestProjects",
    }),
  },
  async created() {
    await this.$store.dispatch("projects/getLatestProjects");
    window.addEventListener("hashchange", () => {
      this.hash = window.location.hash;
    });
    this.loading = false;
  },
};
</script>
