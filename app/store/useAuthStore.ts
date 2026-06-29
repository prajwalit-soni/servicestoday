"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import axios from "axios";

const API_BASE_URL = "https://shoptera-backend.onrender.com";

interface User {
  name: string;
  email: string;
  phone?: string;
  role: string;
}

interface AuthStore {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  role: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<{ success: boolean; role?: string; error?: string }>;
  logout: () => void;
  register: (values: any) => Promise<{ success: boolean; error?: string }>;
  refreshAccessToken: () => Promise<string | null>;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      role: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (username, password) => {
        set({ isLoading: true, error: null }, false, "auth/login_request");
        try {
          const params = new URLSearchParams();
          params.append("grant_type", "password");
          params.append("username", username);
          params.append("password", password);
          params.append("scope", "");
          params.append("client_id", "string");
          params.append("client_secret", "string");

          const response = await axios.post(`${API_BASE_URL}/auth/login`, params, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          });

          const { access_token, refresh_token, role } = response.data;
          
          const userObj: User = {
            name: username,
            email: username.includes("@") ? username : "",
            role: role,
          };

          set({
            user: userObj,
            accessToken: access_token,
            refreshToken: refresh_token,
            role: role,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          }, false, "auth/login_success");

          return { success: true, role };
        } catch (err: any) {
          const msg = err.response?.data?.message || err.response?.data?.detail || "Invalid credentials";
          set({ error: msg, isLoading: false }, false, "auth/login_failure");
          return { success: false, error: msg };
        }
      },

      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          role: null,
          isAuthenticated: false,
          error: null,
        }, false, "auth/logout");
        if (typeof window !== "undefined") {
          window.location.href = "/";
        }
      },

      register: async (values) => {
        set({ isLoading: true, error: null }, false, "auth/register_request");
        try {
          await axios.post(`${API_BASE_URL}/auth/register`, values);
          set({ isLoading: false }, false, "auth/register_success");
          return { success: true };
        } catch (err: any) {
          const msg = err.response?.data?.message || err.response?.data?.detail || "Registration failed";
          set({ error: msg, isLoading: false }, false, "auth/register_failure");
          return { success: false, error: msg };
        }
      },

      refreshAccessToken: async () => {
        const { refreshToken } = get();
        if (!refreshToken) return null;

        try {
          const response = await axios.post(
            `${API_BASE_URL}/auth/refresh?refresh_token=${encodeURIComponent(refreshToken)}`
          );

          const { access_token, refresh_token, role } = response.data;

          set((state) => ({
            accessToken: access_token,
            refreshToken: refresh_token || state.refreshToken,
            role: role || state.role,
            isAuthenticated: true,
          }), false, "auth/refresh_token_success");

          return access_token;
        } catch (err) {
          console.error("Token refresh failed, logging out", err);
          get().logout();
          return null;
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        role: state.role,
        isAuthenticated: state.isAuthenticated,
      }),
      merge: (persistedState: any, currentState) => ({
        ...currentState,
        ...persistedState,
        isLoading: false,
        error: null,
      }),
    }),
    { name: "AuthStore" }
  )
);
