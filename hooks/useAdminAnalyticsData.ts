import { useState, useEffect, useCallback } from 'react';
import { AdminAnalyticsData } from '../types';
import { fetchAdminAnalyticsData } from '../services/mockApiService';

export const useAdminAnalyticsData = () => {
  const [data, setData] = useState<AdminAnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchAdminAnalyticsData();
      setData(result);
    } catch (err) {
      setError('Failed to fetch admin analytics data.');
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
