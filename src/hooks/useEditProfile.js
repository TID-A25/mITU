import { useEffect, useState, useCallback } from "react";
import {
  fetchEditProfileData,
  saveProfileChanges,
} from "../services/parseQueries";

export default function useEditProfile(userId) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); // if saving = true, we write "Saving..." in the parent
  const [error, setError] = useState(null);

  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneVisibility, setPhoneVisibility] = useState("bumps");
  const [selected, setSelected] = useState([]);
  const [allInterests, setAllInterests] = useState([]);

  useEffect(() => {
    if (!userId) return;

    let mounted = true; // if mounted is false, we skip state updates

    async function load() {
      try {
        setLoading(true);

        const data = await fetchEditProfileData(userId);
        if (!mounted) return; // we check if mounted = false before we set the states below

        // set useState to be fetched data from backend
        setCountry(data.country);
        setPhone(data.phone);
        setPhoneVisibility(data.phoneVisibility);
        setSelected(data.userInterests);
        setAllInterests(data.allInterests);

        setError(null);
      } catch (err) {
        if (!mounted) return;
        console.error("Load error:", err);
        setError(err.message || "Failed to load data");
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

  const handleToggleInterest = useCallback((selectedInterest) => {
    setSelected((prev) =>
      prev.includes(selectedInterest)
        ? prev.filter((n) => n !== selectedInterest) // if selected while already existing in prev array, remove it (deselect)
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
      console.error("Save failed:", err);
      setError(err.message || "Failed to save");
      return false;
    } finally {
      setSaving(false);
    }
  }, [userId, country, phone, phoneVisibility, selected]);

  return {
    loading,
    saving,
    error,
    country,
    setCountry,
    phone,
    setPhone,
    phoneVisibility,
    setPhoneVisibility,
    selected,
    allInterests,
    handleToggleInterest,
    handleSave,
  };
}
