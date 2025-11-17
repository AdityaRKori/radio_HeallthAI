import { useState, useEffect, useCallback } from 'react';
import { ReportData } from '../types';
import { fetchReportData } from '../services/mockApiService';

export const useReportData = () => {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchReportData();
      setData(result);
    } catch (err) {
      setError('Failed to fetch aggregated report data.');
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
