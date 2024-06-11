<template>
    <div>
        <section class="bg-gray-50 dark:bg-gray-900">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img class="w-8 h-8 mr-2" src="../../assets/logo.png" alt="logo">
                    Analytics
                </a>
                <div
                    class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                    <h2
                        class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Change Password
                    </h2>
                    <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" @submit.prevent="changePasswordFirstLogin">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                username</label>
                            <input type="text" name="email" id="email" v-model="username"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="username">
                            <span v-if="errors.username" class="text-red-500 text-sm">{{ errors.username }}</span>
                        </div>
                        <div>
                            <label for="old-password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current
                                Password</label>
                            <input type="password" name="password" id="old-password" placeholder="••••••••"
                                v-model="oldPassword"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <span v-if="errors.oldPassword" class="text-red-500 text-sm">{{ errors.oldPassword }}</span>
                        </div>
                        <div>
                            <label for="new-password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                            <input type="password" name="new-password" id="new-password" placeholder="••••••••"
                                v-model="newPassword"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <span v-if="errors.newPassword" class="text-red-500 text-sm">{{ errors.newPassword }}</span>
                        </div>
                        <div>
                            <label for="confirm-password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
                                password</label>
                            <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••"
                                v-model="confirmPassword"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <span v-if="errors.confirmPassword" class="text-red-500 text-sm">{{
                                errors.confirmPassword }}</span>
                            <span v-if="errors.error" class="text-red-500 text-sm">{{ errors.error }}</span>
                        </div>
                        <div class="flex items-start">
                            <div class="text-sm">
                                <label class="font-normal text-gray-500 dark:text-gray-300">Change your
                                    default password and
                                    <a class="text-blue-600 hover:font-bold" href="/auth/login"> relogin!</a> </label>
                            </div>
                        </div>
                        <button type="submit"
                            class="btn w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Reset
                            passwod</button>
                    </form>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import userService from '../../services/UserService';
import authService from '../../services/AuthService';

export default {
    data() {
        return {
            username: "",
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
            errors: {}
        }
    },

    methods: {
        changePasswordFirstLogin() {
            const dataValid = {
                username: this.username,
                oldPassword: this.oldPassword,
                newPassword: this.newPassword,
                confirmPassword: this.confirmPassword
            };
            const changePasswordReq = {
                username: this.username,
                oldPassword: this.oldPassword,
                newPassword: this.newPassword
            };

            this.errors = userService.isValidChangePasswordRequest(dataValid);
            if (!Object.keys(this.errors).length) {
                userService.changePasswordFirstLogin(changePasswordReq, this.notify).then(response => {
                    if (response.status === "ok") {
                        authService.nextLoginPage();
                    }
                }).catch(e => {
                    console.log(e);
                })
            }
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
<style scoped></style>
