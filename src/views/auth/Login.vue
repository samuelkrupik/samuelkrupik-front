<template>
  <div id="login">
    <c-loader :loading="loading" />
    <c-navigation />

    <auth-card>
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
    </auth-card>
  </div>
</template>

<script>
import AuthInput from "@/components/auth/Input.vue";
import AuthLabel from "@/components/auth/Label.vue";
import CLoader from "@/components/CLoader.vue";
import CNavigation from "@/components/CNavigation.vue";
import { mapGetters } from "vuex";
import AuthCard from "@/components/auth/AuthCard.vue";

export default {
  title: "Prihlásenie",
  components: {
    AuthInput,
    AuthLabel,
    CLoader,
    CNavigation,
    AuthCard,
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
        .then(() => {
          this.$notify.success("Prihlásenie prebehlo úspešne");
          this.$router.replace({ name: "Home" });
        })
        .catch(() => {
          this.$notify.error(
            "Prihlásenie bolo neúspešné",
            "Skúste znova zadať správne prihlasovacie údaje",
            50000
          );
        });
    },
  },
};
</script>
