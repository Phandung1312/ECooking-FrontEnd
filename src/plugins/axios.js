import axios from "axios";
import tokenService from "../services/TokenService";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/",
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const storedUserData = JSON.parse(window.localStorage.getItem("user"));
    const token = storedUserData ? storedUserData.token : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.headers["Content-Type"] === "multipart/form-data") {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/auth/login" && err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await axiosInstance.post("/auth/refreshtoken", {
            refreshToken: tokenService.getLocalRefreshToken(),
          });
          const { accessToken } = rs.data.data;
          tokenService.updateLocalAccessToken(accessToken);
          return axiosInstance(originalConfig);
        } catch (_error) {
          tokenService.removeUser();
          tokenService.handleExpiredRefreshToken(); //todo: notifications
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
)

export default axiosInstance;