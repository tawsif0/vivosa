import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const submitContactForm = async (payload) => {
  const response = await axios.post(`${baseUrl}/contact`, payload);
  return response.data;
};

export const fetchAdminContacts = async () => {
  const response = await axios.get(`${baseUrl}/contact/admin`);
  return response.data?.contacts || [];
};

export const toggleContactStatus = async (id) => {
  const response = await axios.patch(`${baseUrl}/contact/admin/${id}/status`);
  return response.data?.contact || null;
};

export const markAllContactsRead = async () => {
  const response = await axios.patch(`${baseUrl}/contact/admin/mark-all-read`);
  return response.data || {};
};

export const deleteContact = async (id) => {
  const response = await axios.delete(`${baseUrl}/contact/admin/${id}`);
  return response.data;
};

export const composeEmail = async (payload) => {
  const response = await axios.post(`${baseUrl}/contact/admin/compose-email`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
