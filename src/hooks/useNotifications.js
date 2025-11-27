import { useEffect, useState, useCallback } from 'react';
import { fetchNotifications } from '../services/parseQueries';

export default function useNotifications(userId) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    let mounted = true;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const notificationData = await fetchNotifications(userId);
        if (!mounted) return;
        setNotifications(notificationData || []);
      } catch (err) {
        if (!mounted) return;
        console.error('useNotifications load error', err);
        setError(err.message || String(err));
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [userId, refreshIndex]);

  const refresh = useCallback(() => setRefreshIndex((i) => i + 1), []);

  return {
    notifications,
    loading,
    error,
    refresh
  };
}