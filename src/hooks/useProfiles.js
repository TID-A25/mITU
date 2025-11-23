import { useEffect, useState, useCallback } from 'react';
import { fetchProfiles } from '../services/parseQueries';

export default function useProfiles({ excludeUserId } = {}) {
	const [profilesByInterest, setProfilesByInterest] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [refreshIndex, setRefreshIndex] = useState(0);

	useEffect(() => {
		let mounted = true;
		setLoading(true);
		setError(null);

		(async () => {
			try {
				const profiles = await fetchProfiles({ excludeUserId });
				if (!mounted) return;

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
	}, [excludeUserId, refreshIndex]);

	const refresh = useCallback(() => setRefreshIndex((i) => i + 1), []);

	return {
		profilesByInterest,
		loading,
		error,
		refresh,
	};
}
