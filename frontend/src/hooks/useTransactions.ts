import { useState, useEffect, useCallback } from 'react';
import axiosClient from '../api/axiosClient';
import type { Transaction, TransactionFormData, TransactionType } from '../types/Transaction';

export function useTransactions(typeFilter?: TransactionType) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = typeFilter ? { type: typeFilter } : {};
      const response = await axiosClient.get<Transaction[]>('/transactions', { params });
      setTransactions(response.data);
    } catch (err) {
      setError('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  }, [typeFilter]);

  const addTransaction = async (data: TransactionFormData) => {
    await axiosClient.post('/transactions', data);
    await fetchTransactions();
  };

  const updateTransaction = async (id: number, data: TransactionFormData) => {
    await axiosClient.put(`/transactions/${id}`, data);
    await fetchTransactions();
  };

  const deleteTransaction = async (id: number) => {
    await axiosClient.delete(`/transactions/${id}`);
    await fetchTransactions();
  };

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return { transactions, loading, error, addTransaction, updateTransaction, deleteTransaction, fetchTransactions };
}