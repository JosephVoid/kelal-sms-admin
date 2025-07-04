import { useState, useCallback } from "react";

export function useAsync<Fn extends (...args: any[]) => Promise<any>>(fn: Fn) {
  const [data, setData] = useState<Awaited<ReturnType<Fn>> | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const run = useCallback(
    async (...args: Parameters<Fn>): Promise<Awaited<ReturnType<Fn>>> => {
      setLoading(true);
      setError(null);
      try {
        const result = await fn(...args);
        setData(result);
        return result;
      } catch (err: any) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { data, error, loading, run };
}
