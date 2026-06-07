import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const fetchAdminOverview = async () => {
  const response = await axios.get(`${baseUrl}/dashboard/admin/overview`);
  return response.data?.overview || null;
};
