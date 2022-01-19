<template>
  <div id="register" @keyup.enter="handleRegister">
    <c-navigation />
    <auth-card>
      <div class="">
        <auth-label for="email">Email</auth-label>
        <auth-input
          type="email"
          id="email"
          v-model="register.email"
          :errors="errors('email')"
        />
      </div>
      <div class="mt-4">
        <auth-label for="name">Meno</auth-label>
        <auth-input
          type="text"
          id="name"
          v-model="register.name"
          :errors="errors('name')"
        />
      </div>
      <div class="mt-4">
        <auth-label for="password">Heslo</auth-label>
        <auth-input
          type="password"
          id="password"
          :errors="errors('password')"
          v-model="register.password"
        />
      </div>
      <div class="mt-4">
        <auth-label for="password_confirmation">Kontrola hesla</auth-label>
        <auth-input
          type="password"
          id="password_confirmation"
          :errors="errors('password_confirmation')"
          v-model="register.password_confirmation"
        />
      </div>
      <div class="mt-8 flex flex-col items-center sm:flex-row-reverse">
        <button
          class="button-primary w-full rounded-lg sm:w-max"
          @click="handleRegister"
        >
          Registrácia
        </button>
        <router-link to="/login" class="link mt-3 sm:mr-4 sm:mt-0"
          >Už zaregistrovaný?</router-link
        >
      </div>
    </auth-card>
  </div>
</template>

<script>
import AuthInput from "@/components/auth/Input.vue";
import AuthLabel from "@/components/auth/Label.vue";
import AuthCard from "@/components/auth/AuthCard.vue";
import CNavigation from "@/components/CNavigation.vue";
import { mapGetters } from "vuex";
export default {
  title: "Registrácia",
  components: {
    AuthInput,
    AuthLabel,
    AuthCard,
    CNavigation,
  },
  data() {
    return {
      register: {
        email: "",
        name: "",
        password: "",
        password_confirmation: "",
      },
    };
  },
  methods: {
    handleRegister() {
      this.$store
        .dispatch("auth/signUp", this.register)
        .then(() => {
          this.$notify.success("Registrácia prebehla úspešne");
          this.$router.replace({ name: "Home" });
        })
        .catch(() => {
          this.$notify.error("Registrácia bola neúspešná");
        });
    },
  },
  computed: {
    ...mapGetters("auth", {
      errors: "errors",
    }),
  },
};
</script>
