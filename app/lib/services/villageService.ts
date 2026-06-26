import axiosClient from "../api";

export interface ApiVillage {
  id: number;
  villages_name: string;
  panchayat_id: number;
  vikas_khand_id: number;
  district_id: number;
  state_id?: number;
  status: string;
  gram_panchayat_name?: string;
  vikas_khand_name?: string;
  district_name?: string;
  state_name?: string;
}

export const VillageService = {
  async getAll(params?: { district_id?: number; vikas_khand_id?: number; panchayat_id?: number; limit?: number }): Promise<ApiVillage[]> {
    const response = await axiosClient.get("/api/villages", {
      params: {
        page: 1,
        limit: params?.limit || 10000,
        ...params,
      },
    });
    return response.data;
  },

  async getFullList(params?: { limit?: number }): Promise<any[]> {
    const response = await axiosClient.get("/api/villages/full-list", {
      params: {
        page: 1,
        limit: params?.limit || 10000,
      },
    });
    return response.data;
  },

  async getById(id: number): Promise<ApiVillage> {
    const response = await axiosClient.get(`/api/villages/${id}`);
    return response.data;
  },

  async create(data: {
    district_id: number;
    vikas_khand_id: number;
    panchayat_id: number;
    villages_name: string;
    status: string;
  }): Promise<ApiVillage> {
    const response = await axiosClient.post("/api/villages", data);
    return response.data;
  },

  async update(
    id: number,
    data: {
      district_id: number;
      vikas_khand_id: number;
      panchayat_id: number;
      villages_name: string;
      status: string | number;
    }
  ): Promise<ApiVillage> {
    const response = await axiosClient.put(`/api/villages/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await axiosClient.delete(`/api/villages/${id}`);
  },
};
