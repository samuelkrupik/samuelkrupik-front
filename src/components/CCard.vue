<template>
  <div
    class="bg-white bg-opacity-40 flex flex-col items-center rounded-xl w-full px-8 py-12 text-center sm:shadow-none"
  >
    <div class="h-32 md:h-36 flex justify-center">
      <img
        :src="require(`@/assets/img/cards/${imgName}`)"
        alt=""
        class="h-full"
      />
    </div>
    <h2 class="text-dark font-bold text-2xl mb-2">{{ heading }}</h2>
    <p class="text-mid font-semibold w-3/4 sm:w-full flex-grow">
      <slot></slot>
    </p>
    <router-link :to="link" class="button-secondary mt-4">{{
      linkText
    }}</router-link>
  </div>
</template>

<script>
export default {
  name: "CCard",
  props: {
    heading: {
      type: String,
      required: true,
    },
    imgName: {
      type: String,
      required: true,
    },
    link: {
      required: true,
    },
    linkText: {
      type: String,
      required: true,
    },
  },
};
</script>
