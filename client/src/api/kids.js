import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const fetchPublicKids = async () => {
  const response = await axios.get(`${baseUrl}/kids/public`);
  return response.data?.kids || [];
};

export const fetchPublicKid = async (id) => {
  const response = await axios.get(`${baseUrl}/kids/public/${id}`);
  return response.data?.kid || null;
};

export const fetchAdminKids = async () => {
  const response = await axios.get(`${baseUrl}/kids/admin`);
  return response.data?.kids || [];
};

export const createKid = async (formData) => {
  const response = await axios.post(`${baseUrl}/kids/admin`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data?.kid || null;
};

export const updateKid = async (id, formData) => {
  const response = await axios.put(`${baseUrl}/kids/admin/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data?.kid || null;
};

export const deleteKid = async (id) => {
  const response = await axios.delete(`${baseUrl}/kids/admin/${id}`);
  return response.data;
};
