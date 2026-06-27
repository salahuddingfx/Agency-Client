import { useState, useEffect } from 'react';

/**
 * useFetch — fetches data from the API with automatic fallback to local mockData.
 * Returns { data, loading, error }
 *
 * @param {Function} apiCall  - async function from api.js (e.g. () => api.getServices())
 * @param {Array}     fallback - local mockData array to use if API is unreachable
 */
export default function useFetch(apiCall, fallback = []) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        const res = await apiCall();
        if (!cancelled) {
          const items = res?.data ?? res?.services ?? res?.portfolios ?? res?.blogs ?? res?.teams ?? res?.technologies ?? res?.careers ?? res?.caseStudies ?? res?.testimonials ?? res;
          setData(Array.isArray(items) ? items : fallback);
        }
      } catch (err) {
        if (!cancelled) {
          console.warn('API unreachable, using fallback data:', err.message);
          setData(fallback);
          setError(err.message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => { cancelled = true; };
  }, []);

  return { data, loading, error };
}

