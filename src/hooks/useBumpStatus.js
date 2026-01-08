import { useEffect, useState } from 'react';
import { checkBumpStatus } from '../services/parseQueries';

export default function useBumpStatus(currentUserId, targetUserId) {
  const [bumpStatus, setBumpStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Effect: fetch bump status when user IDs change
  useEffect(() => {
    if (!currentUserId || !targetUserId) {
      setBumpStatus(null);
      return;
    }

    let mounted = true;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const status = await checkBumpStatus(currentUserId, targetUserId);
        if (!mounted) return;
        setBumpStatus(status);
      } catch (err) {
        if (!mounted) return;
        console.error('useBumpStatus error', err);
        setError(err.message || String(err));
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [currentUserId, targetUserId]);

  // return API
  return { 
    bumpStatus,   // Object with bump status details
    loading,      // Boolean: is loading?
    error         // String: error message
  };
}
