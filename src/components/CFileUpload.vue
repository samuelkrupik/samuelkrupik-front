<template>
  <div>
    <!-- Preview container -->
    <div
      v-if="showPreview"
      class="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-white z-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="absolute right-4 top-4 h-10 w-10 p-1 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg cursor-pointer transition-colors"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        @click="closeImage"
      >
        <title>Zatvoriť</title>
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
      <div class="w-full h-full">
        <img
          :src="previewImageDataUrl"
          class="h-full w-full object-contain mx-auto"
          v-click-outside="closeImage"
        />
      </div>
    </div>
    <!-- End Preview container -->
    <!-- Drop area -->
    <div class="w-full">
      <div
        id="drop-container"
        tabindex="0"
        class="rounded-lg bg-white shadow-sm border border-gray-300 hover:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:opacity-50 focus:outline-none focus:border-blue-400 cursor-pointer"
        @dragover.prevent="dragOver($event)"
        @dragleave.prevent="dragLeave($event)"
        @drop.prevent="drop($event)"
        @click="addFiles"
        @keyup.enter="addFiles"
      >
        <!-- Added files -->
        <div
          v-if="files.length > 0"
          class="grid gap-4 p-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
        >
          <transition-group
            enter-active-class="transition-all duration-300"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
            leave-active-class="transition-all duration-300"
          >
            <div
              v-for="(file, index) in files"
              :key="index"
              class="transform relative shadow rounded-md bg-gray-50 opacity-80 hover:opacity-100 group transition-opacity cursor-pointer overflow-hidden"
              @click.stop="showImage(file.dataUrl)"
            >
              <!-- Thumbnail -->
              <div class="w-full h-24 rounded-md overflow-hidden">
                <img
                  :src="
                    file.dataUrl ?? '../assets/img/misc/upload_placeholder.png'
                  "
                  :alt="file.file.name"
                  class="h-full w-full object-cover"
                />
              </div>
              <!-- File status -->
              <div class="px-2 py-3">
                <p class="text-gray-700 font-semibold truncate">
                  {{ file.file.name }}
                </p>
                <div class="flex items-center text-sm">
                  <div
                    v-if="file.status == 'queued'"
                    class="flex items-center text-gray-600"
                  >
                    <clock-icon class="h-5 w-5 mr-1" />
                    <!-- <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clip-rule="evenodd"
                />
              </svg> -->
                    <span>V poradí</span>
                  </div>
                  <div
                    v-if="file.status == 'uploading'"
                    class="flex items-center text-gray-700"
                  >
                    <arrow-circle-up-icon class="h-5 w-5 mr-1" />
                    <!-- <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                  clip-rule="evenodd"
                />
              </svg> -->
                    <span>Nahrávanie</span>
                  </div>
                  <div
                    v-if="file.status == 'canceled'"
                    class="flex items-center text-yellow-600"
                  >
                    <exclamation-icon class="h-5 w-5 mr-1" />
                    <!-- <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg> -->
                    <span>Zrušené</span>
                  </div>
                  <div
                    v-if="file.status == 'rejected'"
                    class="flex items-center text-red-600"
                    :title="file.message"
                  >
                    <exclamation-circle-icon class="h-5 w-5 mr-1" />
                    <!-- <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg> -->
                    <span>Chyba</span>
                  </div>
                  <div
                    v-if="file.status == 'uploaded'"
                    class="flex items-center text-green-500"
                  >
                    <check-circle-icon class="h-5 w-5 mr-1" />
                    <!-- <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg> -->
                    <span>Dokončené</span>
                  </div>
                </div>
              </div>
              <!-- Remove/cancel -->
              <div
                class="absolute right-1 top-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <template v-if="file.status === 'uploading'">
                  <svg
                    @click.stop="file.cancelUpload()"
                    xmlns="http://www.w3.org/2000/svg"
                    class="bg-yellow-50 text-yellow-600 hover:bg-yellow-100 h-8 w-8 p-1 rounded-md cursor-pointer transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <title>Zastaviť</title>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </template>
                <template
                  v-else-if="
                    file.status === 'canceled' || file.status === 'rejected'
                  "
                >
                  <svg
                    @click.stop="file.enqueue()"
                    xmlns="http://www.w3.org/2000/svg"
                    class="bg-red-50 text-red-600 hover:bg-red-100 h-8 w-8 p-1 rounded-md cursor-pointer transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </template>
                <template v-else>
                  <svg
                    @click.stop="removeFile(index)"
                    xmlns="http://www.w3.org/2000/svg"
                    class="bg-red-50 text-red-600 hover:bg-red-100 h-8 w-8 p-1 rounded-md cursor-pointer transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <title>Odobrať</title>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </template>
              </div>
              <!-- Progress bar -->
              <div
                v-if="file.status === 'uploading'"
                class="absolute bottom-0 left-0 h-1 bg-blue-600 animate-pulse rounded-full"
                :style="{ width: file.uploadProgress + '%' }"
              ></div>
            </div>
          </transition-group>
          <div
            class="flex flex-col items-center justify-center py-6 shadow rounded-md bg-gray-50 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <plus-circle-icon class="w-8 h-8 mt-2" />
            <span class="font-semibold">Pridať</span>
          </div>
        </div>
        <!-- End added files -->
        <div
          v-else
          class="w-full h-48 flex flex-col items-center justify-center text-gray-700"
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
    </div>
    <!-- End drop area -->
    <input
      id="files"
      @change="filesAdded($event)"
      hidden
      name="files"
      type="file"
      multiple
      :accept="acceptedMimes.join()"
    />
  </div>
