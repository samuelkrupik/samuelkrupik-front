<template>
  <div
    class="flex flex-col items-center bg-white rounded-xl shadow-xl w-72 px-8 py-10 text-center bg-opacity-60"
  >
    <div class="h-32 flex justify-center">
      <img :src="require(`@/assets/img/${imgName}`)" alt="" class="h-full" />
    </div>
    <h2 class="text-dark font-bold text-2xl mb-2">{{ heading }}</h2>
    <p class="text-mid font-semibold">
      <slot></slot>
    </p>
    <a :href="link" class="button-secondary mt-4">{{ linkText }}</a>
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
      type: String,
      required: true,
    },
    linkText: {
      type: String,
      required: true,
    },
  },
};
</script>
