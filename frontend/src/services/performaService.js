import api from './api';

export const performaService = {
  createPerformance: async (performanceData) => {
    const response = await api.post('/performa', performanceData);
    return response.data;
  },

  getPerformanceByContent: async (contentId) => {
    const response = await api.get(`/performa/content/${contentId}`);
    return response.data;
  },

  getPerformanceAnalytics: async (contentId) => {
    const response = await api.get(`/performa/content/${contentId}/analytics`);
    return response.data;
  },

  updatePerformance: async (id, performanceData) => {
    const response = await api.put(`/performa/${id}`, performanceData);
    return response.data;
  },
};
