import axiosClient from "../api";

export interface ApiBanner {
  id: number;
  title: string;
  redirect_url: string;
  status: string;
  image?: string;
  image_path?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ApiBannerResponse {
  success: boolean;
  message: string;
  data: ApiBanner[];
}

export const BannerService = {
  async getAll(): Promise<ApiBanner[]> {
    const response = await axiosClient.get<ApiBannerResponse>("/admin/banners");
    return response.data.data || [];
  },

  async getById(id: number): Promise<ApiBanner> {
    const response = await axiosClient.get(`/admin/banners/${id}`);
    return response.data;
  },

  async create(formData: FormData): Promise<ApiBanner> {
    const response = await axiosClient.post("/admin/banners", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  async update(id: number, formData: FormData): Promise<ApiBanner> {
    const response = await axiosClient.put(`/admin/banners/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await axiosClient.delete(`/admin/banners/${id}`);
  },
};
