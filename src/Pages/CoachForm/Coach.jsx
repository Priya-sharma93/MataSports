import React from "react";
// import LogInHeader from "../../components/LogInHeader";

import sideBallImage from "../../assets/sideBallImage.png";
// import "./CoachLandingPage2.css";

// import AthletePageCard from "../../components/AthletePageCard";
import CoachForm from "./CoachForm";

const Coach = () => {
  return (
    <div className="coach-landing-page text-white d-flex flex-column min-vh-100">
     
      <div className="d-flex justify-content-center align-items-center flex-wrap gap-5 mt-4">
        <CoachForm />
        <div className="gradient-circle position-relative text-center">
          <img
            src={sideBallImage}
            alt="Decorative Balls"
            className="side-ball-image position-absolute"
          />
        </div>
      </div>
    </div>
  );
};

export default Coach;