
import { useState, useEffect, useCallback } from 'react';
import { TriageData } from '../types';
import { fetchTriageData } from '../services/mockApiService';

export const useTriageData = () => {
  const [data, setData] = useState<TriageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchTriageData();
      setData(result);
    } catch (err) {
      setError('Failed to fetch triage data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refresh: fetchData };
};
