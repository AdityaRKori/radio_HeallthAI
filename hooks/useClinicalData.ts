
import { useState, useEffect, useCallback } from 'react';
import { ClinicalData } from '../types';
import { fetchClinicalData } from '../services/mockApiService';

export const useClinicalData = () => {
  const [data, setData] = useState<ClinicalData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (imageUploaded = false) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchClinicalData(imageUploaded);
      setData(result);
    } catch (err) {
      setError('Failed to fetch clinical insights data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(false);
  }, [fetchData]);

  return { data, loading, error, refresh: fetchData };
};
