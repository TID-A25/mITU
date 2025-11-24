import { useEffect, useState, useCallback } from 'react';
import { fetchProfileById } from '../services/parseQueries';

export default function useProfile(profileId, { autoRefresh = true } = {}) {
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(Boolean(profileId && autoRefresh));
	const [error, setError] = useState(null);
	const [refreshIndex, setRefreshIndex] = useState(0);

	useEffect(() => {
		if (!profileId) return;
		// When autoRefresh is false, don't fetch automatically until refresh() is called
		if (!autoRefresh && refreshIndex === 0) return;

		let mounted = true;
		setLoading(true);
		setError(null);

		(async () => {
			try {
				const p = await fetchProfileById(profileId);
				if (!mounted) return;
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

		return () => {
			mounted = false;
		};
	}, [profileId, autoRefresh, refreshIndex]);

	const refresh = useCallback(() => setRefreshIndex((i) => i + 1), []);

	const updateLocal = useCallback((patch) => setProfile((p) => (p ? { ...p, ...patch } : p)), []);

	return { profile, loading, error, refresh, updateLocal };
}
