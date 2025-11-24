import React, { useEffect, useState } from "react";
import Parse from "parse";
import DefaultImg from "../../assets/images/interests/default.jpg";
import "./InterestCard.css";

export default function InterestCard({ interest }) {
  const [imageSrc, setImageSrc] = useState(DefaultImg);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

/* Looks in DB, gets interest name and pic. Throws an error if unable to get image. */

  useEffect(() => {
    async function fetchInterestImage() {
      try {

        setLoading(true);
        const query = new Parse.Query("Interest");
        query.equalTo("interest_name", interest);
        const result = await query.first();

        if (result && result.get("interest_pic")) {
          const imageFile = result.get("interest_pic");
          setImageSrc(imageFile.url());
          setError(null);
        } else {
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
  }, [interest]);

  if (loading) {
    return <div className="interest-card">Loading...</div>;
  }

  if (error) {
    return <div className="interest-card error-message">{error}</div>;
  }

  return (
    <div className="interest-card">
      <img src={imageSrc} alt={`${interest} background`} />
      <div className="overlay" />
      <span className="card-title">{interest}</span>
    </div>
  );
}