// useFetch.js

import { useState, useEffect } from "react";

// Shared cache across all components
const cache = new Map();

// 2 minutes (in milliseconds)
const CACHE_EXPIRY = 2 * 60 * 1000;

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Check cache first
        const cachedData = cache.get(url);

        if (cachedData) {
          const isCacheValid =
            Date.now() - cachedData.timestamp < CACHE_EXPIRY;

          if (isCacheValid) {
            if (isMounted) {
              setData(cachedData.data);
              setLoading(false);
            }
            return;
          }
        }

        // Cache expired or not found -> Fetch fresh data
        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const result = await response.json();

        // Save fresh data to cache
        cache.set(url, {
          data: result,
          timestamp: Date.now(),
        });

        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          if (isMounted) {
            setError(err.message);
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [url]);

  return {
    data,
    loading,
    error,
  };
};

export default useFetch;


// using AbortController for API calls made inside useEffect is a 
// recommended best practice. It prevents unnecessary network activity and
//  avoids race conditions when a component unmounts or a dependency changes.
//   However, I don't use it for every request—for example, form submissions or 
//   requests that should complete regardless of navigation may not need to be aborted.


// ✅ First call to a URL → Fetches from the network and stores the response in the Map.
// ✅ Another component requesting the same URL within 2 minutes → Gets the cached data instantly (no API call).
// ✅ After 2 minutes → Cache is considered expired, so a fresh request is made and the cache is updated.
// ✅ Because cache is declared outside the hook, it is shared across all components and is not recreated on every render.