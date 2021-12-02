<template>
  <div class="home">
    <section class="section">
      <nav class="flex items-center justify-between py-8">
        <c-logo class="h-8" />
        <div class="hidden md:flex md:items-center space-x-10">
          <a
            class="font-semibold text-dark p-2"
            href="{{link.href}}"
            v-for="link in links"
            :key="link.index"
          >
            {{ link.title }}
          </a>
        </div>
        <a href="#" class="hidden md:flex button-primary">Objednať</a>
        <navigation-mobile></navigation-mobile>
      </nav>
    </section>
    <!-- End Nav -->
    <section class="section">
      <div class="flex w-full flex-col-reverse md:flex-row">
        <div class="w-full md:w-1/2 pt-12">
          <h1 class="font-heading text-5xl md:text-6xl font-bold text-dark">
            Dobrý deň! Som <span class="text-primary">Samuel Krupík</span>
          </h1>
          <p class="text-dark font-semibold mt-8">
            The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax
            quiz prog. Junk MTV quiz graced by fox whelps.
          </p>
          <div class="mt-8 flex items-center">
            <a href="#" class="button-primary">Kontaktujte ma</a>
            <a href="#" class="ml-4 link">Viac informácii</a>
          </div>
        </div>
        <div class="w-full md:w-1/2 flex items-center">
          <img src="../assets/img/hero.png" alt="Hero image" class="w-full" />
        </div>
      </div>
    </section>
    <!-- End Hero -->
    <section class="section">
      <div class="mt-20">
        <img src="../assets/img/about.png" alt="" />
        <div class="mt-10">
          <h1 class="font-heading text-5xl md:text-6xl font-bold text-dark">
            O Mne
          </h1>
          <div>
            <p class="text-dark font-semibold mt-6">
              Lorem ipsum dolor sit amet,
              <span class="font-bold">consetetur sadipscing</span> elitr, sed
              diam nonumy eirmod tempor invidunt ut labore et dolore magna
              aliquyam erat, sed diam voluptua.
            </p>
            <p class="text-dark font-semibold mt-4">
              Lorem ipsum
              <span class="font-bold">dolor sit amet,</span> consetetur
              sadipscing elitr, sed diam nonumy eirmod tempor invidunt.
            </p>
          </div>
          <a href="#" class="button-primary block mt-4">Stiahnuť životopis</a>
        </div>
      </div>
    </section>
    <!-- End About -->
    <section class="section">
      <div class="mt-20">
        <h1 class="font-heading text-5xl md:text-6xl font-bold text-dark">
          Moje služby
        </h1>
        <p class="text-dark font-semibold mt-6">
          The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax
          quiz prog. Junk MTV quiz graced by fox whelps.
        </p>
      </div>
    </section>
    <swiper :space-between="20" slides-per-view="auto" class="px-6 pb-16 pt-8">
      <swiper-slide class="max-w-max">
        <c-card
          heading="UI/UX Dizajn"
          img-name="ui_design.png"
          link="#"
          link-text="Zobraziť projekty"
        >
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor amet, consetetur.
        </c-card>
      </swiper-slide>
      <swiper-slide class="max-w-max">
        <c-card
          heading="3D Dizajn"
          img-name="3d_design.png"
          link="#"
          link-text="Zobraziť projekty"
        >
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor amet, consetetur.
        </c-card>
      </swiper-slide>
      <swiper-slide class="max-w-max">
        <c-card
          heading="Webstránky"
          img-name="web.png"
          link="#"
          link-text="Zobraziť projekty"
        >
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor amet, consetetur.
        </c-card>
      </swiper-slide>
    </swiper>
    <!-- End Services -->
    <section class="section mt-4">
      <h1 class="font-heading text-5xl md:text-6xl font-bold text-dark">
        Posledné projekty
      </h1>
      <p class="text-dark font-semibold mt-6">
        The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax
        quiz prog. Junk MTV quiz graced by fox whelps.
      </p>
    </section>
    <swiper :space-between="20" slides-per-view="auto" class="px-6 pb-16 pt-8">
      <swiper-slide class="max-w-max" v-for="n in 10" :key="n">
        <div
          class="w-72 h-48 bg-white shadow-lg rounded-lg flex items-center justify-center text-mid text-xl"
        >
          {{ n }}
        </div>
      </swiper-slide>
    </swiper>
    <!-- End Latest Projects -->
    <section class="section mt-4">
      <img src="../assets/img/contact.png" alt="" />
      <h1 class="mt-8 font-heading text-5xl md:text-6xl font-bold text-dark">
        Kontakt
      </h1>
      <p class="text-dark font-semibold mt-6">
        Kontaktujte ma telefonicky alebo prostredníctvom e-mailu. Prípadne
        použite kontaktný formulár.
      </p>
      <div class="mt-8 flex flex-col space-y-4">
        <a
          href="mailto:samo.krupik@gmail.com"
          class="flex items-center p-1 space-x-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span class="link">samo.krupik@gmail.com</span>
        </a>
        <a href="tel:+421950229659" class="flex items-center p-1 space-x-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <span class="link">+421 950 229 659</span>
        </a>
      </div>
      <a href="#" class="button-primary block mt-8">
        Prejsť na kontaktný formulár
      </a>
    </section>
    <!-- End Contact -->
    <section class="section mt-10 pb-10">
      <footer class="flex justify-between">
        <div class="w-1/2">
          <c-logo class="w-8" />
          <p class="text-dark font-semibold mt-2">
            Samuel Krupík<br />
            &copy;2021
          </p>
        </div>
        <div class="w-1/2">
          <p class="text-dark font-semibold">Sledujte ma</p>
          <div class="flex items-center space-x-2 mt-2">
            <div class="social-icon">
              <svg
                class="h-8 w-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 31.198 30.428"
              >
                <g>
                  <path
                    id="Path_8"
                    d="M15.581,0A15.6,15.6,0,0,0,10.65,30.4c.775.145,1.064-.338,1.064-.752,0-.372-.013-1.6-.021-2.9-4.34.943-5.254-1.839-5.254-1.839a4.111,4.111,0,0,0-1.733-2.284c-1.416-.969.106-.948.106-.948A3.28,3.28,0,0,1,7.2,23.283a3.312,3.312,0,0,0,4.539,1.292,3.329,3.329,0,0,1,.992-2.085c-3.454-.39-7.109-1.728-7.109-7.706a6.032,6.032,0,0,1,1.609-4.193,5.608,5.608,0,0,1,.15-4.133s1.31-.418,4.291,1.6a14.817,14.817,0,0,1,7.814,0c2.966-2.007,4.286-1.6,4.286-1.6a5.618,5.618,0,0,1,.152,4.133,6.029,6.029,0,0,1,1.6,4.187c0,5.993-3.648,7.311-7.122,7.7a3.732,3.732,0,0,1,1.057,2.888c0,2.087-.015,3.769-.015,4.28,0,.416.279.9,1.069.749A15.6,15.6,0,0,0,15.581,0Z"
                    transform="translate(0.026 0)"
                    fill="#191717"
                    fill-rule="evenodd"
                  />
                  <path
                    id="Path_9"
                    d="M21.694,85.946a.189.189,0,0,1-.258.049c-.1-.052-.178-.158-.142-.235a.19.19,0,0,1,.258-.049c.1.052.178.158.139.235Z"
                    transform="translate(-15.779 -63.549)"
                    fill="#191717"
                  />
                  <path
                    id="Path_10"
                    d="M24.147,88.19c-.075.07-.22.036-.32-.072a.238.238,0,0,1-.044-.323c.077-.07.217-.036.32.072S24.225,88.126,24.147,88.19Z"
                    transform="translate(-17.6 -65.088)"
                    fill="#191717"
                  />
                  <path
                    id="Path_11"
                    d="M26.5,91.381c-.1.067-.258,0-.349-.134s-.1-.3,0-.372.258,0,.349.132S26.594,91.313,26.5,91.381Z"
                    transform="translate(-19.336 -67.38)"
                    fill="#191717"
                  />
                  <path
                    id="Path_12"
                    d="M29.434,94.765a.292.292,0,0,1-.411-.07c-.137-.127-.176-.3-.088-.4s.258-.07.4.059.176.3.085.4Z"
                    transform="translate(-21.419 -69.896)"
                    fill="#191717"
                  />
                  <path
                    id="Path_13"
                    d="M33.582,97.241c-.039.121-.212.178-.39.127s-.292-.2-.258-.32.212-.181.39-.127S33.615,97.117,33.582,97.241Z"
                    transform="translate(-24.415 -71.869)"
                    fill="#191717"
                  />
                  <path
                    id="Path_14"
                    d="M38.479,97.927c0,.129-.145.235-.331.238s-.336-.1-.338-.227.145-.235.333-.238S38.479,97.8,38.479,97.927Z"
                    transform="translate(-28.036 -72.462)"
                    fill="#191717"
                  />
                  <path
                    id="Path_15"
                    d="M43.094,97.29c.023.127-.106.258-.289.289s-.349-.044-.372-.171.108-.258.289-.289S43.07,97.164,43.094,97.29Z"
                    transform="translate(-31.462 -72.026)"
                    fill="#191717"
                  />
                </g>
              </svg>
            </div>
            <div class="social-icon">
              <svg
                id="dribbble-ball-icon"
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8"
                viewBox="0 0 29.538 29.538"
              >
                <rect
                  id="Rectangle_8"
                  data-name="Rectangle 8"
                  width="29.393"
                  height="29.393"
                  transform="translate(0 0)"
                  fill="rgba(0,0,0,0)"
                />
                <circle
                  id="Ellipse_12"
                  data-name="Ellipse 12"
                  cx="13.962"
                  cy="13.962"
                  r="13.962"
                  transform="translate(0.735 0.735)"
                  fill="#ea4c89"
                />
                <path
                  id="Path_7"
                  data-name="Path 7"
                  d="M14.757,0A14.757,14.757,0,1,0,29.513,14.757,14.761,14.761,0,0,0,14.757,0ZM24.5,6.8a12.547,12.547,0,0,1,2.849,7.842,29.762,29.762,0,0,0-8.771-.4c-.1-.208-.176-.432-.272-.656-.256-.608-.544-1.232-.832-1.825A16.869,16.869,0,0,0,24.5,6.8ZM14.757,2.177a12.576,12.576,0,0,1,8.355,3.169A14.286,14.286,0,0,1,16.5,9.891,68.047,68.047,0,0,0,11.8,2.513,12.818,12.818,0,0,1,14.757,2.177ZM9.395,3.361a79.537,79.537,0,0,1,4.673,7.282A47.269,47.269,0,0,1,2.417,12.18,12.663,12.663,0,0,1,9.395,3.361ZM2.145,14.773v-.384A46.054,46.054,0,0,0,15.093,12.6c.368.7.7,1.424,1.024,2.145-.16.048-.336.1-.5.144A20.038,20.038,0,0,0,5.378,23.191,12.575,12.575,0,0,1,2.145,14.773Zm12.612,12.6a12.516,12.516,0,0,1-7.73-2.657c.224-.464,2.785-5.394,9.891-7.874.032-.016.048-.016.08-.032a52.1,52.1,0,0,1,2.689,9.555A12.4,12.4,0,0,1,14.757,27.369Zm7.026-2.161a54.229,54.229,0,0,0-2.449-8.979,18.407,18.407,0,0,1,7.842.544A12.5,12.5,0,0,1,21.783,25.208Z"
                  transform="translate(0.025 0.025)"
                  fill="#c32361"
                  fill-rule="evenodd"
                />
              </svg>
            </div>
            <div class="social-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8"
                viewBox="0 0 27.442 24.148"
              >
                <g id="ArtStation-logomark-white" transform="translate(0 0)">
                  <path
                    id="Path_4"
                    data-name="Path 4"
                    d="M51.4,123.3l2.308,3.994h0a2.786,2.786,0,0,0,2.464,1.53H71.554l-3.19-5.525Z"
                    transform="translate(-51.4 -104.677)"
                    fill="#13aff0"
                  />
                  <path
                    id="Path_5"
                    data-name="Path 5"
                    d="M109.578,70.149a2.76,2.76,0,0,0-.441-1.5l-9.026-15.666A2.748,2.748,0,0,0,97.673,51.5H92.9l13.929,24.122,2.2-3.813A2.853,2.853,0,0,0,109.578,70.149Z"
                    transform="translate(-82.136 -51.5)"
                    fill="#13aff0"
                  />
                  <path
                    id="Path_6"
                    data-name="Path 6"
                    d="M72.624,77.364,66.425,66.6,60.2,77.364Z"
                    transform="translate(-57.917 -62.683)"
                    fill="#13aff0"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </footer>
    </section>
    <!-- End Footer -->
  </div>
</template>

<script>
// @ is an alias to /src
import CLogo from "../components/CLogo.vue";
import NavigationMobile from "../components/NavigationMobile.vue";
import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue";
import CCard from "../components/CCard";
import "swiper/swiper.scss";

export default {
  name: "Home",
  components: {
    CLogo,
    NavigationMobile,
    Swiper,
    SwiperSlide,
    CCard,
  },
  data() {
    return {
      links: [
        {
          title: "Domov",
          href: "#",
        },
        {
          title: "O mne",
          href: "#",
        },
        {
          title: "Služby",
          href: "#",
        },
        {
          title: "Projekty",
          href: "#",
        },
      ],
    };
  },
};
</script>
