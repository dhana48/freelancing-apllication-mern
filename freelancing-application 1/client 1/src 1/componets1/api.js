import axios from 'axios';

// Define the base URL for the API server
const API_URL = 'http://localhost:5000/api'; // Change this to your production URL if needed

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the token to headers if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication service - Login
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data; // return token or user info
  } catch (error) {
    console.error('Login error', error.response.data);
    throw error;
  }
};

// Fetch projects (for freelancers)
export const getProjects = async () => {
  try {
    const response = await api.get('/projects');
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error.response.data);
    throw error;
  }
};

// Create a project (for admin)
export const createProject = async (title, description, budget, skills) => {
  try {
    const response = await api.post('/projects', { title, description, budget, skills });
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error.response.data);
    throw error;
  }
};

// Apply for a project (for freelancers)
export const applyForProject = async (projectId, freelancerId, freelancerName, message) => {
  try {
    const response = await api.post(`/projects/${projectId}/apply`, {
      freelancerId,
      freelancerName,
      message,
    });
    return response.data;
  } catch (error) {
    console.error('Error applying for project:', error.response.data);
    throw error;
  }
};

// Get freelancer dashboard data (view applied projects)
export const getFreelancerDashboard = async () => {
  try {
    const response = await api.get('/users/freelancer/dashboard');
    return response.data;
  } catch (error) {
    console.error('Error fetching freelancer dashboard data:', error.response.data);
    throw error;
  }
};

// Get admin dashboard data (view all projects and freelancers)
export const getAdminDashboard = async () => {
  try {
    const response = await api.get('/users/admin/dashboard');
    return response.data;
  } catch (error) {
    console.error('Error fetching admin dashboard data:', error.response.data);
    throw error;
  }
};
