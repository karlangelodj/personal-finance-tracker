import { useState, useEffect, useCallback } from 'react';
import axiosClient from '../api/axiosClient';
import type { GameStatus } from '../types/GameStatus';

export function useGameStatus() {
  const [status, setStatus] = useState<GameStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosClient.get<GameStatus>('/game/status');
      setStatus(response.data);
    } catch (err) {
      setError('Failed to load character status');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  return { status, loading, error, fetchStatus };
}