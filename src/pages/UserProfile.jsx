import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ProfileHeader from "../components/profileHeader/ProfileHeader";
import ProfileInfo from "../components/profileInfo/ProfileInfo";
import ProfileInterests from "../components/profileInterests/ProfileInterests";
import Parse from "parse";

export default function UserProfile() { 
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState(null);

  // Defining the current logged-in user ID
  const CURRENT_USER_ID = "C6YoifVWmr"; // user is victoria
  
  // is this own profile?
  const isOwnProfile = location.pathname === "/user-profile" || userId === CURRENT_USER_ID;
  
  // when going in /user-profile, use current user's ID
  const targetUserId = location.pathname === "/user-profile" ? CURRENT_USER_ID : userId;

  useEffect(() => {
    async function fetchUserProfile() {
      const userQuery = new Parse.Query("Users");
      const user = await userQuery.get(targetUserId);

      // Get user interests from User_interests table
      const interestQuery = new Parse.Query("User_interests");
      interestQuery.equalTo("user", user);
      interestQuery.include("interest");
      const results = await interestQuery.find();

      const interests = results.map((entry) => {
        const interest = entry.get("interest");
        return interest ? interest.get("interest_name") : null;
      }).filter(Boolean);

      // Get profile picture URL
      const profilePic = user.get("profile_pic");
      const profilePictureUrl = profilePic ? profilePic.url() : null;

      // make profile object 
      setProfile({
        objectId: user.id,
        name: `${user.get("first_name")} ${user.get("last_name")}`,
        degree: user.get("programme"),
        semester: user.get("semester"),
        country: user.get("country") || "Not specified",
        profilePicture: profilePictureUrl,
        interests: interests,
      });
    }

    if (targetUserId) {
      fetchUserProfile();
    }
  }, [targetUserId]);

  if (!profile) return null;

  return (
    <div>
      <ProfileHeader
        profilePicture={profile.profilePicture}
        showSettings={isOwnProfile} // if is own profile, show settings icon
        onBump={() => navigate(`/bump-sent/${profile.objectId}`)}
      />
      <ProfileInfo profile={profile} />
      <ProfileInterests interests={profile.interests} />
    </div>
  );
}
