<template>
  <main class="px-6 min-h-screen flex flex-col items-center justify-center">
    <c-loader :loading="loading" />
    <c-logo class="h-10" />
    <div
      class="w-full sm:w-96 px-4 py-8 mt-8 bg-white shadow-md rounded-xl border border-gray-100"
    >
      <div class="">
        <auth-label for="email">Email</auth-label>
        <auth-input
          type="email"
          id="email"
          v-model="login.email"
          :errors="errors('email')"
        />
      </div>
      <div class="mt-4">
        <auth-label for="password">Heslo</auth-label>
        <auth-input
          type="password"
          id="password"
          v-model="login.password"
          :errors="errors('password')"
        />
      </div>
      <div class="mt-8 flex flex-col items-center sm:flex-row-reverse">
        <button
          class="button-primary w-full rounded-lg sm:w-max"
          @click="onSubmit"
        >
          Prihlásenie
        </button>
        <router-link to="/register" class="link mt-3 sm:mr-4 sm:mt-0"
          >Ešte nemáte učet?</router-link
        >
      </div>
    </div>
  </main>
</template>

<script>
import CLogo from "@/components/CLogo.vue";
import AuthInput from "@/components/auth/Input.vue";
import AuthLabel from "@/components/auth/Label.vue";
import CLoader from "@/components/CLoader.vue";
import { mapGetters } from "vuex";

export default {
  title: "Prihlásenie",
  components: {
    CLogo,
    AuthInput,
    AuthLabel,
    CLoader,
  },
  data() {
    return {
      loading: true,
      login: {
        email: "",
        password: "",
      },
    };
  },
  async created() {
    await this.$store.dispatch("csrfCookie");
    this.loading = false;
  },
  computed: {
    ...mapGetters("auth", {
      errors: "errors",
    }),
  },
  methods: {
    async onSubmit() {
      this.$store
        .dispatch("auth/signIn", this.login)
        .then(() => this.$router.replace({ name: "Home" }))
        .catch(() => {});
    },
  },
};
</script>
