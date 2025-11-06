import React from "react";
import "../profileSection/ProfileSection.css"; // styles for interest-card and card-title
import AnimeImg from "../../assets/images/interests/Anime.jpg";
// note: filename in repository is 'Sports.JPG' (uppercase extension)
import SportsImg from "../../assets/images/interests/Sports.JPG";
import KnittingImg from "../../assets/images/interests/knitting.jpg";
import MoviesImg from "../../assets/images/interests/movies.jpg";
import GolfImg from "../../assets/images/interests/golf.jpg";
import PumpkinImg from "../../assets/images/interests/pumpkin.jpg";
import MusicImg from "../../assets/images/interests/music.jpg";
import DefaultImg from "../../assets/images/interests/default.jpg";

export default function InterestCard({ interest }) {
  const images = {
    Anime: AnimeImg,
    Sports: SportsImg,
    Knitting: KnittingImg,
    Movies: MoviesImg,
    Golf: GolfImg,
    "Pumpkin-carving": PumpkinImg,
    Music: MusicImg

  };
  // choosing image src based on interest, otherwise default to a generic img
  const imageSrc = images[interest] || DefaultImg;

  return (
    <div className="interest-card">
      <img src={imageSrc} alt={`${interest} background`} />
      <div className="overlay" />
      <span className="card-title">{interest}</span>
    </div>
  );
}