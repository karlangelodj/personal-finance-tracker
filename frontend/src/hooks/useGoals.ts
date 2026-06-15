import { useState, useEffect, useCallback } from 'react';
import axiosClient from '../api/axiosClient';
import type { Goal, GoalFormData, ContributionFormData } from '../types/Goal';

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGoals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosClient.get<Goal[]>('/goals');
      setGoals(response.data);
    } catch (err) {
      setError('Failed to load goals');
    } finally {
      setLoading(false);
    }
  }, []);

  const addGoal = async (data: GoalFormData) => {
    await axiosClient.post('/goals', data);
    await fetchGoals();
  };

  const contribute = async (id: number, data: ContributionFormData) => {
    await axiosClient.post(`/goals/${id}/contribute`, data);
    await fetchGoals();
  };

  const abandonGoal = async (id: number) => {
    await axiosClient.patch(`/goals/${id}/abandon`);
    await fetchGoals();
  };

  const deleteGoal = async (id: number) => {
    await axiosClient.delete(`/goals/${id}`);
    await fetchGoals();
  };

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  return { goals, loading, error, addGoal, contribute, abandonGoal, deleteGoal, fetchGoals };
}