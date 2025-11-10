import React, { useEffect, useState } from "react";
import ProfileSection from "../components/profileSection/ProfileSection.jsx";
import Parse from "parse";
import "../App.css";

export default function Home() {
  const [profilesByInterest, setProfilesByInterest] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define the current logged-in user ID
  const CURRENT_USER_ID = "C6YoifVWmr"; // user is victoria

  useEffect(() => {
    async function fetchProfiles() {
      try {
        setLoading(true);

        // fetch all users from Parse
        const userQuery = new Parse.Query("Users");
        const users = await userQuery.find();

        // Filter out the current logged-in user
        const otherUsers = users.filter(user => user.id !== CURRENT_USER_ID);

        // map each user and get their interests
        //changed logic to map to other users instead of all users
        const profilesWithInterests = await Promise.all(
          otherUsers.map(async (user) => {
            try {
              // get user interests from User_interests table
              const userInterestQuery = new Parse.Query("User_interests");
              userInterestQuery.equalTo("user", user);
              userInterestQuery.include("interest");
              const interestResults = await userInterestQuery.find();
              
              const interests = interestResults.map((entry) => {
                const interest = entry.get("interest");
                return interest ? interest.get("interest_name") : null;
              }).filter(Boolean);

              // Get profile picture URL
              const profilePic = user.get("profile_pic");
              const profilePictureUrl = profilePic ? profilePic.url() : null;

              const profile = {
                id: user.id,
                name: `${user.get("first_name")} ${user.get("last_name")}`,
                profilePicture: profilePictureUrl,
                interests: interests,
                degree: user.get("programme"),
                semester: user.get("semester"),
                country: user.get("country") || "Not specified"
              };
              
              return profile;
              
            } catch (error) {
              console.error(`Error fetching interests for user ${user.id}:`, error);
              return {
                id: user.id,
                name: `${user.get("first_name")} ${user.get("last_name")}`,
                profilePicture: null,
                interests: [],
                degree: user.get("programme"),
                semester: user.get("semester"),
                country: user.get("country") || "Not specified"
              };
            }
          })
        );

        // grouping profiles by interests
        const grouped = profilesWithInterests.reduce((acc, profile) => {
          if (!profile.interests || profile.interests.length === 0) {
            return acc;
          }

          //convert interests to list if it's not already
          profile.interests.forEach((interest) => {
            if (!acc[interest]) {
              acc[interest] = [];
            }
            acc[interest].push(profile);
          });

          return acc;
        }, {});

        setProfilesByInterest(grouped);
        setError(null);

      } catch (error) {
        console.error("Failed to fetch profiles:", error);
        setError(`Failed to load profiles: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }

    fetchProfiles();
  }, []);


  return (
    <div>
      {Object.entries(profilesByInterest).map(([interest, profiles]) => (
        <ProfileSection key={interest} title={interest} profiles={profiles} />
      ))}
    </div>
  );
}