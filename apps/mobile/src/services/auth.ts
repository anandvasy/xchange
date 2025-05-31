import api from './api';
import { User } from '@xchange/shared-types';

interface AuthResponse {
  token: string;
  user: User;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  name: string;
}

export const authService = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  validateToken: async (): Promise<User> => {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },
}; 