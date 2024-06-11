<template>
  <div v-if="show"
    class="mx-auto z-[100] flex justify-center absolute inset-0 items-center bg-gray-700 bg-opacity-50 overflow-y-scroll">
    <div class="w-[85%] md:w-[80%] lg:w-2/3 xl:w-1/3 p-6 mx-4 bg-white rounded-md shadow-xl">
      <div class="flex items-center justify-between pb-3">
        <div class="flex">
          <span class="material-icons text-4xl transition duration-200 text-blue-500">person</span>
          <h3 class="text-2xl  text-blue-600">
            {{ title }}
          </h3>
        </div>

        <svg @click="closeModal" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-red-600 cursor-pointer icon"
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>

      </div>
      <hr class="mb-3">
      <form class="flex-col">
        <div class="flex justify-between gap-5">
          <div class="mb-5 w-1/2 ">
            <label for="small-input" class="block mb-2 text-sm font-medium  text-blue-600  dark:text-white">First
              name<span class="text-red-500">*</span></label>
            <input type="text" id="small-input" v-model="user.firstName"
              class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <span v-if="errors.firstName" class="text-red-500 text-sm">{{ errors.firstName }}</span>
          </div>

          <div class="mb-5 w-1/2">
            <label for="small-input" class="block mb-2 text-sm font-medium  text-blue-600 dark:text-white">Last
              name<span class="text-red-500">*</span></label>
            <input type="text" id="small-input" v-model="user.lastName"
              class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <span v-if="errors.lastName" class="text-red-500 text-sm">{{ errors.lastName }}</span>
          </div>
        </div>

        <div class="flex justify-between gap-5">
          <div class="mb-5 w-1/2">
            <label for="small-input" class="block mb-2 text-sm font-medium  text-blue-600 dark:text-white">Email<span
                class="text-red-500">*</span></label>
            <input type="text" id="small-input" v-model="user.email" v-bind:class="{ 'read-only': uid != null }"
              class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
          </div>
          <div class="mb-5 w-1/2">
            <label for="small-input" class="block mb-2 text-sm font-medium  text-blue-600 dark:text-white">Username<span
                class="text-red-500">*</span></label>
            <input type="text" id="small-input" v-model="user.username" v-bind:class="{ 'read-only': uid != null }"
              class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <span v-if="errors.username" class="text-red-500 text-sm">{{ errors.username }}</span>
          </div>
        </div>

        <div class="mb-5">
          <label for="small-input" class="block mb-2 text-sm font-medium text-blue-600 dark:text-white">Phone
            number<span class="text-red-500">*</span></label>
          <input type="text" id="small-input" v-model="user.phoneNumber"
            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <span v-if="errors.phoneNumber" class="text-red-500 text-sm">{{ errors.phoneNumber }}</span>
        </div>
        <div class="mb-5">
          <label for="small-input" class="block mb-2 text-sm font-medium  text-blue-600 dark:text-white">Date of
            Birth<span class="text-red-500">*</span></label>
          <input type="date" id="small-input" v-model="user.dateOfBirth"
            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <span v-if="errors.dateOfBirth" class="text-red-500 text-sm">{{ errors.dateOfBirth }}</span>
        </div>

        <div class="flex justify-between gap-5" v-if="uid != null">
          <div class="mb-5 w-1/2">
            <label for="roleSelect" class="block mb-2 text-sm font-medium  text-blue-600 dark:text-white">Role</label>
            <select id="roleSelect" v-model="user.firstRole" v-bind:class="{ 'read-only': uid != null }"
              class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option v-for="option in roleOptions" :value="option.key">{{ option.value }}</option>
            </select>
          </div>

          <div class="mb-5 w-1/2">
            <label for="small-input"
              class="block mb-2 text-sm font-medium  text-blue-600 dark:text-white">Active</label>
            <select id="small-input" v-model="user.active" v-bind:class="{ 'read-only': uid != null }"
              class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="true" class=" text-green-700 text-sm">
                Active
              </option>
              <option value="false" class=" text-red-700 text-sm">
                Block
              </option>
            </select>
          </div>
        </div>
      </form>
      <div class="flex">
        <button @click="handleResetPassword"
          class="p-2 px-3 lg:px-6 text-xs lg:text-sm my-3 mr-3 btn text-green-500 border border-green-500 hover:bg-green-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-md p-1 text-center inline-flex items-center me-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:focus:ring-green-800 dark:hover:bg-green-500"
          v-if="uid != null">
          Reset password
        </button>
        <button @click="handleBlock()" v-if="user.active && uid != null"
          class="p-2 px-3 lg:px-6  my-3 mr-3 btn text-red-500 border border-red-500 hover:bg-red-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md p-1 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500">
          Block
        </button>
        <button @click="handleUnBlock()" v-if="!user.active && uid != null"
          class="p-2 px-3 lg:px-6 my-3 mr-3 btn text-green-500 border border-green-500 hover:bg-green-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-md p-1 text-center inline-flex items-center me-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:focus:ring-green-800 dark:hover:bg-green-500">
          Active
        </button>
        <button @click="handleSave()" class="p-2 px-3 lg:px-6 my-3 mr-3 text-blue-100 bg-blue-600 rounded btn">
          Save
        </button>
      </div>
      <span v-if="isSuccess"
        class="md:px-2 lg:px-6 p-1 lg:p-2 my-3 mr-3 text-green-600 text-md font-medium text-center">Success!</span>
    </div>
  </div>
