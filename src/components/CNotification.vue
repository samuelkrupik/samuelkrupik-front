<template>
  <div
    class="w-full rounded-lg p-4 bg-white border border-gray-300 shadow-xl flex items-center relative overflow-hidden"
    @mouseenter="pauseCountdown"
    @mouseleave="resumeCountdown"
  >
    <component
      :is="variant.component"
      :class="variant.class"
      class="w-7 h-7 mr-4"
    />
    <div class="mr-3">
      <p class="font-semibold text-gray-800">
        {{ notification.message }}
      </p>
      <p class="text-gray-500" v-if="notification.text">
        {{ notification.text }}
      </p>
    </div>
    <x-icon
      class="w-9 h-9 p-1 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
      @click="$emit('removeNotification')"
    />
    <div
      class="bg-gray-300 w-full origin-left absolute bottom-0 left-0 h-1 transform ease-linear transition-transform"
      :style="{
        transform: `scaleX(${progressWidth})`,
        transitionDuration: transitionDuration,
      }"
    ></div>
  </div>
</template>

<script>
import {
  CheckCircleIcon,
  ExclamationIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XIcon,
} from "@heroicons/vue/outline";
import { NotificationType as Type } from "../services/notify";

export default {
  data() {
    return {
      progressInterval: null,
      millisPassed: 0,
      interval: 100,
    };
  },
  components: {
    CheckCircleIcon,
    ExclamationIcon,
    ExclamationCircleIcon,
    InformationCircleIcon,
    XIcon,
  },
  props: {
    notification: {
      required: true,
      type: Object,
    },
  },
  emits: ["removeNotification"],
  computed: {
    variant() {
      switch (this.notification.type) {
        case Type.SUCCESS:
          return {
            component: "CheckCircleIcon",
            class: "text-green-500",
          };
        case Type.ERROR:
          return {
            component: "ExclamationCircleIcon",
            class: "text-red-500",
          };
        case Type.WARNING:
          return {
            component: "ExclamationIcon",
            class: "text-yellow-500",
          };
        case Type.INFO:
          return {
            component: "InformationCircleIcon",
            class: "text-gray-500",
          };
        default:
          return {};
      }
    },
    progressWidth() {
      return (
        (this.notification.duration - this.millisPassed) /
        this.notification.duration
      ).toFixed(3);
    },
    transitionDuration() {
      return (this.interval - 5).toString() + "ms";
    },
  },
  methods: {
    startCountdown() {
      this.progressInterval = setInterval(() => {
        if (this.progressWidth == 0) {
          this.$emit("removeNotification");
        }
        this.millisPassed += this.interval;
      }, this.interval);
    },
    pauseCountdown() {
      clearInterval(this.progressInterval);
    },
    resumeCountdown() {
      this.startCountdown();
    },
  },
  created() {
    this.startCountdown();
  },
  beforeUnmount() {
    clearInterval(this.progressInterval);
  },
};
</script>
