// useProfiles hook - fetches multiple profiles grouped by interests
import { useEffect, useState, useCallback } from 'react';
import { fetchProfiles, fetchCurrentUserInterests } from '../services/parseQueries';

export default function useProfiles({ excludeUserId, currentUserId } = {}) {
	// State: profiles grouped by interest name
	const [profilesByInterest, setProfilesByInterest] = useState({});
	// State: current user's interests for highlighting common interests
	const [currentUserInterests, setCurrentUserInterests] = useState([]);
	// State: loading indicator
	const [loading, setLoading] = useState(true);
	// State: error message
	const [error, setError] = useState(null);
	// State: refresh counter to trigger re-fetch
	const [refreshIndex, setRefreshIndex] = useState(0);

	// Effect: fetch profiles and current user's interests when dependencies change
	useEffect(() => {
		let mounted = true;
		setLoading(true);
		setError(null);

		(async () => {
			try {
				// Fetch all profiles excluding the current user
				const profiles = await fetchProfiles({ excludeUserId });
				if (!mounted) return;

				// If currentUserId is provided, fetch their interests
				let userInterests = [];
				if (currentUserId) {
					try {
						userInterests = await fetchCurrentUserInterests(currentUserId);
						if (!mounted) return;
						setCurrentUserInterests(userInterests);
					} catch (err) {
						console.warn('Failed to fetch current user interests:', err);
						// Continue even if current user interests fail
					}
				}

				// Group profiles by their interests
				const grouped = {};
				(profiles || []).forEach((profile) => {
					if (!profile.interests || profile.interests.length === 0) return;
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

		return () => {
			mounted = false;
		};
	}, [excludeUserId, currentUserId, refreshIndex]);

	// Callback: refresh profiles by incrementing counter
	const refresh = useCallback(() => setRefreshIndex((i) => i + 1), []);

	return {
		profilesByInterest,
		currentUserInterests,
		loading,
		error,
		refresh,
	};
}
