// InterestCard component - displays an interest with its associated image from database
import React, { useEffect, useState } from "react";
import Parse from "parse";
import DefaultImg from "../../assets/images/interests/default.jpg";
import "./InterestCard.css";

export default function InterestCard({ interest }) {
  const [imageSrc, setImageSrc] = useState(DefaultImg);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect: fetch interest image from database when interest name changes
  useEffect(() => {
    async function fetchInterestImage() {
      try {
        setLoading(true);
        // Query the Interest table for matching interest name
        const query = new Parse.Query("Interest");
        query.equalTo("interest_name", interest);
        const result = await query.first();

        // If interest found with an image, use it
        if (result && result.get("interest_pic")) {
          const imageFile = result.get("interest_pic");
          setImageSrc(imageFile.url());
          setError(null);
        } else {
          // Use default image if no matching interest found
          setImageSrc(DefaultImg);
          setError("Didn't find an image for this interest.")
        }
      } catch (error) {
        console.error("Error fetching interest image:", error);
        setError("Failed to load interest image.");
      } finally {
        setLoading(false);
      }
    }

    fetchInterestImage();
  }, [interest]); // Re-fetch when interest name changes

  // Show loading state
  if (loading) {
    return <div className="interest-card">Loading...</div>;
  }

  // Show error state
  if (error) {
    return <div className="interest-card error-message">{error}</div>;
  }

  // Render interest card with image background and title overlay
  return (
    <div className="interest-card">
      <img src={imageSrc} alt={`${interest} background`} />
      <div className="overlay" /> {/* Dark overlay for text readability */}
      <span className="card-title">{interest}</span>
    </div>
  );
}