import axiosClient from "../api";

export const LocationBulkService = {
  async downloadSample(): Promise<Blob> {
    const response = await axiosClient.get("/locations/download-sample", {
      responseType: "blob",
    });
    return response.data;
  },

  async uploadExcel(file: File): Promise<any> {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axiosClient.post("/locations/upload-excel", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};
