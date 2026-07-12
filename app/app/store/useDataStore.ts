"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axiosClient from "../lib/api";
import { UserRecord } from "../lib/mockData";

type DataStore = {
  users: UserRecord[];
  loading: boolean;
  error: string | null;
  setUsers: (users: UserRecord[]) => void;
  fetchUsers: () => Promise<void>;
};

const useDataStore = create<DataStore>()(
  devtools(
    (set) => ({
      users: [],
      loading: false,
      error: null,
      setUsers: (users) => set({ users, error: null }),
      fetchUsers: async () => {
        set({ loading: true, error: null });
        try {
          const response = await axiosClient.get<UserRecord[]>("/api/users");
          set({ users: response.data, loading: false });
        } catch (err: unknown) {
          const errorMessage = err instanceof Error ? err.message : "Failed to fetch users";
          set({ error: errorMessage, loading: false });
        }
      },
    }),
    { name: "DataStore" }
  )
);

export default useDataStore;
