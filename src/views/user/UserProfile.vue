<template>
    <div class="p-4">
        <div class="w-full flex-col">
            <nav class="flex" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li class="inline-flex items-center">
                        <a href="/"
                            class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-500 dark:text-gray-400 dark:hover:text-white">
                            <span class="material-icons text-sm font-bold mr-1">home</span>
                            <span>Home</span>
                        </a>
                    </li>
                    <li aria-current="page">
                        <div class="flex items-center">
                            <span class="material-icons text-sm font-bold text-gray-500">arrow_forward_ios</span>
                            <span
                                class="ms-1 text-sm font-medium text-gray-700 md:ms-2 dark:text-gray-400 dark:hover:text-white">Profile</span>
                        </div>
                    </li>
                </ol>
            </nav>
            <div class="mt-5 mb-2 p-5 flex-col lg:flex">
                <div class="flex flex-col lg:flex-row gap-5">
                    <div class="w-full lg:w-1/3">
                        <div class="flex justify-center border-2 rounded-lg bg-white p-5 h-full">
                            <div class="text-center flex flex-col items-center">
                                <div class="mb-5">
                                    <span class="text-xl lg:text-3xl italic">Wellcome</span>
                                </div>
                                <div class="mb-6">
                                    <div v-if="isLoading" class="animate-pulse">
                                        <div
                                            class="bg-gray-400 h-[200px] md:h-[300px] lg:min-h-56 w-[200px] md:w-[300px] lg:min-w-56 rounded-full">
                                        </div>
                                    </div>
                                    <img v-else class="rounded-full w-[200px] md:w-[250px] lg:min-w-48 border border-blue-500"
                                        :src="user.avatarUrl || emptyImage" alt="..." />
                                </div>
                                <div>
                                    <form>
                                        <input type="file" name="file" ref="fileInput" hidden accept="image/*"
                                            @change="uploadFile" />
                                        <button type="button" @click="openFileInput"
                                            class="btn text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Change
                                            avatar
                                        </button>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full lg:w-2/3 border-2 rounded-lg bg-white">
                        <div class="p-5">
                            <div class="flex items-center">
                                <span class="material-icons">info_outline</span>
                                <span class="text-md font-normal lg:text-xl lg:font-medium">Basic infomation</span>
                            </div>
                            <hr class="border-t-4 border-gray-900 my-4">
                            <div class="pl-3 lg:pl-10">
                                <div class="mb-4">
                                    <label for="username"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                        username</label>
                                    <input type="text" id="username" v-model="user.username"
                                        class="read-only bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Username">
                                </div>
                                <div class="mb-4">
                                    <label for="firstName"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                        first name</label>
                                    <input type="text" id="firstName" v-model="user.firstName"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="First name">
                                    <span v-if="basicInfoErrors.firstName" class="text-red-500 text-sm">{{
                                        basicInfoErrors.firstName }}</span>
                                </div>
                                <div class="mb-4">
                                    <label for="lastName"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                        last
                                        name</label>
                                    <input type="text" id="lastName" v-model="user.lastName"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Last name">
                                    <span v-if="basicInfoErrors.lastName" class="text-red-500 text-sm">{{
                                        basicInfoErrors.lastName }}</span>
                                </div>
                                <div class="mb-4">
                                    <label for="dateOfBirth"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your date of
                                        birth</label>
                                    <input type="date" name="date" id="dateOfBirth" v-model="user.dateOfBirth"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="mm/dd/yyyy">
                                    <span v-if="basicInfoErrors.dateOfBirth" class="text-red-500 text-sm">{{
                                        basicInfoErrors.dateOfBirth }}</span>
                                </div>
                                <div class="flex mb-4 justify-end">
                                    <button type="button" @click="changeBasicInfo"
                                        class="btn text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Save
                                        change
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mb-2 px-5 pb-5  flex-col lg:flex">
                <div class="flex flex-col lg:flex-row gap-5">
                    <div class="w-full lg:w-1/3 border-2 rounded-lg bg-white">
                        <div class="p-5">
                            <div class="flex items-center">
                                <span class="material-icons">
                                    contact_support
                                </span>
                                <span class="text-xl font-medium">Contact infomation</span>
                            </div>
                            <hr class="border-t-4 border-gray-900 my-4">
                            <div class="pl-10">
                                <div class="mb-4">
                                    <div class="flex items-center mb-2">
                                        <span class="material-icons">
                                            mail_outline
                                        </span>
                                        <label for="email"
                                            class="block text-sm font-medium text-gray-900 dark:text-white">Your
                                            email</label>
                                    </div>
                                    <input type="text" name="email" id="email" v-model="user.email"
                                        class="read-only bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Email">
                                </div>
                                <div class="mb-4">
                                    <div class="flex items-center">
                                        <span class="material-icons">
                                            phone
                                        </span>
                                        <label for="phoneNumber"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone
                                            number</label>
                                    </div>
                                    <input type="text" id="phoneNumber" v-model="user.phoneNumber"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Phone number">
                                    <span v-if="contactInfoErrors.phoneNumber" class="text-red-500 text-sm">{{
                                        contactInfoErrors.phoneNumber }}</span>
                                </div>
                                <div class="flex mb-4 justify-end">
                                    <button type="button" @click="changeContactInfo"
                                        class="btn text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Save
                                        change
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full lg:w-2/3 border-2 rounded-lg bg-white">
                        <div class="p-5">
                            <div class="flex items-center">
                                <span class="material-icons">
                                    settings_suggest
                                </span>
                                <span class="text-xl font-medium">Change password</span>
                            </div>

                            <hr class="border-t-4 border-gray-900 my-4">
                            <div class="pl-10">
                                <div class="mb-4">
                                    <label for="oldPassword"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                        current password</label>
                                    <input type="password" id="oldPassword" v-model="changePasswordRequest.oldPassword"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="••••••••">
                                    <span v-if="changePasswordErrors.oldPassword" class="text-red-500 text-sm">{{
                                        changePasswordErrors.oldPassword }}</span>
                                </div>
                                <div class="mb-4">
                                    <label for="newPassword"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                        new password</label>
                                    <input type="password" id="newPassword" v-model="changePasswordRequest.newPassword"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="••••••••">
                                    <span v-if="changePasswordErrors.newPassword" class="text-red-500 text-sm">{{
                                        changePasswordErrors.newPassword }}</span>
                                </div>
                                <div class="mb-4">
                                    <label for="confirmPassword"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                        confirm password
                                    </label>
                                    <input type="password" id="confirmPassword"
                                        v-model="changePasswordRequest.confirmPassword"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="••••••••">
                                    <span v-if="changePasswordErrors.confirmPassword" class="text-red-500 text-sm">{{
                                        changePasswordErrors.confirmPassword }}</span>
                                    <span v-if="changePasswordErrors.error" class="text-red-500 text-sm">{{
                                        changePasswordErrors.error }}</span>
                                </div>
                                <div class="flex mb-4 justify-end">
                                    <button type="button" @click="changePassword"
                                        class="btn text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Change
                                        password
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import tokenService from "../../services/TokenService";
import userService from "../../services/UserService";
import utils from "../../services/Utils"

