import { useState, useEffect } from 'react';

/**
 * useFetch — fetches data from the API with automatic fallback to local mockData.
 * ALWAYS returns an array in `data`, never undefined.
 *
 * @param {Function} apiCall  - async function from api.js
 * @param {Array}     fallback - local mockData array to use if API is unreachable
 */
export default function useFetch(apiCall, fallback = []) {
  const safeFallback = Array.isArray(fallback) ? fallback : [];
  const [data, setData] = useState(safeFallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        const res = await apiCall();
        if (cancelled) return;

        let items = null;

        if (Array.isArray(res)) {
          items = res;
        } else if (res && typeof res === 'object') {
          // Try common response shapes
          items = res.data ?? res.services ?? res.portfolios ?? res.blogs ?? res.teams ?? res.technologies ?? res.careers ?? res.caseStudies ?? res.testimonials ?? res.projects ?? res.users ?? null;
        }

        // Final safety: must be an array
        if (!Array.isArray(items) || items.length === 0) {
          items = safeFallback;
        }

        setData(items);
      } catch (err) {
        if (!cancelled) {
          console.warn('API unreachable, using fallback:', err.message);
          setData(safeFallback);
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
