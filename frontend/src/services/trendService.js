import api from './api';

export const trendService = {
  getTrends: async (category = '', limit = 10) => {
    const response = await api.get(`/trends?category=${category}&limit=${limit}`);
    return response.data;
  },

  getTrendById: async (id) => {
    const response = await api.get(`/trends/${id}`);
    return response.data;
  },

  searchTrends: async (keyword) => {
    const response = await api.get(`/trends/search?keyword=${keyword}`);
    return response.data;
  },

  createTrend: async (trendData) => {
    const response = await api.post('/trends', trendData);
    return response.data;
  },

  updateTrend: async (id, trendData) => {
    const response = await api.put(`/trends/${id}`, trendData);
    return response.data;
  },

  deleteTrend: async (id) => {
    const response = await api.delete(`/trends/${id}`);
    return response.data;
  },
};
