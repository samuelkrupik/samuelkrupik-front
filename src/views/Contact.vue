<template>
  <div class="about">
    <section class="section">
      <c-navigation :links="links" />
    </section>
    <!-- End Nav -->
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import CNavigation from "@/components/CNavigation";

export default {
  components: {
    CNavigation,
  },
  data() {
    return {
      links: [
        {
          title: "Domov",
          to: "/",
        },
        {
          title: "Kontakt",
          to: "/kontakt",
          active: true,
        },
        {
          title: "Projekty",
          to: "/projekty",
        },
      ],
    };
  },
};
</script>
