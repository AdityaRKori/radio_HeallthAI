
import { useState, useEffect, useCallback } from 'react';
import { PopulationData, Filters } from '../types';
import { fetchPopulationData } from '../services/mockApiService';

export const usePopulationData = (initialFilters: Filters) => {
  const [data, setData] = useState<PopulationData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const fetchData = useCallback(async (currentFilters: Filters) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchPopulationData(currentFilters);
      setData(result);
    } catch (err) {
      setError('Failed to fetch population data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(filters);
  }, [filters, fetchData]);

  return { data, loading, error, filters, setFilters };
};
