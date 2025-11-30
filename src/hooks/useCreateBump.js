import { useEffect, useState } from 'react';
import { createBump } from '../services/parseQueries';

export default function useCreateBump(userAId, userBId, requestedById, { autoCreate = true } = {}) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!autoCreate || !userAId || !userBId) return;

    let mounted = true;
    setLoading(true);
    setError(null);
    setMessage(null);

    (async () => {
      try {
        const bumpResult = await createBump({ userAId, userBId, requestedById });
        if (!mounted) return;
        
        setResult(bumpResult);
        
        if (bumpResult && bumpResult.created === false) {
          setMessage("You have already sent a bump to this person");
        }
      } catch (err) {
        if (!mounted) return;
        console.error('useCreateBump error', err);
        setError(err.message || String(err));
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [userAId, userBId, requestedById, autoCreate]);

  return { result, loading, error, message };
}
