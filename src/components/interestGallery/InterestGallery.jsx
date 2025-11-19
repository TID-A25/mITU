import React from "react";
import InterestCard from "../interestCard/InterestCard.jsx";
import "./InterestGallery.css";

export default function InterestGallery({ interests }) {
  /**
   * Interest scroller component.
   * Displays interests as cards in a horizontal scroll layout,
   * on a single profile page.
   * Receives an array of interests.
   */

  // if interests is an array then set it in the variable "normalizedInterests"
  const normalizedInterests = Array.isArray(interests) 
    ? interests          //is interests an array? 
    : interests          //if yes then use it
    ? [interests]        // if not, place it in an array
    : [];                //if interests is null or undefined, set as empty array

  // if array is empty, show msg to user
  if (normalizedInterests.length === 0) {
    return (
      <p className="empty-interests">
        This user has not added any interests to their profile yet.
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
