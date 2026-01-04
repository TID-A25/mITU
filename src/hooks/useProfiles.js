// useProfiles hook - fetches multiple profiles with their interests
import { useEffect, useState, useCallback } from 'react';
import { fetchProfiles, fetchCurrentUserInterests } from '../services/parseQueries';

export default function useProfiles({ excludeUserId, currentUserId } = {}) {
    // State: flat array of profiles
    //setProfiles updates the array of profiles and triggers a re-render when profiles are fetched
    const [profiles, setProfiles] = useState([]);

    // State: current user's interests for highlighting common interests
    const [currentUserInterests, setCurrentUserInterests] = useState([]);

    // State: loading indicator
    const [loading, setLoading] = useState(true);

    // State: error message
    const [error, setError] = useState(null);

    // State: refresh counter to trigger re-fetch. Trigger is that index increments. 
    const [refreshIndex, setRefreshIndex] = useState(0);

    // Effect: fetch profiles and current user's interests when dependencies change
    useEffect(() => {
        let mounted = true;
        setLoading(true);
        setError(null);

        (async () => {
            try {
                // Fetch all profiles excluding the current user
                const fetchedProfiles = await fetchProfiles({ excludeUserId });
                if (!mounted) return;
                setProfiles(fetchedProfiles || []);

                // If currentUserId is provided, fetch their interests
                if (currentUserId) {
                    try {
                        const userInterests = await fetchCurrentUserInterests(currentUserId);
                        if (!mounted) return;
                        setCurrentUserInterests(userInterests || []);
                    } catch (err) {
                        console.warn('Failed to fetch current user interests:', err);
                        // Continue even if current user interests fail
                    }
                }
            } catch (err) {
                if (!mounted) return;
                console.error('useProfiles load error', err);
                setError(err.message || String(err));
            } finally {
                if (!mounted) return;
                setLoading(false);
            }
        })();

        return () => {
            mounted = false;
        };
    }, [excludeUserId, currentUserId, refreshIndex]);

    // Callback: refresh profiles by incrementing counter
    const refresh = useCallback(() => setRefreshIndex((i) => i + 1), []);

    return {
        profiles,
        currentUserInterests,
        loading,
        error,
        refresh,
    };
}
