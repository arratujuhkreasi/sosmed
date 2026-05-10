export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const USER_ROLES = {
  ADMIN: 'admin',
  CREATOR: 'creator',
  VISITOR: 'visitor',
};

export const CONTENT_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
};

export const TREND_CATEGORIES = [
  { value: 'horror', label: 'Horror' },
  { value: 'creepypasta', label: 'Creepypasta' },
  { value: 'urban-legend', label: 'Urban Legend' },
  { value: 'paranormal', label: 'Paranormal' },
  { value: 'true-crime', label: 'True Crime' },
];

export const DURATION_RANGE = {
  MIN: 30,
  MAX: 120,
};

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
};

export const TOAST_CONFIG = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized. Please login.',
  SERVER_ERROR: 'Server error. Please try again later.',
  NOT_FOUND: 'Resource not found.',
  VALIDATION_ERROR: 'Please check your input.',
};

export const SUCCESS_MESSAGES = {
  LOGIN: 'Login successful!',
  REGISTER: 'Registration successful!',
  CONTENT_CREATED: 'Content created successfully!',
  CONTENT_UPDATED: 'Content updated successfully!',
  CONTENT_DELETED: 'Content deleted successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  TRENDS: '/trends',
  CONTENT: '/content',
  CONTENT_NEW: '/content/new',
  CONTENT_EDIT: '/content/edit/:id',
  CONTENT_VIEW: '/content/:id',
  PROFILE: '/profile',
};
