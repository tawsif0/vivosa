import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const fetchPublicMenApparel = async (category) => {
  const response = await axios.get(`${baseUrl}/men-apparel/public`, {
    params: { category },
  });
  return response.data?.items || [];
};

export const fetchPublicMenApparelById = async (id) => {
  const response = await axios.get(`${baseUrl}/men-apparel/public/${id}`);
  return response.data?.item || null;
};

export const fetchAdminMenApparel = async (category) => {
  const response = await axios.get(`${baseUrl}/men-apparel/admin`, {
    params: { category },
  });
  return response.data?.items || [];
};

export const createMenApparel = async (formData) => {
  const response = await axios.post(`${baseUrl}/men-apparel/admin`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data?.item || null;
};

export const updateMenApparel = async (id, formData) => {
  const response = await axios.put(`${baseUrl}/men-apparel/admin/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data?.item || null;
};

export const deleteMenApparel = async (id) => {
  const response = await axios.delete(`${baseUrl}/men-apparel/admin/${id}`);
  return response.data;
};
