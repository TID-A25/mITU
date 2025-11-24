// Custom hook to fetch and manage multiple user profiles grouped by interests
import { useEffect, useState, useCallback } from 'react';
import { fetchProfiles } from '../services/parseQueries';

export default function useProfiles({ excludeUserId } = {}) {
	// State: profiles grouped by interest name { "interest": [profile1, profile2, ...] }
	const [profilesByInterest, setProfilesByInterest] = useState({});
	// State: loading indicator
	const [loading, setLoading] = useState(true);
	// State: error message if fetch fails
	const [error, setError] = useState(null);
	// State: counter to trigger refetch when incremented
	const [refreshIndex, setRefreshIndex] = useState(0);

	// Effect: fetch profiles and group them by interest whenever dependencies change
	useEffect(() => {
		// Track if component is still mounted to prevent state updates after unmount
		let mounted = true;
		setLoading(true);
		setError(null);

		(async () => {
			try {
				// Fetch all profiles except the excluded user
				const profiles = await fetchProfiles({ excludeUserId });
				if (!mounted) return; // Stop if unmounted during fetch

				// Group profiles by their interests
				const grouped = {};
				(profiles || []).forEach((profile) => {
					// Skip profiles with no interests
					if (!profile.interests || profile.interests.length === 0) return;
					// Add profile to each of its interest groups
					profile.interests.forEach((interest) => {
						if (!grouped[interest]) grouped[interest] = [];
						grouped[interest].push(profile);
					});
				});

				if (!mounted) return;
				setProfilesByInterest(grouped);
			} catch (err) {
				if (!mounted) return;
				console.error('useProfiles load error', err);
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
	}, [excludeUserId, refreshIndex]);

	// Callback: trigger a refetch by incrementing refreshIndex
	const refresh = useCallback(() => setRefreshIndex((i) => i + 1), []);

	// Return hook API
	return {
		profilesByInterest, // Profiles grouped by interest
		loading,            // Loading state
		error,              // Error message
		refresh,            // Function to manually refetch
	};
}