</template>

<script>

import userService from '../../services/UserService';
import utils from '../../services/Utils';

export default {
  data() {
    return {
      uid: null,
      show: false,
      title: "",
      user: {
        id: null,
        username: null,
        email: null,
        firstName: null,
        lastName: null,
        phoneNumber: null,
        dateOfBirth: null,
        active: null,
        roles: [],
        createAt: null,
        createBy: null,
        updateAt: null,
        updateBy: null,
        validFlag: null,
        firstRole: null
      },
      roleOptions: [
        {
          key: "ROLE_USER",
          value: "USER"
        }, {
          key: "ROLE_ADMIN",
          value: "ADMIN"
        }],
      isAdd: true,
      errors: {},
      isSuccess: false
    }
  },

  methods: {
    closeModal() {
      this.$emit('close');
      this.show = false;
      this.uid = null;
      this.user = {};
      this.errors = {};
      this.isSuccess = false;
    },

    updateData(id) {
      this.show = true
      if (!id) {
        this.title = "New User";
      } else {
        this.title = "Update User";
        this.uid = id
        this.getUserById();
      }
    },

    getUserById() {
      userService.getUserById(this.uid, this.notify)
        .then(response => {
          this.user = response.data;
          this.user.dateOfBirth = utils.formatTimestampToDateString(this.user.dateOfBirth);
          this.user.firstRole = this.user.roles[0];
        }).catch(e => {
          console.log(e);
        })
    },

    createUser(newUser) {
      this.errors = userService.isValidAndNotifyNewUserRequest(newUser);
      if (!Object.keys(this.errors).length) {
        userService.createUser(newUser, this.notify)
          .then(response => {
            if (response.status === "ok") {
              this.showSuccessMessage();
              this.reloadUserList();
            }
          }).catch(e => {
            console.log(e);
          })
      }
    },

    updateUser(updateUser) {
      this.errors = userService.isValidAndNotifyUpdateUserRequest(updateUser);
      if (!Object.keys(this.errors).length) {
        userService.updateUser(updateUser, this.notify).then(response => {
          if (response.status === "ok") {
            this.showSuccessMessage();
            this.reloadUserList();
          }
        }).catch(e => {
          console.log(e);
        })
      }
    },

    handleSave() {
      if (!this.uid) {     // add a new user
        let newUser = {
          username: this.user.username,
          email: this.user.email,
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          dateOfBirth: this.user.dateOfBirth,
          phoneNumber: this.user.phoneNumber,
        }
        this.createUser(newUser);
      } else {
        let updateUser = {
          id: this.user.id,
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          dateOfBirth: this.user.dateOfBirth,
          phoneNumber: this.user.phoneNumber,
        }
        this.updateUser(updateUser);
      }
    },

    handleBlock() {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "Delete user: " + this.user.lastName + this.user.firstName,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
        })
        .then((result) => {
          if (result.isConfirmed)
            userService.blockUser(this.uid, this.notify).then(response => {
              if (response.status === "ok") {
                this.user.active = false;
                this.showSuccessMessage();
                this.reloadUserList();
              }
            }).catch(e => {
              console.log(e);
            })
        });
    },

    handleUnBlock() {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "Unblock user: " + this.user.lastName + this.user.firstName,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Unblock it!",
          cancelButtonText: "No, cancel!",
        })
        .then((result) => {
          if (result.isConfirmed)
            userService.unBlockUser(this.uid, this.notify).then(response => {
              if (response.status === "ok") {
                this.user.active = true;
                this.showSuccessMessage();
                this.reloadUserList();
              }
            }).catch(e => {
              console.log(e);
            })
        });
    },

    handleResetPassword() {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "Reset password of user: " + this.user.lastName + this.user.firstName,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Reset it!",
          cancelButtonText: "No, cancel!",
        })
        .then((result) => {
          if (result.isConfirmed)
            userService.resetPassword(this.uid, this.notify).then(response => {
              if (response.status === "ok") {
                this.showSuccessMessage();
                this.$swal
                  .fire({
                    title: "Password default",
                    text: "Password default user: " + this.user.lastName + this.user.firstName + ": '" + response.data + "'",
                    icon: "success",
                  })
              }
            }).catch(e => {
              console.log(e);
            })
        });
    },

    reloadUserList() {
      this.$emit('reload');
    },

    notify({ title, text, type }) {
      this.$notify({
        title,
        text,
        type,
      });
    },

    showSuccessMessage() {
      this.isSuccess = true;
      setTimeout(() => {
        this.isSuccess = false;
      }, 5000);
    }
  },
};
</script>

<style>
.read-only {
  pointer-events: none;
  user-select: none;
  opacity: 0.7;
  cursor: not-allowed;
}

.icon {
  transform: scale(1);
  transition: transform 0.3s ease;
}

.icon:hover {
  transform: scale(1.15);
}
</style>
