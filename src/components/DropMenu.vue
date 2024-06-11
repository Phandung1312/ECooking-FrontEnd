<template>
  <div class="flex">
    <button
      class="flex-shrink-0 inline-flex items-center py-1 px-2 lg:py-2.5 lg:px-4 text-xs md:text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
      type="button">
      {{ title }}
    </button>
    <select v-model="selectedOption" @change="selectOption"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-xs lg:text-sm rounded-e-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-1 lg:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <option :value="option" class="text-xs md:text-sm md:text-sm lg:text-sm sm:w-[50px] md:w-[70px] lg:w[100px]" v-for="(option, index) in filteredOptions" :key="index">
        {{ option.value }}
      </option>

    </select>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      selectedOption: this.options[0]
    };
  },
  props: {
    title: String,
    options: {
      type: Array,
      required: true,
    },
  },
  computed: {
    filteredOptions() {
      return this.options;
    },
  },
  methods: {
    selectOption() {
      this.$emit('option-selected', this.selectedOption.key);
    },
  }
};
</script>
  
<style scoped>
option {
  cursor: pointer;
}

option:hover {
  background-color: #f0f0f0;
}
</style>
