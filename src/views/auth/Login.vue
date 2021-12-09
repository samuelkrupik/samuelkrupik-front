<template>
  <main class="px-6 min-h-screen flex flex-col items-center justify-center">
    <c-logo class="h-10" />
    <div
      class="w-full sm:w-96 px-4 py-8 mt-8 bg-white shadow-md rounded-xl border border-gray-100"
    >
      <div class="">
        <auth-label for="email">Email</auth-label>
        <auth-input type="email" id="email" v-model="login.email" />
      </div>
      <div class="mt-4">
        <auth-label for="password">Heslo</auth-label>
        <auth-input type="password" id="password" v-model="login.password" />
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
import { mapActions } from "vuex";

export default {
  components: {
    CLogo,
    AuthInput,
    AuthLabel,
  },
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
    };
  },
  created() {
    this.$api.get("/sanctum/csrf-cookie").then(() => {});
  },
  methods: {
    ...mapActions({
      signIn: "auth/signIn",
    }),
    async onSubmit() {
      await this.signIn(this.login);
      this.$router.replace({ name: "Home" });
    },
  },
};
</script>
