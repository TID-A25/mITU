// Custom hook to fetch and manage a single user profile by ID
import { useEffect, useState, useCallback } from 'react';
import { fetchProfileById } from '../services/parseQueries';

export default function useProfile(profileId, { autoRefresh = true } = {}) {
	// State: the profile object
	const [profile, setProfile] = useState(null);
	// State: loading indicator (only true initially if autoRefresh is on)
	const [loading, setLoading] = useState(Boolean(profileId && autoRefresh));
	// State: error message if fetch fails
	const [error, setError] = useState(null);
	// State: counter to trigger refetch when incremented
	const [refreshIndex, setRefreshIndex] = useState(0);

	// Effect: fetch profile whenever profileId, autoRefresh, or refreshIndex changes
	useEffect(() => {
		if (!profileId) return; // No profile ID, nothing to fetch
		// When autoRefresh is false, don't fetch automatically until refresh() is called
		if (!autoRefresh && refreshIndex === 0) return;

		// Track if component is still mounted to prevent state updates after unmount
		let mounted = true;
		setLoading(true);
		setError(null);

		(async () => {
			try {
				// Fetch the specific profile by ID
				const p = await fetchProfileById(profileId);
				if (!mounted) return; // Stop if unmounted during fetch
				setProfile(p);
			} catch (err) {
				if (!mounted) return;
				console.error('useProfile load error', err);
				setError(err.message || String(err));
			} finally {
				if (!mounted) return;
				setLoading(false);
			}
		})();

		// Cleanup: mark component as unmounted
		return () => {
			mounted = false;
		};
	}, [profileId, autoRefresh, refreshIndex]);

	// Callback: trigger a refetch by incrementing refreshIndex
	const refresh = useCallback(() => setRefreshIndex((i) => i + 1), []);

	// Callback: update profile locally without refetching (useful for optimistic updates)
	const updateLocal = useCallback((patch) => setProfile((p) => (p ? { ...p, ...patch } : p)), []);

	// Return hook API
	return { 
		profile,     // The profile object
		loading,     // Loading state
		error,       // Error message
		refresh,     // Function to manually refetch
		updateLocal  // Function to update profile state locally
	};
}
