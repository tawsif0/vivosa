import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Set credentials configuration (for admin token cookies if any, or default headers)
axios.defaults.withCredentials = true;

// Helper to get authorization header from localStorage if needed (VIVOSA might store it in localStorage)
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchPublicSustainableLeathers = async (category) => {
  const response = await axios.get(`${baseUrl}/sustainable-leather/public`, {
    params: { category },
  });
  return response.data?.items || [];
};

export const fetchPublicSustainableLeather = async (id) => {
  const response = await axios.get(`${baseUrl}/sustainable-leather/public/${id}`);
  return response.data?.item || null;
};

export const fetchAdminSustainableLeathers = async (category) => {
  const response = await axios.get(`${baseUrl}/sustainable-leather/admin`, {
    params: { category },
    headers: getAuthHeaders(),
  });
  return response.data?.items || [];
};

export const createSustainableLeather = async (formData) => {
  const response = await axios.post(`${baseUrl}/sustainable-leather/admin`, formData, {
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data?.item || null;
};

export const updateSustainableLeather = async (id, formData) => {
  const response = await axios.put(`${baseUrl}/sustainable-leather/admin/${id}`, formData, {
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data?.item || null;
};

export const deleteSustainableLeather = async (id) => {
  const response = await axios.delete(`${baseUrl}/sustainable-leather/admin/${id}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};
