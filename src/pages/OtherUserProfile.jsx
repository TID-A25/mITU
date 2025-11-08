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

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const userQuery = new Parse.Query("Users");
        const user = await userQuery.get(userId);

        // Get user interests from user_interests table
        const interestQuery = new Parse.Query("user_interests");
        interestQuery.equalTo("user", user.get("first_name")); // Optional: use user pointer if defined as relation
        const results = await interestQuery.find();

        const interests = results.map((entry) => entry.get("interest"));

        // Construct profile object
        setProfile({
          objectId: user.id,
          first_name: user.get("first_name"),
          last_name: user.get("last_name"),
          programme: user.get("programme"),
          semester: user.get("semester"),
          profile_pic: user.get("profile_pic"),
          interests: interests,
        });
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    }

    fetchUserProfile();
  }, [userId]);

  if (!profile) return <p>Loading...</p>;

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
