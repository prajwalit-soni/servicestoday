import axiosClient from "../api";

export interface ApiWard {
  id: number;
  city_ward_name: string;
  city_id: number;
  district_id: number;
  state_id: number;
  status: string;
  district_name?: string;
  state_name?: string;
}

export const WardService = {
  async getAll(params?: { city_id?: number; limit?: number }): Promise<ApiWard[]> {
    const response = await axiosClient.get("/api/city-wards", {
      params: {
        page: 1,
        limit: params?.limit || 10000,
        ...params,
      },
    });
    return response.data;
  },

  async getById(id: number): Promise<ApiWard> {
    const response = await axiosClient.get(`/api/city-wards/${id}`);
    return response.data;
  },

  async create(data: {
    state_id: number;
    district_id: number;
    city_id: number;
    city_ward_name: string;
    status: string;
  }): Promise<ApiWard> {
    const response = await axiosClient.post("/api/city-wards", data);
    return response.data;
  },

  async update(
    id: number,
    data: {
      state_id: number;
      district_id: number;
      city_id: number;
      city_ward_name: string;
      status: string | number;
    }
  ): Promise<ApiWard> {
    const response = await axiosClient.put(`/api/city-wards/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await axiosClient.delete(`/api/city-wards/${id}`);
  },
};
