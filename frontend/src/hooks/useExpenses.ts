import { useState, useEffect, useCallback } from 'react';
import axiosClient from '../api/axiosClient';
import type { Expense, ExpenseFormData } from '../types/Expense';

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosClient.get<Expense[]>('/expenses');
      setExpenses(response.data);
    } catch (err) {
      setError('Failed to load expenses');
    } finally {
      setLoading(false);
    }
  }, []);

  const addExpense = async (data: ExpenseFormData) => {
    await axiosClient.post('/expenses', data);
    await fetchExpenses();
  };

  const updateExpense = async (id: number, data: ExpenseFormData) => {
    await axiosClient.put(`/expenses/${id}`, data);
    await fetchExpenses();
  };

  const deleteExpense = async (id: number) => {
    await axiosClient.delete(`/expenses/${id}`);
    await fetchExpenses();
  };

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return { expenses, loading, error, addExpense, updateExpense, deleteExpense, fetchExpenses };
}