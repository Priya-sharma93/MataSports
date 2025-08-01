import React from "react";
import i15 from "../../assets/i15.png";
import i16 from "../../assets/i16.png";
import i17 from "../../assets/i17.png";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import "./Football.css";
import AthHeader from "../AthPage/AthHeader/AthHeader";
function Football() {
  return (
    <>
      <AthHeader />
      <div className="container-fluid football-main-container">
        <div className="football-container">
          <div className="row">
            <div className="col-md-4 col-sm-6 col-12 p-3">
              <h1 className="text-white sports">
                <b>Sports</b>
              </h1>
              <h2 className="text-white mt-4">
                <b>Football</b>
              </h2>
              <p className="text-white mt-2 col-md-8 sportspara">
                <b>
                  Welcome to Athlete’s Academy - your Gateway to sporting
                  Excellence! At Ahlete’s Academy.We are dedicated to connecting
                  aspiring athletes with experienced coaches and mentors through
                  our cutting edge chat platform.whether you’re passionate about
                  tunnis,footfall,cricket or any other sports.We’ve got you
                  covered!
                </b>
              </p>
            </div>
            <div className="col-md-4 col-sm-6 col-12 p-3 ">
              <div className="bg-img d-flex align-items-center justify-content-center">
                <img className="img-fluid i15" src={i15} />
                <img className="img-fluid i16" src={i16} />
              </div>
            </div>
            <div className="col-md-4 col-sm-6 col-12 p-3">
              <img className="col-5 text-end i17 img-fluid" src={i17} />
              <div className="d-flex gap-5 side-btn">
                <Link to="/tennis" className="btn171 p-4">
                  <IoMdArrowRoundBack />
                </Link>
                <Link to="/basketball" className="btn172 p-4">
                  <IoMdArrowRoundForward />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Football;