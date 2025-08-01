import React from "react";
import i4 from "../../../assets/i4.png";
import i5 from "../../../assets/i5.png";
import i6 from "../../../assets/i6.png";
import i7 from "../../../assets/i7.png";
import "./AthleteHome.css";
import { Link } from "react-router-dom";

const AthleteHome = () => {
  return (
    <div className="hero-container">
      {/* Content Section */}
      <div className="content-wrapper">
        <p className="small-heading">BE A PART OF OUR TEAM</p>
        <div className="main-heading">
          <span>PLAY WITH </span>
          <span className="academy">
            ATHLETE'S
            <br />
            ACADEMY
          </span>
        </div>
        <p className="description">
          Welcome to athlete's academy Your gateway to sporting excellence! At
          athlete's Academy, We are dedicated to connecting aspiring athletes
          with experienced coaches and mentors through the cutting edge chat
          platform, whether your passionate about football, tennis, cricket,
          athletics, yoga or any other sport, we've got you covered!
            
        </p>
      </div>

      {/* Images Section */}
      <div className="images-container">
        <img src={i6} alt="Left Wing" className="wing left-wing" />
        <div className="ellipse-container">
          <img src={i4} alt="Ellipse" className="ellipse" />
          <img src={i5} alt="Cyclist" className="cyclist" />
        </div>
        <img src={i7} alt="Right Wing" className="wing right-wing" />
      </div>
    </div>
  );
};

export default AthleteHome;
