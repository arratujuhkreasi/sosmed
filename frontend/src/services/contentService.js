import api from './api';

export const contentService = {
  createContent: async (contentData) => {
    const response = await api.post('/content', contentData);
    return response.data;
  },

  getContents: async () => {
    const response = await api.get('/content');
    return response.data;
  },

  getContentById: async (id) => {
    const response = await api.get(`/content/${id}`);
    return response.data;
  },

  updateContent: async (id, contentData) => {
    const response = await api.put(`/content/${id}`, contentData);
    return response.data;
  },

  deleteContent: async (id) => {
    const response = await api.delete(`/content/${id}`);
    return response.data;
  },

  getContentPerformance: async (id) => {
    const response = await api.get(`/content/${id}/performance`);
    return response.data;
  },
};
