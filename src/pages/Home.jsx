import ProfileSection from '../components/profileSection/ProfileSection.jsx';
import '../App.css';
import './Pages.css';
import useProfiles from '../hooks/useProfiles';

export default function Home() {
  // Hardcoded current user ID for demo (victoria)
  const CURRENT_USER_ID = 'C6YoifVWmr';

  // Fetch all profiles except current user, grouped by interests
  // Also fetch current user's interests to highlight common ones
  const { profilesByInterest, currentUserInterests, loading, error, refresh } = useProfiles({
    excludeUserId: CURRENT_USER_ID,
    currentUserId: CURRENT_USER_ID,
  });

  // Show loading state while fetching profiles
  if (loading) {
    return (
      <div className="page container stack">
        <p>Loading profiles..</p>
      </div>
    );
  }

  // Show error message if fetch failed
  if (error) {
    return (
      <div className="page container stack">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  // Show empty state if no profiles with interests found
  if (!profilesByInterest || Object.keys(profilesByInterest).length === 0) {
    return (
      <div className="page container stack">
        <p>No profiles with matching interests found.</p>
      </div>
    );
  }

  // Render profiles grouped by interest
  return (
    <div className="page container stack">
      {/* Map over each interest and render a ProfileSection for it */}
      {Object.entries(profilesByInterest).map(([interest, profiles]) => (
        <ProfileSection 
          key={interest} 
          title={interest} 
          profiles={profiles}
          isCommonInterest={currentUserInterests.includes(interest)}
        />
      ))}
    </div>
  );
}
