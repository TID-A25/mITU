import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProfileHeader from "../components/profileHeader/ProfileHeader";
import ProfileInfo from "../components/profileInfo/ProfileInfo";
import ProfileInterests from "../components/profileInterests/ProfileInterests";
import Parse from "parse";

export default function OtherUserProfilePage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserProfile() {
      if (!userId) {
        setError("No user ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const userQuery = new Parse.Query("Users");
        const user = await userQuery.get(userId);

        // Get user interests from user_interests table
        const interestQuery = new Parse.Query("user_interests");
        interestQuery.equalTo("user", user.get("first_name"));
        const results = await interestQuery.find();

        const interests = results.map((entry) => entry.get("interest"));

        // Construct profile object with correct property mapping
        setProfile({
          objectId: user.id,
          name: `${user.get("first_name")} ${user.get("last_name")}`, // ProfileInfo expects 'name'
          degree: user.get("programme"), // ProfileInfo expects 'degree'
          semester: user.get("semester"),
          country: user.get("country") || "Not specified", // ProfileInfo expects 'country'
          profile_pic: user.get("profile_pic"),
          interests: interests,
        });
        setError(null);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setError("User not found or failed to load profile");
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, [userId]);

  if (loading) return <p>Loading...</p>;

  if (error) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  if (!profile) return <p>No profile data available</p>;

  return (
    <div>
      <ProfileHeader
        profilePicture={profile.profile_pic?.url}
        showSettings={false}
        onBump={() => navigate("/bump-sent")}
      />
      <ProfileInfo profile={profile} />
      <ProfileInterests interests={profile.interests} />
    </div>
  );
}
