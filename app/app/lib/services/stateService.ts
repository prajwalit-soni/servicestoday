import axiosClient from "../api";

export interface ApiState {
  state_id: number;
  state_title: string;
  status: string;
}

export const StateService = {
  async getAll(): Promise<ApiState[]> {
    const response = await axiosClient.get("/states/");
    return response.data;
  },

  async getById(id: number): Promise<ApiState> {
    const response = await axiosClient.get(`/states/${id}`);
    return response.data;
  },

  async create(data: { state_title: string; status: string }): Promise<ApiState> {
    const response = await axiosClient.post("/states/", data);
    return response.data;
  },

  async update(id: number, data: { state_title: string; status: string }): Promise<ApiState> {
    const response = await axiosClient.put(`/states/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<ApiState> {
    const response = await axiosClient.delete(`/states/${id}`);
    return response.data;
  },
};
