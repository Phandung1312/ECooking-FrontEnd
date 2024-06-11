<script>
import Sidebar from "./Sidebar.vue";
import Navbar from "./Navbar.vue";
import { ref, watch } from "vue";

export default {
  components: {
    Sidebar,
    Navbar,
  },
  setup() {
    const isExpanded = ref(JSON.parse(localStorage.getItem("isExpanded")));

    const toggleMenu = () => {
      isExpanded.value = !isExpanded.value;
      localStorage.setItem("isExpanded", JSON.stringify(isExpanded.value));
    };

    watch(
      () => localStorage.getItem("isExpanded"),
      (newValue) => {
        isExpanded.value = JSON.parse(newValue) || false
      }
    );

    return {
      isExpanded,
      toggleMenu,
    };
  },
};
</script>

<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-800">
    <Sidebar :isExpanded="isExpanded" />
    <div class="flex-1 flex flex-col overflow-hidden">
      <Navbar :isExpanded="isExpanded" @toggleMenu="toggleMenu" />
      <router-view
        class="flex-1 p-3 sm:p-3 md:p-4 lg:p-8 overflow-x-hidden overflow-y-auto bg-gray-200 dark:bg-gray-700"
      ></router-view>
    </div>
  </div>
</template>
