import axiosClient from "../api";

export interface ApiCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  sort_order: number;
  parent_id?: number | null;
  is_active: boolean;
  image?: string;
  icon?: string;
  banner_image?: string;
  parent_name?: string;
  price?: number;
  discount_price?: number;
  location?: string;
  description_sections?: string;
}

export const CategoryService = {
  async getAll(params?: { page?: number; limit?: number; sort_dir?: string }): Promise<any> {
    const response = await axiosClient.get("/categories/admin", { params });
    return response.data;
  },

  async getById(id: number): Promise<ApiCategory> {
    const response = await axiosClient.get(`/categories/${id}`);
    return response.data;
  },

  async create(formData: FormData): Promise<ApiCategory> {
    const response = await axiosClient.post("/categories", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  async update(id: number, formData: FormData): Promise<ApiCategory> {
    const response = await axiosClient.put(`/categories/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await axiosClient.delete(`/categories/${id}`);
  },
};
