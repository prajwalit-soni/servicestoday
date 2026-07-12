import axiosClient from "../api";

export interface ApiCity {
  id: number;
  name: string;
  districtid: number;
  state_id: number;
  description?: string;
  status: string;
  district_name?: string;
  state_name?: string;
}

export const CityService = {
  async getAll(params?: { state_id?: number; districtid?: number; status?: string; limit?: number }): Promise<ApiCity[]> {
    if (params?.districtid) {
      const response = await axiosClient.get(`/api/districts/${params.districtid}/cities`);
      return response.data;
    }
    const response = await axiosClient.get("/api/cities", {
      params: {
        page: 1,
        limit: params?.limit || 10000,
        ...params,
      },
    });
    return response.data;
  },

  async getById(id: number): Promise<ApiCity> {
    const response = await axiosClient.get(`/api/cities/${id}`);
    return response.data;
  },

  async create(data: {
    name: string;
    districtid: number;
    state_id: number;
    description?: string;
    status: string;
  }): Promise<ApiCity> {
    const response = await axiosClient.post("/api/cities", data);
    return response.data;
  },

  async update(
    id: number,
    data: {
      name: string;
      districtid: number;
      state_id: number;
      description?: string;
      status: string | number;
    }
  ): Promise<ApiCity> {
    const response = await axiosClient.put(`/api/cities/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await axiosClient.delete(`/api/cities/${id}`);
  },
};
