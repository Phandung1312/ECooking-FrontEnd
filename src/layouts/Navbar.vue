<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="flex flex-wrap items-center justify-between p-4">
      <button class="menu-toggle" @click="toggleMenu">
        <span class="material-icons">menu</span>
      </button>
      <div class="flex items-center justify-center">
        <div class="relative mx-2">
          <button class="notification-toggle flex items-center" @click="toggleNotification">
            <span class="material-icons">notifications</span>
          </button>
          <div v-show="isNotificationOpen"
            class="absolute top-full right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-md"></div>
        </div>
        <div class="ml-4 cursor-pointer relative mx-2">
          <img :src="getUserAvatar" alt="Avatar" class="w-8 h-8 rounded-full" @click="toggleUserMenu" />
          <div class="absolute top-full right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-md z-10"
            v-show="isUserMenuOpen">
            <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <div>{{ getUserFirstName }}</div>
              <div class="font-medium truncate">{{ getEmail }}</div>
            </div>
            <div class="border-t border-gray-100">
              <a href="/users/profile"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</a>
            </div>
            <div class="py-1">
              <a href="#" @click="logout"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign
                out</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import authService from "../services/AuthService";
import userService from "../services/UserService";
import tokenService from "../services/TokenService";

export default {
  name: "Navbar",
  props: {
    isExpanded: Boolean,
  },
  data() {
    return {
      isNotificationOpen: false,
      isUserMenuOpen: false,
      defaultAvatarUrl: "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
    };
  },

  mounted() {
    this.getCurrentUser();
  },

  computed: {
    getUserAvatar() {
      console.log(1);
      console.log(this.$store.state.user.avatarUrl);
      return this.$store.state.user.avatarUrl || this.defaultAvatarUrl ;
    },

    getUserFirstName() {
      return this.$store.state.user.firstName;
    },

    getEmail() {
      return this.$store.state.user.email;
    },
  },

  methods: {
    toggleMenu() {
      this.$emit("toggleMenu");
    },

    toggleNotification() {
      this.isNotificationOpen = !this.isNotificationOpen;
    },

    toggleUserMenu() {
      this.isUserMenuOpen = !this.isUserMenuOpen;
    },

    logout() {
      authService.logout(this.notify);
    },

    getCurrentUser() {
      const id = tokenService.getUser().id
      userService.getUserById(id, this.notify)
        .then(response => {
          this.$store.commit('updateUserProfile', response.data);
        }).catch(e => {
          console.log(e);
        })
    },

    notify({ title, text, type }) {
      this.$notify({
        title,
        text,
        type,
      });
    },
  },
};
</script>

<style></style>
