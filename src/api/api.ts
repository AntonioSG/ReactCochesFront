import axios from 'axios';
import type { Coche } from '../types/types';

const API_URL = import.meta.env.VITE_API_URL;

export const getCoches = async (): Promise<Coche[]> => {
  const response = await axios.get(`${API_URL}/coches`);
  return response.data;
};

export const getCocheById = async (id: number): Promise<Coche> => {
  const response = await axios.get(`${API_URL}/coches/${id}`);
  return response.data;
};

export const createCoche = async (coche: Omit<Coche, 'id'>): Promise<Coche> => {
  const response = await axios.post(`${API_URL}/coches`, coche);
  return response.data;
};

export const updateCoche = async (id: number, coche: Partial<Coche>): Promise<Coche> => {
  const response = await axios.put(`${API_URL}/coches/${id}`, coche);
  return response.data;
};

export const deleteCoche = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/coches/${id}`);
};