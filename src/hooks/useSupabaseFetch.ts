import { useState, useEffect, useCallback } from "react";

// We use a more generic 'thenable' approach or specifically target the
// shape of the Supabase query response to avoid PostgrestBuilder complexity.
interface FetcherResult<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  refetch: () => void;
}

interface SupabaseResponse<T> {
  data: T | null;
  error: { message: string } | null;
}

export function useSupabaseFetch<T>(
  query: PromiseLike<SupabaseResponse<T>>,
): FetcherResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: result, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setData(result as T);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading, refetch: fetchData };
}
