<template>
  <form action="/" ref="form">
    <div class="w-full h-48">
      <div
        id="drop-container"
        tabindex="0"
        class="h-full flex flex-col items-center justify-center text-gray-700 rounded-lg bg-white w-full shadow-sm border border-gray-300 hover:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:opacity-50 focus:outline-none focus:border-blue-400 cursor-pointer"
        @dragover.prevent="dragOver($event)"
        @dragleave.prevent="dragLeave($event)"
        @drop.prevent="drop($event)"
        @click="addFiles"
        @keyup.enter="addFiles"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 animate-pulse mt-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <p class="font-medium">Sem potiahnte obrázky alebo kliknite</p>
        <p class="font-light text-sm opacity-50">Maximálne 10 obrázkov</p>
      </div>
    </div>
    <template v-if="files.length > 0">
      <div
        v-for="(file, index) in files"
        :key="index"
        class="py-2 px-4 bg-blue-50 rounded-xl mt-2 text-blue-800 flex"
      >
        <img :src="file.dataUrl" :alt="file.file.name" class="w-24 mr-2" />
        <div>{{ file.file.name }}</div>
      </div>
    </template>
    <input
      id="files"
      @change="filesAdded($event)"
      hidden
      name="files"
      type="file"
      multiple
      :accept="acceptedMimes.join()"
    />
  </form>
</template>

<script>
export default {
  name: "CFileUpload",
  data() {
    return {
      activeClasses: ["bg-blue-50", "text-blue-500", "border-blue-300"],
      files: [],
      formData: null,
      acceptedMimes: ["image/jpeg", "image/png"],
    };
  },
  mounted() {
    this.formData = new FormData(this.$refs.form);
    console.log(this.formData);
  },
  methods: {
    dragOver(event) {
      event.target.classList.add(...this.activeClasses);
    },
    dragLeave(event) {
      event.target.classList.remove(...this.activeClasses);
    },
    drop(event) {
      event.target.classList.remove(...this.activeClasses);
      Array.from(event.dataTransfer.items).forEach((item) => {
        this.addFile(item.getAsFile());
      });
    },
    upload() {},
    filesAdded(event) {
      Array.from(event.target.files).forEach((file) => {
        this.addFile(file);
      });
    },
    addFiles() {
      document.getElementById("files").click();
    },
    addFile(file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newFile = { file: file, dataUrl: reader.result };
        console.log(newFile);
        this.files.push(newFile);
      };
      reader.readAsDataURL(file);

      // this.formData.append(`files[${length - 1}]`, file);
      // console.log(this.formData);
    },
  },
};
</script>

<style></style>
