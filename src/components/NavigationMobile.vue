<template>
  <div class="relative z-20 lg:hidden">
    <svg
      @click="open"
      v-show="!visible"
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 transform"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16m-7 6h7"
      />
    </svg>
    <svg
      @click="close"
      v-show="visible"
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 transform"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </div>
  <div
    v-show="visible"
    class="absolute z-10 w-full h-screen top-0 left-0 bg-white bg-opacity-95 flex items-center justify-center lg:hidden"
  >
    <div class="flex flex-col space-y-2 text-center">
      <a
        class="p-3 font-semibold text-tertiary"
        href=""
        v-for="link in links"
        :key="link.index"
        >{{ link.title }}</a
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      links: [
        {
          title: "Domov",
          href: "#",
        },
        {
          title: "O mne",
          href: "#",
        },
        {
          title: "Služby",
          href: "#",
        },
        {
          title: "Projekty",
          href: "#",
        },
      ],
    };
  },
  methods: {
    open() {
      this.visible = true;
      document.body.style.overflow = "hidden";
    },
    close() {
      this.visible = false;
      document.body.style.overflow = "auto";
    },
  },
};
</script>

<style lang="scss" scoped></style>
