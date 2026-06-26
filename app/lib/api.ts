import axios, { AxiosHeaders, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { mockUsers } from "./mockData";
import { useAuthStore } from "../store/useAuthStore";

const axiosClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://shoptera-backend.onrender.com",
  timeout: 60000,
});

axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config.url === "/api/users" && config.method === "get") {
    config.adapter = async (cfg: InternalAxiosRequestConfig): Promise<AxiosResponse> => {
      return {
        data: mockUsers,
        status: 200,
        statusText: "OK",
        headers: {},
        config: cfg,
      };
    };
  }

  // Inject real auth token if available, otherwise fallback to dummy token or empty
  const token = useAuthStore.getState().accessToken;
  const authHeaderValue = token ? `Bearer ${token}` : "Bearer dummy-token";

  const headersFromConfig = (config.headers as AxiosHeaders | Record<string, unknown> | undefined);
  if (headersFromConfig && typeof (headersFromConfig as AxiosHeaders).set === "function") {
    (headersFromConfig as AxiosHeaders).set("Authorization", authHeaderValue);
    config.headers = headersFromConfig as AxiosHeaders;
  } else {
    const existingHeaders = (headersFromConfig as AxiosHeaders)?.toJSON?.() ?? (headersFromConfig as Record<string, unknown>) ?? {};
    config.headers = new AxiosHeaders({
      ...existingHeaders,
      Authorization: authHeaderValue,
    });
  }

  return config;
});

// Response interceptor to handle token refresh on 401 error
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error status is 401 and we haven't already retried this request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await useAuthStore.getState().refreshAccessToken();
        if (newAccessToken) {
          // Update the original request's authorization header and retry
          if (originalRequest.headers && typeof (originalRequest.headers as AxiosHeaders).set === "function") {
            (originalRequest.headers as AxiosHeaders).set("Authorization", `Bearer ${newAccessToken}`);
          } else {
            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${newAccessToken}`,
            };
          }
          return axiosClient(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed in interceptor:", refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;