export default {
    name: "UserProfile",
    components: {},
    data() {
        return {
            user: { avatarUrl: "" },
            savedUser: {},
            basicInfoErrors: {},
            contactInfoErrors: {},
            changePasswordErrors: {},
            changePasswordRequest: { oldPassword: "", newPassword: "", confirmPassword: "" },
            emptyImage: "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
            isLoading: false
        };
    },
    setup() {

    },
    beforeCreate() { },
    created() { },
    beforeMount() { },
    mounted() {
        this.getUserById();
    },
    methods: {

        getUserById() {
            this.id = tokenService.getUser().id;
            userService.getUserById(this.id, this.notify)
                .then(response => {
                    this.user = response.data;
                    this.savedUser = response.data;
                    this.user.dateOfBirth = utils.formatTimestampToDateString(this.user.dateOfBirth);
                    this.savedUser.dateOfBirth = utils.formatTimestampToDateString(this.user.dateOfBirth);
                    this.user.firstRole = this.user.roles[0];
                }).catch(e => {
                    console.log(e);
                })
        },

        changeBasicInfo() {
            const basicInfoRequest = {
                id: this.id,
                firstName: this.user.firstName,
                lastName: this.user.lastName,
                dateOfBirth: this.user.dateOfBirth,
                phoneNumber: this.savedUser.phoneNumber,
            }
            this.basicInfoErrors = userService.isValidAndNotifyUpdateUserRequest(basicInfoRequest);
            if (!Object.keys(this.basicInfoErrors).length) {
                userService.updateUser(basicInfoRequest, this.notify).then(response => {
                    if (response.status === "ok") {
                        this.savedUser = response.data;
                        this.savedUser.dateOfBirth = utils.formatTimestampToDateString(response.data.dateOfBirth);
                        this.$store.commit('updateUserProfile', this.savedUser);
                    }
                }).catch(e => {
                    console.log(e);
                })
            }
        },

        changeContactInfo() {
            const contactInfoRequest = {
                id: this.id,
                firstName: this.savedUser.firstName,
                lastName: this.savedUser.lastName,
                dateOfBirth: this.savedUser.dateOfBirth,
                phoneNumber: this.user.phoneNumber,
            }
            this.contactInfoErrors = userService.isValidAndNotifyUpdateUserRequest(contactInfoRequest);
            if (!Object.keys(this.contactInfoErrors).length) {
                userService.updateUser(contactInfoRequest, this.notify).then(response => {
                    if (response.status === "ok") {
                        this.savedUser = response.data;
                        this.savedUser.dateOfBirth = utils.formatTimestampToDateString(response.data.dateOfBirth);
                    }
                }).catch(e => {
                    console.log(e);
                })
            }
        },

        changePassword() {
            const { oldPassword, newPassword, confirmPassword } = this.changePasswordRequest;
            const request = { username: this.savedUser.username, oldPassword, newPassword, confirmPassword };
            this.changePasswordErrors = userService.isValidChangePasswordRequest(request);
            if (!Object.keys(this.changePasswordErrors).length) {
                userService.changePassword(this.id, request, this.notify).then(response => {
                    if (response.status === "ok") {
                        this.resetChangePasswordForm();
                    }
                }).catch(e => {
                    console.log(e);
                })
            }
        },

        resetChangePasswordForm() {
            this.changePasswordRequest = {};
        },

        openFileInput() {
            this.$refs.fileInput.click();
        },

        uploadFile(event) {
            const file = event.target.files[0];
            if (!file) return;
            const formData = new FormData();
            formData.append("avatarFile", file);

            this.isLoading = true;
            userService.uploadAvatar(this.id, formData, this.notify).then(response => {
                if (response.status === "ok") {
                    this.user.avatarUrl = response.data;
                    this.isLoading = false;
                    this.$store.commit('updateUserProfile', this.user);
                }
            }).catch(e => {
                console.log(e);
                this.isLoading = false;
            })
        },

        notify({ title, text, type }) {
            this.$notify({
                title,
                text,
                type,
            });
        }
    }
};
</script>
<style scoped></style>
