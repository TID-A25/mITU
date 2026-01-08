import { useEffect, useState, useCallback } from 'react';
import { fetchNotifications } from '../services/parseQueries';

export default function useNotifications(userId) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshIndex, setRefreshIndex] = useState(0);

  // Effect to fetch notifications when userId or refreshIndex changes
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    let mounted = true;
    setLoading(true);
    setError(null);

    // Fetch notifications
    (async () => {
      try {
        const notificationData = await fetchNotifications(userId);
        if (!mounted) return;

        // Set notifications state
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

  // Return API
  return {
    notifications,  // Array of notifications
    loading,        // Is data loading?
    error,          // Error message if any
    refresh         // Function to re-fetch notifications
  };
}