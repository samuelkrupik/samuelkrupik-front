<template>
  <transition
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
    leave-active-class="transition-all duration-500"
  >
    <div
      style="z-index: 999"
      class="fixed top-0 left-0 w-screen h-screen bg-white flex flex-col items-center justify-center"
      v-if="loading"
    >
      <svg
        class="animate-spin h-10 w-10 text-dark"
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
      <h2 class="mt-4 font-medium text-dark">Načítavam...</h2>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["loading"],
};
</script>
