<template>
  <div class="about">
    <section class="section">
      <c-navigation />
    </section>
    <section class="section md:flex md:mt-12 flex-row-reverse items-center">
      <div class="px-20 sm:px-32 md:w-1/2 md:px-0 lg:px-8">
        <img src="../assets/img/contact-form.png" alt="" />
      </div>
      <form
        action="/"
        method="POST"
        class="md:w-1/2"
        @submit.prevent="onSubmit"
      >
        <h1 class="heading mb-8 text-center md:text-left lg:mb-12">
          Kontaktný formulár
        </h1>
        <div class="flex flex-col mb-6">
          <label for="email" class="content-text mb-2">Váš email</label>
          <input
            class="input"
            type="email"
            placeholder="meno.priezvisko@gmail.com"
            id="email"
            name="email"
            required
          />
        </div>
        <div class="flex flex-col">
          <label for="msg" class="content-text mb-2">Vaša správa</label>
          <textarea
            id="msg"
            name="msg"
            class="input resize-y"
            rows="8"
            required
          ></textarea>
        </div>
        <div class="flex flex-col items-center mt-8 xl:flex-row">
          <button type="submit" class="button-primary w-full xl:w-max">
            Odoslať
          </button>
          <a href="tel:+421950229659" class="link mt-6 xl:mt-0 xl:ml-6"
            >Zavolajte mi</a
          >
        </div>
      </form>
    </section>
    <section class="section mt-24">
      <c-footer />
    </section>
  </div>
</template>
<script>
import CNavigation from "@/components/CNavigation";
import CFooter from "@/components/CFooter.vue";

export default {
  title: "Kontakt",
  components: {
    CNavigation,
    CFooter,
  },
  data() {
    return {};
  },
  methods: {
    onSubmit() {
      window.alert("Správa nebola odoslaná!");
    },
  },
};
</script>