</template>

<script>
import ImageUploader from "@/services/api";
import {
  CheckCircleIcon,
  ExclamationIcon,
  ExclamationCircleIcon,
  ClockIcon,
  ArrowCircleUpIcon,
  PlusCircleIcon,
} from "@heroicons/vue/solid";

export default {
  name: "CFileUpload",
  components: {
    CheckCircleIcon,
    ExclamationIcon,
    ExclamationCircleIcon,
    ClockIcon,
    ArrowCircleUpIcon,
    PlusCircleIcon,
  },
  data() {
    return {
      files: [],
      formData: null,
      acceptedMimes: ["image/jpeg", "image/png"],
      showPreview: false,
    };
  },
  created() {
    this.$options.activeClasses = [
      "shadow-inner",
      "bg-blue-50",
      "text-blue-500",
      "border-blue-300",
    ];
    this.$options.errorClasses = [
      "bg-red-50",
      "text-red-500",
      "border-red-300",
    ];
  },
  watch: {
    /**
     * Sleduje dĺžku queue -> kontroluje nahrávanie
     */
    queueLength(length) {
      if (length > 0 && !this.isUploading) {
        this.uploadNext();
      }
    },
  },
  computed: {
    /**
     * Zistí, či sa momentálne nahráva súbor
     */
    isUploading() {
      return (
        this.files.filter((file) => file.status === "uploading").length > 0
      );
    },

    /**
     * Zistí dlžku queue
     */
    queueLength() {
      return this.queue.length;
    },

    /**
     * Vráti všetky subory ktore maju nastavene queued na true
     * a následne ich zoradí podľa hodnoty queueOrder
     */
    queue() {
      return this.files
        .filter((file) => file.queued)
        .sort((a, b) => a.queueOrder - b.queueOrder);
    },
  },
  methods: {
    /**
     * Zobrazí obrázok na celú obrazovku
     * @param dataUrl url s dátami obrázku
     */
    showImage(dataUrl) {
      this.previewImageDataUrl = dataUrl;
      this.showPreview = true;
      document.body.style.overflow = "hidden";
    },

    /**
     * Zruší náhľad obrázku na celú obrazovku
     */
    closeImage() {
      this.showPreview = false;
      document.body.style.overflow = "";
    },

    /**
     * Zistí, či je súbor podporovaný
     * @param type Typ súboru (napr. 'image/jpeg')
     */
    isAcceptedType(type) {
      if (type.match(this.acceptedMimes.join("|"))) {
        return true;
      }
      return false;
    },

    /**
     * Nastaví class-y na drop container
     */
    dragOver(event) {
      event.target
        .closest("#drop-container")
        .classList.add(...this.$options.activeClasses);
      Array.from(event.dataTransfer.items).forEach((item) => {
        if (!this.isAcceptedType(item.type)) {
          event.target
            .closest("#drop-container")
            .classList.remove(...this.$options.activeClasses);
          event.target
            .closest("#drop-container")
            .classList.add(...this.$options.errorClasses);
        }
      });
    },

    /**
     * Vymaže class-y z drop-containeru
     * @param event Event dragleave ($event)
     */
    dragLeave(event) {
      event.target
        .closest("#drop-container")
        .classList.remove(
          ...this.$options.activeClasses,
          ...this.$options.errorClasses
        );
    },

    /**
     * Vymaže class-y z drop containeru a pridá všetky dropnuté súbory
     * @param event Event drop ($event)
     */
    drop(event) {
      event.target
        .closest("#drop-container")
        .classList.remove(
          ...this.$options.activeClasses,
          ...this.$options.errorClasses
        );
      Array.from(event.dataTransfer.items).forEach((item) => {
        this.addFile(item.getAsFile());
      });
    },

    /**
     * Pridá všetky súbory ktoré boli pridané cez klasický file input
     * @param event Event vloženia ($event)
     */
    filesAdded(event) {
      Array.from(event.target.files).forEach((file) => {
        this.addFile(file);
      });
    },

    /**
     * Vyvolá akciu na pridanie súborov cez klasický file input
     */
    addFiles() {
      document.getElementById("files").click();
    },

    /**
     * Pridá nový súbor (obrázok) ak je podporovaný a vloží ho do queue na upload
     * @param file Subor na vloženie
     */
    addFile(file) {
      if (!this.isAcceptedType(file.type)) {
        return;
      }
      let image = new ImageUploader(file, this.files);
      image.enqueue();
    },

    /**
     * Nahrá prvý obrázok z queue (prvý v queue bol pridaný ako prvý)
     */
    uploadNext() {
      const image = this.queue[0];
      if (image.status !== "uploading") {
        image.upload().finally(() => image.dequeue());
      }
    },

    /**
     * Odstráni subor z files array
     * @param index Index suboru v poli files
     */
    removeFile(index) {
      this.files.splice(index, 1);
    },
  },
};
</script>
