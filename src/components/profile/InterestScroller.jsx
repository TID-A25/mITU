import React from "react";
import InterestCard from "./InterestCard.jsx";

export default function InterestScroller({ interests }) {
  /**
   * Interest scroller component.
   * Displays interests as cards in a horizontal scroll layout,
   * on a single profile page.
   * Receives an array of interests.
   */

  
  let normalizedInterests;

    //if array exists
  if (Array.isArray(interests)) { 
    normalizedInterests = interests;
    //otherwise wrap it in an array
  } else if (interests) {
    normalizedInterests = [interests];
  } else {
    //otherwise save empty array
    normalizedInterests = [];
  }

  // if array is empty, show msg to user 
  if (normalizedInterests.length === 0) {
    return (
      <p className="empty-interests">
        This user has not added any interests to their profile yet.
      </p>
    );
  }

  return (
    <div className="horizontal-scroll">
      {normalizedInterests.map((interest, i) => (
        <InterestCard key={i} interest={interest} />
      ))}
    </div>
  );
}
