export const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('id-ID', options);
};

export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const calculateEngagementRate = (likes, comments, shares, views) => {
  if (views === 0) return 0;
  return (((likes + comments + shares) / views) * 100).toFixed(2);
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'published':
      return '#28a745';
    case 'draft':
      return '#555';
    case 'archived':
      return '#6c757d';
    default:
      return '#333';
  }
};

export const getCategoryColor = (category) => {
  const colors = {
    horror: '#ff4500',
    creepypasta: '#8b0000',
    'urban-legend': '#ff6347',
    paranormal: '#dc143c',
    'true-crime': '#b22222',
  };
  return colors[category] || '#ff4500';
};

export const sortByDate = (array, key = 'createdAt', order = 'desc') => {
  return array.sort((a, b) => {
    const dateA = new Date(a[key]);
    const dateB = new Date(b[key]);
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
};

export const filterByStatus = (array, status) => {
  if (status === 'all') return array;
  return array.filter((item) => item.status === status);
};

export const searchInArray = (array, searchTerm, keys) => {
  const term = searchTerm.toLowerCase();
  return array.filter((item) => {
    return keys.some((key) => {
      const value = item[key];
      if (Array.isArray(value)) {
        return value.some((v) => v.toLowerCase().includes(term));
      }
      return value && value.toString().toLowerCase().includes(term);
    });
  });
};
