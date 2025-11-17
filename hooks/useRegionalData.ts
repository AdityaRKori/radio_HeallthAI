import { useState, useEffect, useCallback } from 'react';
import { RegionalData } from '../types';
import { fetchRegionalData } from '../services/mockApiService';

export const useRegionalData = () => {
  const [data, setData] = useState<RegionalData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchRegionalData();
      setData(result);
    } catch (err) {
      setError('Failed to fetch regional data.');
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
