<template>
  <div>
    <textarea
      :placeholder="placeholder"
      :id="id"
      :rows="rows"
      :cols="cols"
      v-text="modelValue"
      :class="{ 'border-red-600': errors != null }"
      @input="$emit('update:modelValue', $event.target.value)"
      class="mt-1 px-4 py-2 rounded-lg bg-white w-full shadow-sm border border-gray-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:opacity-50 focus:outline-none focus:border-blue-400"
    ></textarea>
    <ul
      v-if="errors != null"
      class="mt-1 text-red-600 text-xs font-medium list-disc pl-4"
    >
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      content: this.value,
    };
  },
  props: ["modelValue", "type", "errors", "id", "placeholder", "rows", "cols"],
  emits: ["update:modelValue"],
  methods: {
    handleInput() {
      this.$emit("input", this.content);
    },
  },
};
</script>
