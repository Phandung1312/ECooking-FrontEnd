import router from "../router";

const tokenService = {

  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.refreshToken;
  },

  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.token;
  },

  updateLocalAccessToken(token) {
    let user = JSON.parse(localStorage.getItem("user"));
    user.token = token;
    localStorage.setItem("user", JSON.stringify(user));
  },

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  },

  setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  },

  removeUser() {
    localStorage.removeItem("user");
  },

  handleExpiredRefreshToken(notifyCallback) {
    router.push("/auth/login");
    if (notifyCallback) {
      notifyCallback({
        title: "Fail",
        text: "Hết hạn đăng nhập, vui lòng đăng nhập lại!",
        type: "error",
      });
    }
  }
}

export default tokenService;
