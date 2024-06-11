import axios from "../plugins/axios";
import validator from "./ValidatorService";


const userService = {

    //request api
    async getUserList(filterParams) {
        try {
            const params = new URLSearchParams();
            params.append('keyword', filterParams.keyword);
            params.append('searchField', filterParams.searchField);
            params.append('isActive', filterParams.active === 'all' ? '' : filterParams.active);
            params.append('sortType', filterParams.sortType);
            params.append('sortField', filterParams.sortField);
            params.append('page', filterParams.page);
            params.append('size', filterParams.size);
            const urlWithParams = `users/search?${params.toString()}`;
            const response = await axios.get(urlWithParams);
            return response.data;
        } catch (error) {
            this.handleError(error);
            throw new Error();
        }
    },

    async getUserById(id, notifyCallback) {
        try {
            const url = `users/${id}`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            if (error.response) {
                this.handleError(error, notifyCallback)
                throw new Error();
            }
        }
    },

    async updateUser(updateUser, notifyCallback) {
        try {
            if (!this.isValidAndNotifyUpdateUserRequest(updateUser, notifyCallback))
                return
            const url = `users/${updateUser.id}`;
            const response = await axios.put(url, updateUser);
            if (response.status === 200) {
                notifyCallback({
                    title: "Success",
                    text: "Update user success",
                    type: "success"
                });

            }
            return response.data;
        } catch (error) {
            this.handleError(error, notifyCallback);
            throw new Error();
        }
    },

    async createUser(newUser, notifyCallback) {
        try {
            if (!this.isValidAndNotifyNewUserRequest(newUser, notifyCallback))
                return
            const url = `users`;
            const response = await axios.post(url, newUser);
            if (response.status === 200) {
                notifyCallback({
                    title: "Success",
                    text: "Created new user",
                    type: "success",
                });
            }
            return response.data;
        } catch (error) {
            this.handleError(error, notifyCallback);
            throw new Error();
        }
    },

    async blockUser(id, notifyCallback) {
        try {
            const url = `users/${id}`;
            const response = await axios.delete(url);
            if (response.status === 200) {
                notifyCallback({
                    title: "Success",
                    text: "Block user success",
                    type: "success",
                });
            }
            return response.data;
        } catch (error) {
            this.handleError(error, notifyCallback);
            throw new Error();
        }
    },

    async unBlockUser(id, notifyCallback) {
        try {
            const url = `users/unblock/${id}`;
            const response = await axios.patch(url);
            if (response.status === 200) {
                notifyCallback({
                    title: "Success",
                    text: "Unblock user success",
                    type: "success"
                });
            }
            return response.data;
        } catch (error) {
            this.handleError(error, notifyCallback);
            throw new Error();
        }
    },

    async changePasswordFirstLogin(changePasswordReq, notifyCallback) {
        try {
            const url = `users/change-password-first-login`;
            const response = await axios.patch(url, changePasswordReq);
            if (response.status === 200) {
                notifyCallback({
                    title: "Success",
                    text: "Change password success",
                    type: "success"
                });
            }
            return response.data;
        } catch (error) {
            this.handleError(error, notifyCallback);
            throw new Error();
        }
    },

    async resetPassword(id, notifyCallback) {
        try {
            const url = `users/reset-password/${id}`;
            const response = await axios.put(url);
            if (response.status === 200) {
                notifyCallback({
                    title: "Success",
                    text: "Reset password success",
                    type: "success",
                });
            }
            return response.data;
        } catch (error) {
            this.handleError(error, notifyCallback);
            throw new Error();
        }
    },

    async changePassword(id, changePasswordReq, notifyCallback) {
        try {
            const url = `users/change-password`;
            const response = await axios.patch(url, changePasswordReq);
            if (response.status === 200) {
                notifyCallback({
                    title: "Success",
                    text: "Change password success",
                    type: "success"
                });
            }
            return response.data;
        } catch (error) {
            this.handleError(error, notifyCallback);
            throw new Error();
        }
    },

    async uploadAvatar(id, formData, notifyCallback) {
        try {
            const url = `users/${id}/avatar`;
            const response = await axios.patch(url, formData);
            if (response.status === 200) {
                notifyCallback({
                    title: "Success",
                    text: "Change avatar success",
                    type: "success"
                });
            }
            return response.data;
        } catch (error) {
            this.handleError(error, notifyCallback);
            throw new Error();
        }
    },

    //  validate data
    isValidAndNotifyNewUserRequest(newUser, notifyCallback) {
        const errors = {};
        if (!validator.isNonBlank(newUser.firstName)) {
            errors.firstName = 'First name can not blank.';
        }

        if (!validator.isNonBlank(newUser.lastName)) {
            errors.lastName = 'Last name can not blank.';
        }

        if (!validator.isValidDateFormat(newUser.dateOfBirth)) {
            errors.dateOfBirth = 'Required not blank, date of birth must be past.';
        } else if (!validator.isValidDateOfBirthPast(newUser.dateOfBirth)) {
            errors.dateOfBirth = 'Required not blank, date of birth must be past.';
        }

        if (!validator.isValidPhoneNumber(newUser.phoneNumber)) {
            errors.phoneNumber = 'Required not blank, number: 0-9 , 10 charactes.';
        }

        if (!validator.isValidUserName(newUser.username)) {
            errors.username = 'Username not be blank.';
        }

        if (!validator.isValidEmail(newUser.email)) {

            errors.email = 'Email not be blank.';
        }
        return errors;
    },

    isValidAndNotifyUpdateUserRequest(updateUser) {
        const errors = {};
        if (!validator.isNonBlank(updateUser.firstName)) {
            errors.firstName = 'First name can not blank.';
        }

        if (!validator.isNonBlank(updateUser.lastName)) {
            errors.lastName = 'Last name can not blank.';
        }

        if (!validator.isValidDateFormat(updateUser.dateOfBirth)) {
            errors.dateOfBirth = 'Required not blank, date of birth must be past.';
        } else if (!validator.isValidDateOfBirthPast(updateUser.dateOfBirth)) {
            errors.dateOfBirth = 'Required not blank, date of birth must be past.';
        }

        if (!validator.isValidPhoneNumber(updateUser.phoneNumber)) {
            errors.phoneNumber = 'Required not blank, number: 0-9 , 10 charactes.';
        }
        return errors;
    },

    isValidChangePasswordRequest(changePasswordReq) {
        const errors = {};
        if (!validator.isValidUserName(changePasswordReq.username)) {
            errors.username = 'Username not be blank.';
        }

        if (!validator.isValidPassword(changePasswordReq.oldPassword)) {
            errors.oldPassword = 'Password not be blank, required min 6 characters.';
        }

        if (!validator.isValidPassword(changePasswordReq.newPassword)) {
            errors.newPassword = 'Password not be blank, required min 6 characters.';
        }

        if (!validator.isValidPassword(changePasswordReq.confirmPassword)) {
            errors.confirmPassword = 'Password not be blank, required min 6 characters.';
        }

        if (changePasswordReq.newPassword.trim() !== changePasswordReq.confirmPassword.trim()) {
            errors.error = 'Passwords do not match';
        }
        return errors;
    },

    //handle server error response
    handleError(error, notifyCallback) {
        if (error.response) {
            const errorData = error.response.data;
            if (errorData && errorData.messages) {
                errorData.messages.forEach(message => {
                    if (notifyCallback)
                        notifyCallback({
                            title: "Fail",
                            text: message,
                            type: "error"
                        });
                });
            }
        } else if (error.request) {
            console.error('Request Error:', error.request);
        } else {
            console.error('Error:', error.message);
        }
    }
};

export default userService;
