import axios from 'axios';
import type { ICategory, IService, ApiResponse, ITeamMember, IFaq, IProject, ITestimonial } from '../types';

// Use relative path - Vite proxy will forward to the actual API
const BASE_URL = '/api/user';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Category API Response type (API returns { categories: [] })
interface CategoriesResponse {
  categories: ICategory[];
}

// Single Service Response
interface SingleServiceResponse {
  service: IService;
  message?: string;
}

// Services API Response type
interface ServicesResponse {
  service: IService[];
  message?: string;
}

// Helper to extract service(s) from response
const extractServices = (data: ServicesResponse | SingleServiceResponse | IService[]): IService[] => {
  if (Array.isArray(data)) {
    return data;
  }
  if ('service' in data) {
    if (Array.isArray(data.service)) {
      return data.service;
    }
    return [data.service];
  }
  return [];
};

// Category API Service
export const categoryService = {
  // Get all categories
  getAllCategories: async (): Promise<ICategory[]> => {
    try {
      const response = await apiClient.get<CategoriesResponse>('/category');
      return response.data.categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Get category by ID
  getCategoryById: async (id: string): Promise<ICategory> => {
    try {
      const response = await apiClient.get<ApiResponse<ICategory>>(`/category/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching category:', error);
      throw error;
    }
  },
};

// Services API Service
export const servicesService = {
  // Get all services by category ID
  getServicesByCategory: async (categoryId: string): Promise<IService[]> => {
    try {
      const response = await apiClient.get<ServicesResponse>(`/services/${categoryId}`);
      return extractServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  },

  // Get service by ID
  getServiceById: async (id: string): Promise<IService> => {
    try {
      const response = await apiClient.get<SingleServiceResponse>(`/services/${id}`);
      if ('service' in response.data) {
        return response.data.service;
      }
      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Error fetching service:', error);
      throw error;
    }
  },

  // Get all services
  getAllServices: async (): Promise<IService[]> => {
    try {
      const response = await apiClient.get<ServicesResponse>('/services');
      return extractServices(response.data);
    } catch (error) {
      console.error('Error fetching all services:', error);
      throw error;
    }
  },
};

export default apiClient;

// Team API Service
export const teamService = {
  // Get all team members
  getAllTeams: async (): Promise<ITeamMember[]> => {
    try {
      const response = await apiClient.get<{ teamMembers: ITeamMember[]; message: string }>('/teams');
      return response.data.teamMembers;
    } catch (error) {
      console.error('Error fetching team members:', error);
      throw error;
    }
  },
};

// FAQ API Service
export const faqService = {
  // Get all FAQs
  getAllFaqs: async (): Promise<IFaq[]> => {
    try {
      const response = await apiClient.get<{ faqs: IFaq[]; message: string }>('/faqs');
      return response.data.faqs;
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      throw error;
    }
  },
};

// Project API Service
export const projectService = {
  // Get all projects
  getAllProjects: async (): Promise<IProject[]> => {
    try {
      const response = await apiClient.get<{ projects: IProject[]; message: string }>('/projects');
      return response.data.projects;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  // Get project by ID
  getProjectById: async (id: string): Promise<IProject> => {
    try {
      const response = await apiClient.get<{ project: IProject; message: string }>(`/projects/${id}`);
      return response.data.project;
    } catch (error) {
      console.error('Error fetching project:', error);
      throw error;
    }
  },
};

// Testimonial API Service
export const testimonialService = {
  // Get all testimonials
  getAllTestimonials: async (): Promise<ITestimonial[]> => {
    try {
      const response = await apiClient.get<ITestimonial[]>('/testimonail');
      return response.data;
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      throw error;
    }
  },
};
