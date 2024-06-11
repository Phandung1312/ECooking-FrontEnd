<template>
  <aside :class="`${isExpanded ? 'w-50 lg:w-72' : 'hidden sm:w-18 sm:block'
    } transition-width duration-200 ease-in-out`" class="flex flex-col text-light min-h-screen">
    <div class="mb-2 p-2 flex justify-center items-center">
      <div class="flex items-center space-x-2">
        <img src="../assets/logo.png" alt="Logo" class="w-10 h-10" />
        <h1 class="text-2xl font-bold hidden md:block" v-show="isExpanded">Analytics</h1>
      </div>
    </div>

    <div>
      <router-link to="/" class="flex items-center space-x-2 py-2 px-4 border-l-4 font-semibold" :class="{
        'font-semibold bg-blue-200 border-blue-500': $route.name === 'Home',
        'text-gray-500 hover:bg-gray-200': $route.name !== 'Home',
      }">
        <span class="material-icons text-2xl transition duration-200"
          :class="{ 'text-blue-500': $route.name === 'Home' }">home</span>
        <span class="text-light transition duration-200" v-show="isExpanded">Dashboard</span>
      </router-link>
      <router-link to="/events" class="flex items-center space-x-2 py-2 px-4 border-l-4 font-semibold" :class="{
        'font-semibold bg-blue-200 border-blue-500':
          $route.name === 'ListEvents',
        'text-gray-500 hover:bg-gray-200': $route.name !== 'ListEvents',
      }">
        <span class="material-icons text-2xl transition duration-200"
          :class="{ 'text-blue-500': $route.name === 'ListEvents' }">local_grocery_store</span>
        <span class="text-light transition duration-200" v-show="isExpanded">Event</span>
      </router-link>
      <router-link to="/customers" class="flex items-center space-x-2 py-2 px-4 border-l-4 font-semibold" :class="{
        'font-semibold bg-blue-200 border-blue-500':
          $route.name === 'ListCustomers',
        'text-gray-500 hover:bg-gray-200': $route.name !== 'ListCustomers',
      }">
        <span class="material-icons text-2xl transition duration-200"
          :class="{ 'text-blue-500': $route.name === 'ListCustomers' }">people</span>
        <span class="text-light transition duration-200" v-show="isExpanded">Customer</span>
      </router-link>
      <div class="relative cursor-pointer">
        <div class="flex items-center space-x-2 py-2 px-4 border-l-4 relative font-semibold" @click="toggleFileDropdown"
          :class="{
            'text-black font-semibold bg-blue-200 border-l-4 border-blue-500':
              $route.path.startsWith('/file'),
            'text-gray-500 hover:bg-gray-200': !$route.path.startsWith('/file'),
          }">
          <span class="material-icons text-2xl transition duration-200"
            :class="{ 'text-blue-500': $route.path.startsWith('/file') }">folder</span>
          <span class="text-light transition duration-200" v-show="isExpanded">File</span>
          <span class="material-icons text-lg" v-show="!isFileDropdownOpen">keyboard_arrow_down</span>
          <span class="material-icons text-lg" v-show="isFileDropdownOpen">keyboard_arrow_up</span>
        </div>
        <div v-show="isFileDropdownOpen">
          <router-link to="/files" class="flex items-center space-x-2 py-2 px-4 border-l-4 font-semibold" :class="{
            'text-blue-500 border-l-4': $route.name === 'ListFiles',
            'text-gray-500 hover:bg-gray-200': $route.name !== 'ListFiles',
          }">
            <span class="material-icons text-2xl transition duration-200"
              :class="{ 'text-blue-500': $route.name === 'ListFiles' }">
              description</span>
            <span class="text-light transition duration-200" v-show="isExpanded">List Files</span>
          </router-link>
          <router-link to="/files/upload" class="flex items-center space-x-2 py-2 px-4 border-l-4 font-semibold" :class="{
            'text-blue-500 border-l-4': $route.name === 'UploadFile',
            'text-gray-500 hover:bg-gray-200': $route.name !== 'UploadFile',
          }">
            <span class="material-icons text-2xl transition duration-200"
              :class="{ 'text-blue-500': $route.path === 'UploadFile' }">
              upload_file
            </span>
            <span class="text-light transition duration-200" v-show="isExpanded">Upload File</span>
          </router-link>
        </div>
        <router-link v-if="isShowLinkForAdminRole" to="/users"
          class="flex items-center space-x-2 py-2 px-4 border-l-4 font-semibold" :class="{
            'font-semibold bg-blue-200 border-blue-500':
              $route.name === 'UserList',
            'text-gray-500 hover:bg-gray-200': $route.name !== 'UserList',
          }">
          <span class="material-icons text-2xl transition duration-200"
            :class="{ 'text-blue-500': $route.name === 'UserList' }">person</span>
          <span class="text-light transition duration-200" v-show="isExpanded">User</span>
        </router-link>
        <router-link to="/users/profile" class="flex items-center space-x-2 py-2 px-4 border-l-4 font-semibold" :class="{
          'font-semibold bg-blue-200 border-blue-500': $route.name === 'UserProfile',
          'text-gray-500 hover:bg-gray-200': $route.name !== 'UserProfile'
        }">
          <span class="material-icons text-2xl transition duration-200"
            :class="{ 'text-blue-500': $route.name === 'UserProfile' }">account_circle</span>
          <span class="text-light transition duration-200" v-show="isExpanded">Profile</span>
        </router-link>
        <router-link to="/products"
          class="flex items-center space-x-2 py-2 px-4 border-l-4 font-semibold" :class="{
            'font-semibold bg-blue-200 border-blue-500':
              $route.name === 'ProductList',
            'text-gray-500 hover:bg-gray-200': $route.name !== 'ProductList',
          }">
          <span class="material-icons text-2xl transition duration-200"
            :class="{ 'text-blue-500': $route.name === 'ProductList' }">inventory_2</span>
          <span class="text-light transition duration-200" v-show="isExpanded">Product</span>
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
      return tokenService.getUser().roles.includes("ROLE_ADMIN");
    }
  }
};
</script>

<style scoped></style>
