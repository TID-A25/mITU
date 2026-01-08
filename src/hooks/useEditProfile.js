import { useEffect, useState, useCallback } from 'react';
import { fetchEditProfileData, saveProfileChanges } from '../services/parseQueries';

export default function useEditProfile(userId) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneVisibility, setPhoneVisibility] = useState('bumps');
  const [selected, setSelected] = useState([]);
  const [allInterests, setAllInterests] = useState([]);

  // Effect to load initial profile data
  useEffect(() => {
    if (!userId) return;

    let mounted = true;

    async function load() {
      try {
        setLoading(true);

        // Fetch existing profile data 
        const data = await fetchEditProfileData(userId);
        if (!mounted) return;
        
        // Populate state with fetched data
        setCountry(data.country);
        setPhone(data.phone);
        setPhoneVisibility(data.phoneVisibility);
        setSelected(data.userInterests);
        setAllInterests(data.allInterests);

        setError(null);
      } catch (err) {
        if (!mounted) return;
        console.error('Load error:', err);
        setError(err.message || 'Failed to load data');
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [userId]);

  // Handler to toggle interest selection
  const handleToggleInterest = useCallback((selectedInterest) => {
    setSelected((prev) =>
      prev.includes(selectedInterest)
        ? prev.filter((n) => n !== selectedInterest)
        : [...prev, selectedInterest]
    );
  }, []);

  const handleSave = useCallback(async () => {
    if (!userId) return false;

    try {
      setSaving(true);
      setError(null);

      await saveProfileChanges(userId, {
        country,
        phone,
        phoneVisibility,
        selectedInterests: selected,
      });

      return true;
    } catch (err) {
      console.error('Save failed:', err);
      setError(err.message || 'Failed to save');
      return false;
    } finally {
      setSaving(false);
    }
  }, [userId, country, phone, phoneVisibility, selected]);

  // return API
  return {
    // Loading states
    loading,             // Is data loading?
    saving,              // Is save operation in progress?
    error,               // Error message
    
    // Form field state and setters
    country,              // Country value
    setCountry,           // Setter for country
    phone,                // Phone number value
    setPhone,             // Setter for phone number
    phoneVisibility,      // Phone visibility setting
    setPhoneVisibility,   // Setter for phone visibility
    
    // Interest state and data
    selected,              // Selected interests
    allInterests,          // All available interests
    
    // Action handlers
    handleToggleInterest,  // Function to toggle interest selection
    handleSave,            // Function to save changes
  };
}
