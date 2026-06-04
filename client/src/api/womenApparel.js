import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const fetchPublicWomenApparel = async (category) => {
  const response = await axios.get(`${baseUrl}/women-apparel/public`, {
    params: { category },
  });
  return response.data?.items || [];
};

export const fetchPublicWomenApparelById = async (id) => {
  const response = await axios.get(`${baseUrl}/women-apparel/public/${id}`);
  return response.data?.item || null;
};

export const fetchAdminWomenApparel = async (category) => {
  const response = await axios.get(`${baseUrl}/women-apparel/admin`, {
    params: { category },
  });
  return response.data?.items || [];
};

export const createWomenApparel = async (formData) => {
  const response = await axios.post(`${baseUrl}/women-apparel/admin`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data?.item || null;
};

export const updateWomenApparel = async (id, formData) => {
  const response = await axios.put(`${baseUrl}/women-apparel/admin/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data?.item || null;
};

export const deleteWomenApparel = async (id) => {
  const response = await axios.delete(`${baseUrl}/women-apparel/admin/${id}`);
  return response.data;
};
