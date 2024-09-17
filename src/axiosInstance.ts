import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:8000/",
});

// Add request interceptor to include access token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    if (response && response.status === 401 && !config.__isRetryRequest) {
      config.__isRetryRequest = true;

      try {
        // Get refresh token from local storage
        const refreshToken = localStorage.getItem("refreshToken");
        const refreshResponse = await axiosInstance.post("/refresh", {
          refreshToken,
        });
        const { access_token, refresh_token } = refreshResponse.data;
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("refreshToken", refresh_token);

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;
        return axiosInstance(config);
      } catch (refreshError) {
        console.error("Refresh token error:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
