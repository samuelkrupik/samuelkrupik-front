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
          :errors="errors('title')"
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
            :errors="errors('slug')"
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
        <c-label for="finish_date">Dátum dokončenia</c-label>
        <c-input
          id="finish_date"
          v-model="finish_date"
          :errors="errors('finish_date')"
          type="date"
        />
      </div>
      <div class="mb-4 relative">
        <c-label for="tags">Tagy</c-label>
        <div
          class="mt-1 flex rounded-lg bg-white w-full shadow-sm border border-gray-300 focus-within:ring focus-within:ring-blue-200 focus-within:ring-opacity-50 focus-within:border-blue-400"
        >
          <div
            v-if="selectedTags.length > 0"
            class="flex space-x-1 items-center px-1"
          >
            <div
              class="flex items-center bg-blue-500 hover:bg-blue-600 text-white rounded-md px-2 py-1 font-medium"
              v-for="tag in selectedTags"
              :key="tag.id"
            >
              {{ tag.name }}
              <x-icon
                class="ml-2 h-6 p-0.5 cursor-pointer"
                @click="deselectTag(tag)"
              />
            </div>
          </div>
          <input
            class="flex-grow px-4 py-2 focus:outline-none rounded-lg"
            id="tags"
            @keyup="suggestTags()"
            v-model="tag"
            ref="tagInput"
          />
        </div>
        <div
          v-if="suggestedTags.length > 0"
          class="absolute bg-white w-full flex flex-col top-full mt-1 rounded-lg text-gray-800 shadow-lg p-1"
        >
          <div
            class="py-2 px-3 font-semibold rounded-md hover:bg-gray-100 cursor-pointer"
            v-for="tag in suggestedTags"
            :key="tag.id"
            @click="selectTag(tag)"
          >
            {{ tag.name }}
          </div>
        </div>
      </div>
      <div class="mb-4">
        <c-label for="description">Popis</c-label>
        <c-text-area
          id="description"
          rows="7"
          v-model="description"
          :errors="errors('description')"
          placeholder="Popis projektu..."
        />
      </div>
      <div class="mb-4">
        <c-label for="url">Youtube video link</c-label>
        <c-input
          id="url"
          v-model="video_url"
          :errors="errors('video_url')"
          @change="setIframe"
          type="url"
          pattern="https://www.youtube.com/watch?v=*"
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
        <c-file-upload
          id="files"
          :errors="errors('images')"
          v-model:allUploaded="uploadStatus.allUploaded"
          v-model:uploadedIds="uploadStatus.uploadedIds"
        />
        <!-- <label
          class="block px-4 py-2 rounded-lg bg-white w-full shadow-sm border border-gray-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:opacity-50 focus:outline-none focus:border-blue-400"
        >
          <span class="mt-2 text-base leading-normal">{{ filesLabel }}</span>
          <input type="file" multiple class="hidden" id="files" />
        </label> -->
      </div>
      <div class="flex justify-end">
        <button class="button-primary" @click.prevent="createProject">
          Pridať projekt
        </button>
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
import { XIcon } from "@heroicons/vue/solid";
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  components: {
    RefreshIcon,
    CNavigation,
    CInput,
    CLabel,
    CTextArea,
    CFooter,
    CFileUpload,
    XIcon,
  },
  data() {
    return {
      title: "",
      slug: "",
      tags: [],
      tag: "",
      suggestedTags: [],
      description: "",
      finish_date: "2021-1-1",
      video_url: "",
      uploadStatus: {
        allUploaded: true,
        uploadedIds: "",
      },
      iframe: "",
      iframeLoaded: false,
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
    ...mapGetters(["errors"]),
    selectedTags() {
      return this.tags.filter((tag) => tag.selected);
    },
    projectData() {
      return {
        title: this.title,
        slug: this.slug,
        finish_date: this.finish_date,
        description: this.description,
        video_url: this.video_url,
        images: this.uploadStatus.uploadedIds,
        tags: this.tags
          .filter((tag) => tag.selected)
          .map((tag) => tag.id)
          .join(),
      };
    },
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
  mounted() {
    this.fetchTags();
  },
  methods: {
    suggestTags() {
      if (this.tag.length == 0) {
        this.suggestedTags = [];
        return;
      }
      this.suggestedTags = this.tags.filter(
        (tag) =>
          (tag.slug.search(this.tag.toLowerCase()) != -1 ||
            tag.name.search(this.tag) != -1) &&
          tag.selected != true
      );
    },
    selectTag(tag) {
      tag.selected = true;
      this.tag = "";
      this.suggestTags();
      this.$refs.tagInput.focus();
    },
    deselectTag(tag) {
      tag.selected = false;
      //this.tags = this.selectedTags.filter((tag) => tag.id != id);
    },
    fetchTags() {
      axios.get("/api/tags").then((res) => {
        this.tags = res.data.data;
      });
    },
    generateSlug() {
      this.slug = this.$slug(this.title, { lower: true });
      this.slugChanged = false;
    },
    setIframe() {
      const html = getIframe(this.video_url);
      if (!html) {
        this.iframeLoaded = false;
        return;
      }
      this.iframe = html;
      this.iframeLoaded = true;
    },
    createProject() {
      if (!this.uploadStatus.allUploaded) {
        this.$notify.warning("Prebieha nahrávanie", "Počkajte prosím...");
        return;
      }
      this.$store
        .dispatch("projects/createProject", this.projectData)
        .then(() => {
          this.$notify.success("Projekt bol pridaný!", null, 7500);
          this.$router.replace({ name: "Projects" });
        })
        .catch(() => {
          this.$notify.error(
            "Pri pridávaní projeku nastala chyba!",
            "Skontrolujte údaje a skúste to znova prosím...",
            7500
          );
        });
    },
  },
};
</script>

<style></style>
