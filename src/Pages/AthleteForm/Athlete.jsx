import React from "react";

// Importing the side ball image for decoration
import sideBallImage from "../../assets/sideBallImage.png";

// Importing the CSS file for styling the AthProfile component
import "./Athlete.css";

// Importing the AthleteForm component to display the athlete's form
import AthleteForm from "./AthleteForm";

const Athlete = () => {
  return (
    // Main container for the Athlete Profile page with full viewport height
    <div className="coach-landing-page text-white d-flex flex-column min-vh-100">
      {/* Section for the athlete form and decorative circle */}
      <div className="d-flex justify-content-center align-items-center gap-4 mt-4 flex-wrap">
        {/* Rendering the AthleteForm component for profile-related actions */}
        <AthleteForm />

        {/* Decorative gradient circle with a side ball image */}
        <div className="gradient-circle position-relative text-center">
          <img
            src={sideBallImage} // Decorative image for visual enhancement
            alt="Decorative Balls" // Accessibility: descriptive alt text for the image
            className="side-ball-image position-absolute" // Positioned inside the gradient circle
          />
        </div>
      </div>
    </div>
  );
};

export default Athlete;
