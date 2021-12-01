<template>
  <div class="home">
    <nav class="flex items-center justify-between py-8">
      <logo class="h-8" />
      <div class="hidden md:flex md:items-center space-x-10">
        <a
          class="font-semibold text-tertiary p-2"
          href="{{link.href}}"
          v-for="link in links"
          :key="link.index"
        >
          {{ link.title }}
        </a>
      </div>
      <button-primary class="hidden md:block">Objednať</button-primary>
      <navigation-mobile></navigation-mobile>
    </nav>
    <!-- End Nav -->
    <div class="flex w-full flex-col-reverse md:flex-row">
      <div class="w-full md:w-1/2 pt-12">
        <h1 class="font-heading text-5xl md:text-6xl font-bold text-tertiary">
          Dobrý deň! Som <span class="text-primary">Samuel Krupík</span>
        </h1>
        <p class="text-tertiary font-semibold mt-8">
          The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax
          quiz prog. Junk MTV quiz graced by fox whelps.
        </p>
        <div class="mt-8 flex items-center">
          <button-primary href="#">Kontaktujte ma</button-primary>
          <a href="#" class="ml-4 underline font-semibold text-tertiary"
            >Viac informácii</a
          >
        </div>
      </div>
      <div class="w-full md:w-1/2 flex items-center">
        <img src="../assets/img/hero.png" alt="Hero image" class="w-full" />
      </div>
    </div>
    <!-- End Hero -->
    <div class="mt-20">
      <img src="../assets/img/about.png" alt="" />
      <div class="mt-10">
        <h1 class="font-heading text-5xl md:text-6xl font-bold text-tertiary">
          O Mne
        </h1>
        <div>
          <p class="text-tertiary font-semibold mt-6">
            Lorem ipsum dolor sit amet,
            <span class="font-bold">consetetur sadipscing</span> elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </p>
          <p class="text-tertiary font-semibold mt-4">
            Lorem ipsum
            <span class="font-bold">dolor sit amet,</span> consetetur sadipscing
            elitr, sed diam nonumy eirmod tempor invidunt.
          </p>
        </div>
        <button-primary class="mt-8">Stiahnuť životopis</button-primary>
      </div>
    </div>
    <!-- End About -->
    <div class="my-20">
      <h1 class="font-heading text-5xl md:text-6xl font-bold text-tertiary">
        Moje služby
      </h1>
      <p class="text-tertiary font-semibold mt-6">
        The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax
        quiz prog. Junk MTV quiz graced by fox whelps.
      </p>
      <div class="mt-10">
        <div class="bg-white rounded-xl shadow-2xl w-72 px-8 py-10 text-center">
          <div class="px-8 mb-4">
            <img src="../assets/img/ui_ux_design.png" alt="" class="w-full" />
          </div>
          <h2 class="text-tertiary font-bold text-2xl mb-2">UX/UI Dizajn</h2>
          <p class="text-tertiary font-semibold">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor amet, consetetur.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Logo from "../components/Logo.vue";
import ButtonPrimary from "../components/ButtonPrimary.vue";
import NavigationMobile from "../components/NavigationMobile.vue";

export default {
  name: "Home",
  components: {
    Logo,
    ButtonPrimary,
    NavigationMobile,
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
