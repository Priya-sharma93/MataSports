import React from "react";
import "./BasketBall.css";
import AthHeader from "../AthPage/AthHeader/AthHeader";
import i19 from "../../assets/i19.png";
import i18 from "../../assets/i18.png";
import i17 from "../../assets/i17.png";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";

function BasketBall() {
  return (
    <> <AthHeader/>
      <div className="container-fluid basketball-main-container">
        <div class=" basketball-container ">
          <div class="row">
            <div class="col-md-4 col-sm-6 col-12 p-3">
              <h1 className="text-white sports">
                <b>Sports</b>
              </h1>
              <h2 className="text-white mt-4">
                <b>Basket ball</b>
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
            <div class="col-md-4 col-sm-6 col-12 p-3 ">
              <div className="bg-img d-flex align-items-center justify-content-center overflow">
                <img className="img-fluid i19" src={i19} />
                <img className="img-fluid i18" src={i18} />
              </div>
            </div>
            <div class="col-md-4 col-sm-6 col-12 p-3">
              <img className="col-5 text-end i17" src={i17} />
              <div className="d-flex gap-5 btnsgrp">
                <Link to="/football" className="btn173 p-4">
                  <IoMdArrowRoundBack />
                </Link>
                <Link to="/AthPage" className="btn174 p-4">
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

export default BasketBall;
