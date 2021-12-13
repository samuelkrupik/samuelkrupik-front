<template>
  <img
    :loading="loading"
    :srcset="srcset"
    onload="
      window.requestAnimationFrame(function () {
        if (!(size = getBoundingClientRect().width)) return;
        onload = null;
        sizes = Math.ceil((size / window.innerWidth) * 100) + 'vw';
      })
    "
    ref="img"
    sizes="1px"
    :src="url"
  />
</template>

<script>
export default {
  props: {
    image: { type: Object, required: true },
    loading: { type: String, default: "eager" },
    conversion: { type: String, required: true },
  },
  computed: {
    srcset() {
      if (!this.image.conversions) {
        return;
      }
      return this.image.conversions[this.conversion].srcset;
    },
    url() {
      if (!this.image.conversions) {
        return;
      }
      return this.image.conversions[this.conversion].url;
    },
  },
};
</script>

<style></style>
