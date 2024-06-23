import axios from "../plugins/axios";
import router from "../router";
import validatorService from "./ValidatorService";

const authService = {

    async login(username, password, notifyCallback) {
        try {
            if (this.checkValidAndNotiFy(username, password, notifyCallback)) {
                const response = await axios.post("/auth/login", { username, password });
                if (response.status === 200) {
                    window.localStorage.setItem("user", JSON.stringify(response.data.data));
                    if (notifyCallback) {
                        notifyCallback({
                            title: "Success",
                            text: "Login successfully",
                            type: "success"
                        });
                    }
                    this.nextUserPage();
                    return response.data.data;
                } else if (response.status === 202) {
                    if (notifyCallback) {
                        notifyCallback({
                            title: "Note",
                            text: "Please change your defaul password",
                            type: "warn"
                        });
                    }
                    this.nextChangePassword();
                }
            }
        } catch (error) {
            console.error("Error during login:", error);
            if (error.response) {
                const errorData = error.response.data;
                if (errorData && errorData.messages) {
                    errorData.messages.forEach(message => {
                        notifyCallback({
                            title: "Fail",
                            text: message,
                            type: "error",
                        });
                    });
                }
            } else {
                console.log("Network error or server unreachable");
            }
        }
    },

    checkValidAndNotiFy: function (username, password, notifyCallback) {
        let isValid = true;
        if (!validatorService.isValidUserName(username)) {
            notifyCallback({
                title: "Fail",
                text: "Invalid username fomat, required not blank",
                type: "error",
            });
            isValid = false;
        }

        if (!validatorService.isValidPassword(password)) {
            notifyCallback({
                title: "Fail",
                text: "Invalid password fomat, required in 6 charracters, not blank",
                type: "error",
            });
            isValid = false;
        }
        return isValid;
    },

    async logout(notifyCallback) {
        try {
            // const response = await axios.post("/auth/logout");
            // if (response.status === 200) {
            //     localStorage.removeItem("user");
            //     if (notifyCallback) {
            //         notifyCallback({
            //             title: "Success",
            //             text: "Logout successfully",
            //             type: "success"
            //         });
            //     }
            //     this.nextLoginPage();
            // } else {
            //     console.error("Unexpected status code:", response.status);
            // }
            this.nextLoginPage();
        } catch (error) {
            if (error.response) {
                const errorData = error.response.data;
                if (errorData && errorData.messages) {
                    errorData.messages.forEach(message => {
                        notifyCallback({
                            title: "Fail",
                            text: message,
                            type: "error",
                        });
                    });
                }
            } else {
                console.log("Network error or server unreachable");
            }
        }
    },

    nextUserPage() {
        router.push({ name: "UserList" });
    },

    nextLoginPage() {
        router.push({ name: "UserLogin" });
    },

    nextChangePassword() {
        router.push({ name: "ChangePassword" });
    }
};

export default authService;
