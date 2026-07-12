import axiosClient from "../api";

export interface ApiDistrict {
  districtid: number;
  district_title: string;
  state_id: number;
  district_description?: string;
  district_status: string;
  state_name?: string;
}

export const DistrictService = {
  async getAll(params?: { state_id?: number; status?: string; limit?: number }): Promise<ApiDistrict[]> {
    const response = await axiosClient.get("/api/districts", {
      params: {
        page: 1,
        limit: params?.limit || 10000,
        ...params,
      },
    });
    return response.data;
  },

  async getById(id: number): Promise<ApiDistrict> {
    const response = await axiosClient.get(`/api/districts/${id}`);
    return response.data;
  },

  async create(data: {
    district_title: string;
    state_id: number;
    district_description?: string;
    district_status: string;
  }): Promise<ApiDistrict> {
    const response = await axiosClient.post("/api/districts", data);
    return response.data;
  },

  async update(
    id: number,
    data: {
      district_title: string;
      state_id: number;
      district_description?: string;
      district_status: string;
    }
  ): Promise<ApiDistrict> {
    const response = await axiosClient.put(`/api/districts/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await axiosClient.delete(`/api/districts/${id}`);
  },
};
