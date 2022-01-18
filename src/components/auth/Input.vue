<template>
  <div>
    <div v-if="type === 'password'" class="relative mt-1">
      <input
        :id="id"
        :value="modelValue"
        :placeholder="placeholder"
        :class="{ 'border-red-600': errors != null }"
        @input="$emit('update:modelValue', $event.target.value)"
        ref="input"
        :type="show ? 'text' : 'password'"
        class="px-4 py-2 rounded-lg bg-white w-full shadow-sm border border-gray-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:opacity-50 focus:outline-none focus:border-blue-400"
      />
      <transition
        enter-active-class="transition-all duration-100"
        enter-from-class="opacity-0 -translate-y-1/2"
        enter-to-class="opacity-100 translate-y-0"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-1/2"
        leave-active-class="transition-all duration-100"
        mode="out-in"
      >
        <eye-off-icon
          v-if="show"
          class="text-gray-600 absolute h-6 p-1 right-2 top-1/2 -mt-3 transform cursor-pointer"
          @click="toggle"
        />
        <eye-icon
          v-else
          class="text-gray-600 absolute h-6 p-1 right-2 top-1/2 -mt-3 transform cursor-pointer"
          @click="toggle"
        />
      </transition>
    </div>
    <input
      v-else
      :placeholder="placeholder"
      :id="id"
      :type="type"
      :value="modelValue"
      :class="{ 'border-red-600': errors != null }"
      @input="$emit('update:modelValue', $event.target.value)"
      class="mt-1 px-4 py-2 rounded-lg bg-white w-full shadow-sm border border-gray-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:opacity-50 focus:outline-none focus:border-blue-400"
    />
    <ul
      v-if="errors != null"
      class="mt-1 text-red-600 text-xs font-medium list-disc pl-4"
    >
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </div>
</template>

<script>
import { EyeOffIcon, EyeIcon } from "@heroicons/vue/solid";
export default {
  data() {
    return {
      show: false,
      content: this.value,
    };
  },
  components: {
    EyeIcon,
    EyeOffIcon,
  },
  props: ["modelValue", "type", "errors", "id", "placeholder"],
  emits: ["update:modelValue"],
  methods: {
    toggle() {
      this.show = !this.show;
      this.$refs.input.focus();
    },
    handleInput() {
      this.$emit("input", this.content);
    },
  },
};
</script>
