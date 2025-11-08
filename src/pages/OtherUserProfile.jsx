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
      const userQuery = new Parse.Query("Users");
      const user = await userQuery.get(userId);

      // get user interests from user_interests table
      const interestQuery = new Parse.Query("user_interests");
      interestQuery.equalTo("user", user.get("first_name"));
      const results = await interestQuery.find();

      const interests = results.map((entry) => entry.get("interest"));

      // get profile pic URL
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

    fetchUserProfile();
  }, [userId]);

//if profile is not loaded, return null
  if (!profile) return null;

  return (
    <div>
      <ProfileHeader
        profilePicture={profile.profilePicture}
        showSettings={false}
        onBump={() => navigate("/bump-sent")}
      />
      <ProfileInfo profile={profile} />
      <ProfileInterests interests={profile.interests} />
    </div>
  );
}
