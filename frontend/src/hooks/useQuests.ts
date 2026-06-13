import { useState, useEffect, useCallback } from 'react';
import axiosClient from '../api/axiosClient';
import type { Quest, QuestFormData } from '../types/Quest';

export function useQuests() {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosClient.get<Quest[]>('/quests');
      setQuests(response.data);
    } catch (err) {
      setError('Failed to load quests');
    } finally {
      setLoading(false);
    }
  }, []);

  const addQuest = async (data: QuestFormData) => {
    await axiosClient.post('/quests', data);
    await fetchQuests();
  };

  const deleteQuest = async (id: number) => {
    await axiosClient.delete(`/quests/${id}`);
    await fetchQuests();
  };

  useEffect(() => {
    fetchQuests();
  }, [fetchQuests]);

  return { quests, loading, error, addQuest, deleteQuest, fetchQuests };
}