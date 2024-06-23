<template>
  <aside :class="`${isExpanded ? 'w-50 lg:w-72' : 'hidden sm:w-18 sm:block'
    } transition-width duration-200 ease-in-out`" class="flex flex-col text-light min-h-screen">
    <div class="mb-2 p-2 flex justify-center items-center">
      <div class="flex items-center space-x-2">
        <img src="../assets/logo.png" alt="Logo" class="w-10 h-10" />
        <h1 class="text-2xl font-bold hidden md:block" v-show="isExpanded">ECooking</h1>
      </div>
    </div>

    <div>
   
  
      <div class="relative cursor-pointer">
    
        <router-link  to="/users"
          class="flex items-center space-x-2 py-2 px-4 border-l-4 font-semibold" :class="{
            'font-semibold bg-blue-200 border-blue-500':
              $route.name === 'UserList',
            'text-gray-500 hover:bg-gray-200': $route.name !== 'UserList',
          }">
          <span class="material-icons text-2xl transition duration-200"
            :class="{ 'text-blue-500': $route.name === 'UserList' }">person</span>
          <span class="text-light transition duration-200" v-show="isExpanded">User</span>
        </router-link>
      
        <router-link to="/recipes"
          class="flex items-center space-x-2 py-2 px-4 border-l-4 font-semibold" :class="{
            'font-semibold bg-blue-200 border-blue-500':
              $route.name === 'RecipeList',
            'text-gray-500 hover:bg-gray-200': $route.name !== 'RecipeList',
          }">
          <span class="material-icons text-2xl transition duration-200"
            :class="{ 'text-blue-500': $route.name === 'RecipeList' }">soup_kitchen</span>
          <span class="text-light transition duration-200" v-show="isExpanded">Recipe</span>
        </router-link>

        <router-link to="/reports"
          class="flex items-center space-x-2 py-2 px-4 border-l-4 font-semibold" :class="{
            'font-semibold bg-blue-200 border-blue-500':
              $route.name === 'ReportList',
            'text-gray-500 hover:bg-gray-200': $route.name !== 'ReportList',
          }">
          <span class="material-icons text-2xl transition duration-200"
            :class="{ 'text-blue-500': $route.name === 'ReportList' }">flag_circle</span>
          <span class="text-light transition duration-200" v-show="isExpanded">Report</span>
        </router-link>
      </div>
    </div>
  </aside>
</template>

<script>

import tokenService from '../services/TokenService';

export default {
  name: "Sidebar",
  props: {
    isExpanded: Boolean,
  },
  data() {
    return {
      isFileDropdownOpen: false,
    };
  },
  methods: {
    toggleFileDropdown() {
      this.isFileDropdownOpen = !this.isFileDropdownOpen;
    },
  },
  
  computed:{
    isShowLinkForAdminRole() {
      return true //tokenService.getUser().roles.includes("ROLE_ADMIN");
    }
  }
};
</script>

<style scoped></style>
