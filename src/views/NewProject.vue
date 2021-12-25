<template>
  <div id="new-project">
    <c-navigation />
    <section class="section pt-36">
      <h1 class="heading mb-6">Pridať nový projekt</h1>
      <div class="mb-4">
        <c-label for="title">Názov</c-label>
        <c-input
          id="title"
          v-model="title"
          type="text"
          placeholder="Názov projektu"
        />
      </div>
      <div class="mb-4">
        <c-label for="slug">Slug</c-label>
        <div class="relative">
          <c-input
            id="slug"
            v-model="slug"
            @keyup="slugChanged = true"
            type="text"
            placeholder="nazov-projektu"
          />
          <refresh-icon
            v-if="slugChanged && (title.length || slug.length != 0)"
            @click="generateSlug"
            class="text-mid hover:text-dark transform hover:-rotate-90 absolute right-0 top-0.5 h-full p-3 transition cursor-pointer"
          />
        </div>
      </div>
      <div class="mb-4">
        <c-label for="description">Popis</c-label>
        <c-text-area
          id="description"
          rows="7"
          v-model="description"
          placeholder="Popis projektu..."
        />
      </div>
      <div class="mb-4">
        <c-label for="url">Youtube video link</c-label>
        <c-input
          id="url"
          v-model="url"
          @change="setIframe"
          type="url"
          placeholder="https://www.youtube.com/watch?v=videoid"
        />
        <div
          v-if="iframeLoaded"
          class="rounded-xl overflow-hidden mt-4"
          v-html="iframe"
        ></div>
      </div>
      <div class="mb-4">
        <c-label for="files">Galéria</c-label>
        <c-file-upload id="files" />
        <!-- <label
          class="block px-4 py-2 rounded-lg bg-white w-full shadow-sm border border-gray-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:opacity-50 focus:outline-none focus:border-blue-400"
        >
          <span class="mt-2 text-base leading-normal">{{ filesLabel }}</span>
          <input type="file" multiple class="hidden" id="files" />
        </label> -->
      </div>
      <div class="flex justify-end">
        <button class="button-primary">Pridať projekt</button>
      </div>
      <c-footer class="mt-24" />
    </section>
  </div>
</template>

<script>
import { getIframe } from "@/services/youtube";
import { RefreshIcon } from "@heroicons/vue/solid";
import CNavigation from "@/components/CNavigation.vue";
import CInput from "@/components/auth/Input.vue";
import CLabel from "@/components/auth/Label.vue";
import CTextArea from "@/components/auth/TextArea.vue";
import CFooter from "@/components/CFooter.vue";
import CFileUpload from "@/components/CFileUpload.vue";
export default {
  components: {
    RefreshIcon,
    CNavigation,
    CInput,
    CLabel,
    CTextArea,
    CFooter,
    CFileUpload,
  },
  data() {
    return {
      url: "",
      iframe: "",
      iframeLoaded: false,
      title: "",
      slug: "",
      slugChanged: false,
    };
  },
  watch: {
    title() {
      if (!this.slugChanged) {
        this.generateSlug();
      }
    },
  },
  computed: {
    filesLabel() {
      let label = "Vyberte súbory";
      const fileEl = document.getElementById("files");
      if (!fileEl) {
        return label;
      }
      const files = Array.from(fileEl.files);
      if (files.length > 0) {
        label = "";
        files.forEach((file) => (label = label + file.name + " "));
      }
      return label;
    },
  },
  methods: {
    generateSlug() {
      this.slug = this.$slug(this.title, { lower: true });
      this.slugChanged = false;
    },
    setIframe() {
      const html = getIframe(this.url);
      if (!html) {
        this.iframeLoaded = false;
        return;
      }
      this.iframe = html;
      this.iframeLoaded = true;
    },
  },
};
</script>

<style></style>
