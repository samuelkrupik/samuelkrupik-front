<template>
  <button
    v-if="role === 'button'"
    class="px-4 py-2 rounded-lg bg-gradient-to-b from-secondary to-tertiary text-white"
  >
    <slot></slot>
  </button>
  <a
    :href="href"
    v-else
    class="flex items-center max-w-max px-6 py-2.5 rounded-2xl bg-primary bg-gradient-to-b from-primary to-secondary text-white font-semibold shadow-secondary-xl transform hover:scale-105 hover:shadow-secondary-2xl transition-all duration-200 ease-in-out"
  >
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: "ButtonPrimary",
  props: {
    role: {
      type: String,
      default: null,
    },
    href: {
      type: String,
      default: "#",
    },
  },
};
</script>
