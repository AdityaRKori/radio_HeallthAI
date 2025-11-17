
import { useState, useEffect, useCallback } from 'react';
import { OperationalData } from '../types';
import { fetchOperationalData } from '../services/mockApiService';

export const useOperationalData = () => {
  const [data, setData] = useState<OperationalData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchOperationalData();
      setData(result);
    } catch (err) {
      setError('Failed to fetch operational data.');
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
