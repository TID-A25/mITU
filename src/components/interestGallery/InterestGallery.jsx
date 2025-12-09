import React, { useState, useEffect } from "react";
import InterestCard from "../interestCard/InterestCard.jsx";
import "./InterestGallery.css";

export default function InterestGallery({ interests, showSharedInterestsMessage = false }) {
  /**
   * Interest scroller component.
   * Displays interests as cards in a horizontal scroll layout,
   * on a single profile page.
   * Receives an array of interests.
   */
  const [normalizedInterests, setNormalizedInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setLoading(true);
      
      const normalizedInterests = Array.isArray(interests) 
        ? interests          // is interests an array? 
        : interests          // if yes then use it
        ? [interests]        // if not, place it in an array
        : [];                // if interests is null or undefined, set as empty array

      setNormalizedInterests(normalizedInterests); 
      setError(null); 
    } catch (err) {
      console.error("Error processing interests:", err);
      setError("Failed to load interests.");
    } finally {
      setLoading(false);
    }
  }, [interests]);

  if (loading) {
    return <p>Loading interests...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  // if array is empty, show msg to user
  if (normalizedInterests.length === 0) {
    return (
      <p className="error-message">
        {showSharedInterestsMessage 
          ? "You don't have any common interests yet."
          : "You have not added interests to your profile yet. You won't be visible to other users in the feed."}
      </p>
    );
  }

  return (
    <div className="gallery">
      {normalizedInterests.map((interest, i) => (
        <InterestCard key={i} interest={interest} />
      ))}
    </div>
  );
}
