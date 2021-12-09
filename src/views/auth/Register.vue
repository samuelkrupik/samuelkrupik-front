<template>
  <main class="px-6 min-h-screen flex flex-col items-center justify-center">
    <c-logo class="h-10" />
    <div
      class="w-full sm:w-96 px-4 py-8 mt-8 bg-white shadow-md rounded-xl border border-gray-100"
    >
      <div class="">
        <auth-label for="email">Email</auth-label>
        <auth-input type="email" id="email" v-model="register.email" />
      </div>
      <div class="mt-4">
        <auth-label for="name">Meno</auth-label>
        <auth-input type="text" id="name" v-model="register.name" />
      </div>
      <div class="mt-4">
        <auth-label for="password">Heslo</auth-label>
        <auth-input type="password" id="password" v-model="register.password" />
      </div>
      <div class="mt-4">
        <auth-label for="password_confirmation">Kontrola hesla</auth-label>
        <auth-input
          type="password"
          id="password_confirmation"
          v-model="register.password_confirmation"
        />
      </div>
      <div class="mt-8 flex flex-col items-center sm:flex-row-reverse">
        <button class="button-primary w-full rounded-lg sm:w-max">
          Registrácia
        </button>
        <router-link to="/login" class="link mt-3 sm:mr-4 sm:mt-0"
          >Už zaregistrovný?</router-link
        >
      </div>
    </div>
  </main>
</template>

<script>
import CLogo from "@/components/CLogo.vue";
import AuthInput from "@/components/auth/Input.vue";
import AuthLabel from "@/components/auth/Label.vue";
export default {
  components: {
    CLogo,
    AuthInput,
    AuthLabel,
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
};
</script>
