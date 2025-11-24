// InterestGallery component - displays a horizontal scroll of interest cards with images
import React, { useState, useEffect } from "react";
import InterestCard from "../interestCard/InterestCard.jsx";
import "./InterestGallery.css";

export default function InterestGallery({ interests }) {
  /**
   * Interest scroller component.
   * Displays interests as cards in a horizontal scroll layout,
   * on a single profile page.
   * Receives an array of interests.
   * 
   * Props:
   * - interests: Array (or single value) of interest names to display
   */
  
  // State: normalized array of interest names (handles various input formats)
  const [normalizedInterests, setNormalizedInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect: normalize interests into array format when interests prop changes
  useEffect(() => {
    try {
      setLoading(true);
      
      // Normalize interests to array format using conditional logic:
      const normalizedInterests = Array.isArray(interests) 
        ? interests          // is interests an array? if yes then use it
        : interests          // if not an array, check if it exists
        ? [interests]        // if yes, wrap single value in array
        : [];                // if interests is null or undefined, set as empty array

      setNormalizedInterests(normalizedInterests); 
      setError(null); 
    } catch (err) {
      console.error("Error processing interests:", err);
      setError("Failed to load interests.");
    } finally {
      setLoading(false);
    }
  }, [interests]); // Re-normalize when interests prop changes

  // Show loading state while processing interests
  if (loading) {
    return <p>Loading interests...</p>;
  }

  // Show error state if something went wrong
  if (error) {
    return <p className="error-message">{error}</p>;
  }

  // If array is empty, show message to user
  if (normalizedInterests.length === 0) {
    return (
      <p className="error-message">
        This user has not added any interests to their profile yet.
      </p>
    );
  }

  // Render horizontal gallery of interest cards
  return (
    <div className="gallery">
      {/* Map each interest to an InterestCard with database image */}
      {normalizedInterests.map((interest, i) => (
        <InterestCard key={i} interest={interest} />
      ))}
    </div>
  );
}
