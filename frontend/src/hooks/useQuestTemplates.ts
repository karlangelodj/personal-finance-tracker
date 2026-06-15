import { useState, useEffect, useCallback } from 'react';
import axiosClient from '../api/axiosClient';
import type { QuestTemplate } from '../types/QuestTemplate';
import type { QuestFormData } from '../types/Quest';

export function useQuestTemplates() {
  const [templates, setTemplates] = useState<QuestTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTemplates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosClient.get<QuestTemplate[]>('/quest-templates');
      setTemplates(response.data);
    } catch (err) {
      setError('Failed to load quest templates');
    } finally {
      setLoading(false);
    }
  }, []);

  const activateTemplate = async (templateId: number, data: QuestFormData) => {
    await axiosClient.post(`/quest-templates/${templateId}/activate`, data);
  };

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  return { templates, loading, error, activateTemplate, fetchTemplates };
}