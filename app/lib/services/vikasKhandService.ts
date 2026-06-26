import axiosClient from "../api";

export interface ApiVikasKhand {
  id: number;
  vikas_khand_name: string;
  district_id: number;
  state_id: number;
  status: string;
  district_name?: string;
  state_name?: string;
}

export const VikasKhandService = {
  async getAll(params?: { district_id?: number; limit?: number }): Promise<ApiVikasKhand[]> {
    const response = await axiosClient.get("/api/vikas-khand", {
      params: {
        page: 1,
        limit: params?.limit || 10000,
        ...params,
      },
    });
    return response.data;
  },

  async getById(id: number): Promise<ApiVikasKhand> {
    const response = await axiosClient.get(`/api/vikas-khand/${id}`);
    return response.data;
  },

  async create(data: {
    state_id: number;
    district_id: number;
    vikas_khand_name: string;
    status: string;
  }): Promise<ApiVikasKhand> {
    const response = await axiosClient.post("/api/vikas-khand", data);
    return response.data;
  },

  async update(
    id: number,
    data: {
      state_id: number;
      district_id: number;
      vikas_khand_name: string;
      status: string | number;
    }
  ): Promise<ApiVikasKhand> {
    const response = await axiosClient.put(`/api/vikas-khand/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await axiosClient.delete(`/api/vikas-khand/${id}`);
  },
};
