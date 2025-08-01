import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CoachSports.css";
import Tennis from "../../../assets/Images/Tennis.png";
import Football from "../../../assets/Images/Football.png";
import Basketball from "../../../assets/Images/Basketball.png";
import Yoga from "../../../assets/Images/Yoga.png";
import Cricket from "../../../assets/Images/Cricket.png";
import Boxing from "../../../assets/Images/Boxing.png";
import Hockey from "../../../assets/Images/Hockey.png";
import Skating from "../../../assets/Images/Skating.png";
import { toast } from "react-toastify";

const SportCard = ({ sport, bgClass, imageSrc, imageWidth, imageHeight }) => (
  <div
    className={`sport-card col-6 col-md-3 p-2 mb-4`}
    onClick={() => toast.error(`${sport} clicked!`)}
    role="button"
  >
    <div className={`sport-card-bg ${bgClass} rounded p-3`}>
      <div className="sport-image-wrapper">
        <img
          src={imageSrc}
          alt={sport}
          className="sport-image"
          style={{
            width: imageWidth || "100%",
            height: imageHeight || "auto",
          }}
        />
      </div>
    </div>
    <div className="text-center sport-card-title">{sport}</div>
  </div>
);

const CoachSports = () => {
  const sports = [
    {
      name: "Tennis",
      bgClass: "tennis-gradient",
      imageSrc: Tennis,
    },
    {
      name: "Football",
      bgClass: "football-gradient",
      imageSrc: Football,
    },
    {
      name: "Basketball",
      bgClass: "basketball-gradient",
      imageSrc: Basketball,
      imageHeight: "250px",
    },
    {
      name: "Yoga",
      bgClass: "yoga-gradient",
      imageSrc: Yoga,
    },
    {
      name: "Cricket",
      bgClass: "cricket-gradient",
      imageSrc: Cricket,
    },
    {
      name: "Boxing",
      bgClass: "boxing-gradient",
      imageSrc: Boxing,
      imageHeight: "250px",
    },
    {
      name: "Hockey",
      bgClass: "hockey-gradient",
      imageSrc: Hockey,
    },
    {
      name: "Skating",
      bgClass: "skating-gradient",
      imageSrc: Skating,
    },
  ];

  return (
    <div className="sports-page">
      <div className="all-card">
        <h2 className="text-center text-white pt-4 ">Popular Sports</h2>
        <div className="row mx-5">
          {sports.map((sport) => (
            <SportCard
              key={sport.name}
              sport={sport.name}
              bgClass={sport.bgClass}
              imageSrc={sport.imageSrc}
              imageWidth={sport.imageWidth}
              imageHeight={sport.imageHeight}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoachSports;
