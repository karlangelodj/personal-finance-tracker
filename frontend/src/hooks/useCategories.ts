import { useState, useEffect, useCallback } from 'react';
import axiosClient from '../api/axiosClient';
import type { Category, CategoryFormData } from '../types/Category';
import type { TransactionType } from '../types/Transaction';

export function useCategories(typeFilter?: TransactionType) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = typeFilter ? { type: typeFilter } : {};
      const response = await axiosClient.get<Category[]>('/categories', { params });
      setCategories(response.data);
    } catch (err) {
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  }, [typeFilter]);

  const addCategory = async (data: CategoryFormData) => {
    await axiosClient.post('/categories', data);
    await fetchCategories();
  };

  const updateCategory = async (id: number, data: CategoryFormData) => {
    await axiosClient.put(`/categories/${id}`, data);
    await fetchCategories();
  };

  const deleteCategory = async (id: number) => {
    await axiosClient.delete(`/categories/${id}`);
    await fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    addCategory,
    updateCategory,
    deleteCategory,
    fetchCategories
  };
}