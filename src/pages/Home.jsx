import React from "react";
import { mockProfileData } from "../data/mockProfiles.js";
import ProfileSection from "../components/profileSection/ProfileSection.jsx";
import "../App.css"; // Load global styles here
import "./Pages.css"; // Load page-specific styles here

export default function Home() {
  {
    /*Group profiles by interest*/
  }
  const profilesByInterest = mockProfileData.reduce((acc, profile) => {
    // make sure we always get an array of interests
    let interests = [];

    if (Array.isArray(profile.interest)) {
      interests = profile.interest;
    } else {
      interests = [profile.interest];
    }

    {
      /* looping through each interest and group.
       * If the interest key doesn't exist in acc,
       * it is created as an empty array.
       * Then the current profile is added to the array.
       */
    }
    interests.forEach((interest) => {
      if (!acc[interest]) {
        acc[interest] = [];
      }
      acc[interest].push(profile);
    });

    return acc;
  }, {});

  return (
    <div className="page container stack">
      {/* Render all interest sections */}
      {Object.entries(profilesByInterest).map(([interest, profiles]) => (
        <ProfileSection key={interest} title={interest} profiles={profiles} />
      ))}
    </div>
  );
}
