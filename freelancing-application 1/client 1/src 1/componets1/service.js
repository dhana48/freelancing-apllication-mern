import axios from 'axios';

// Base URL for your backend
const BASE_URL = 'http://localhost:5000/api';

// Axios instance for reusable configurations
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Fetch all projects
export const getProjects = async () => {
    try {
        const response = await api.get('/projects');
        return response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw new Error('Could not fetch projects');
    }
};

// Create a new project
export const createProject = async (projectData) => {
    try {
        const response = await api.post('/projects', projectData);
        return response.data;
    } catch (error) {
        console.error('Error creating project:', error);
        throw new Error('Could not create project');
    }
};

// Apply for a project (future functionality)
export const applyForProject = async (projectId, freelancerData) => {
    try {
        const response = await api.post(`/projects/${projectId}/apply`, freelancerData);
        return response.data;
    } catch (error) {
        console.error('Error applying for project:', error);
        throw new Error('Could not apply for project');
    }
};
