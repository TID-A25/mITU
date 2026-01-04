import { useEffect, useState, useCallback } from 'react';
import { fetchProfileById } from '../services/parseQueries';
import { CURRENT_USER_ID, initializeCurrentUser } from "../constants/currentUser";

//if autoRefresh is true, it loads right away, otherwise it waits for the refreshIndex to change
export default function useProfile(profileId, { autoRefresh = true } = {}) {
	const [profile, setProfile] = useState(null);
	//if profileid is truthy, set initial loading to true
	const [loading, setLoading] = useState(Boolean(profileId && autoRefresh));
	const [error, setError] = useState(null);
	const [refreshIndex, setRefreshIndex] = useState(0);

	//user switching state tracks which user is currently selected in dropdown
	const [currentDemoUser, setCurrentDemoUser] = useState(CURRENT_USER_ID);

	//For the userswitcher.jsx
	// Updates currentdemouser to the selected user and triggers refresh.
    const handleUserChange = useCallback((newUserId) => {
        setCurrentDemoUser(newUserId);
        refresh();
    }, []);
    
	//loads saved user from localstorage or keeps the default, and updates the state with currentuser
    useEffect(() => {
        const init = async () => {
            await initializeCurrentUser();
            setCurrentDemoUser(CURRENT_USER_ID);
        };
        init();
    }, []);

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

	/* After a user has edited something in editprofile, 
	it gets saved locally to update the UI immediately 
	before you save it to the server*/
	const updateLocal = useCallback((patch) => setProfile((p) => (p ? { ...p, ...patch } : p)), []);
    //                                                               ↑ if profile exists  ↑ if profile is null
    return { 
        profile, 
        loading, 
        error, 
        refresh, 
        updateLocal, 
        currentDemoUser, 
        handleUserChange,
        CURRENT_USER_ID 
    };
}
