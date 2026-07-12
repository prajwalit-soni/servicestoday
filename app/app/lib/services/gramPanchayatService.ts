import axiosClient from "../api";

export interface ApiGramPanchayat {
  id: number;
  panchayat_name: string;
  vikas_khand_id: number;
  district_id: number;
  state_id: number;
  status: string;
  district_name?: string;
  vikas_khand_name?: string;
  state_name?: string;
}

export const GramPanchayatService = {
  async getAll(params?: { vikas_khand_id?: number; limit?: number }): Promise<ApiGramPanchayat[]> {
    const response = await axiosClient.get("/api/gram-panchayats", {
      params: {
        page: 1,
        limit: params?.limit || 10000,
        ...params,
      },
    });
    return response.data;
  },

  async getById(id: number): Promise<ApiGramPanchayat> {
    const response = await axiosClient.get(`/api/gram-panchayats/${id}`);
    return response.data;
  },

  async create(data: {
    state_id: number;
    district_id: number;
    vikas_khand_id: number;
    panchayat_name: string;
    status: string;
  }): Promise<ApiGramPanchayat> {
    const response = await axiosClient.post("/api/gram-panchayats", data);
    return response.data;
  },

  async update(
    id: number,
    data: {
      state_id: number;
      district_id: number;
      vikas_khand_id: number;
      panchayat_name: string;
      status: string | number;
    }
  ): Promise<ApiGramPanchayat> {
    const response = await axiosClient.put(`/api/gram-panchayats/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await axiosClient.delete(`/api/gram-panchayats/${id}`);
  },
};
