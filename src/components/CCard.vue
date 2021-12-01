<template>
  <div class="bg-white rounded-xl shadow-2xl w-72 px-8 py-10 text-center">
    <div class="h-32 flex justify-center">
      <img :src="require(`@/assets/img/${imgName}`)" alt="" class="h-full" />
    </div>
    <h2 class="text-tertiary font-bold text-2xl mb-2">{{ heading }}</h2>
    <p class="text-tertiary font-semibold">
      <slot></slot>
    </p>
  </div>
</template>

<script>
export default {
  name: "ButtonPrimary",
  props: {
    heading: {
      type: String,
      required: true,
    },
    imgName: {
      type: String,
      required: true,
    },
  },
};
</script>
