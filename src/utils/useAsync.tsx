import { useState, useCallback } from "react";

export function useAsync<T, Args extends unknown[]>(
  fn: (...args: Args) => T,
  deps: React.DependencyList = []
) {
  const [data, setData] = useState<Awaited<T> | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const run = useCallback(async (...args: Args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fn(...args);
      setData(data);
      return result;
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, deps);

  return { data, error, loading, run };
}
