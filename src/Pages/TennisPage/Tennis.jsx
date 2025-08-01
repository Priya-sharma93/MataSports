import React from "react";
import i11 from "../../assets/i11.png";
import i10 from "../../assets/i10.png";
import i12 from "../../assets/i12.png";
import i13 from "../../assets/i13.png";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import "./Tennis.css";
import AthHeader from "../AthPage/AthHeader/AthHeader";

function Tennis() {
  const { name } = useParams(); // Dynamic parameter for sport name

  return (
    <>
      <AthHeader />
      <div className="container-fluid tennis-main-container">
        <main className="tennis-container">
          <div className="row align-items-md-stretch">
            <div className="col-md-6">
              <div className="h-100 p-5">
                <h1 className="text-white sports">
                  <b>Sports</b>
                </h1>
                <h2 className="text-white mt-4">
                  <b>{name}</b>
                </h2>
                <p className="text-white mt-2 col-md-8 sportspara">
                  <b>
                    Welcome to Athlete’s Academy - your Gateway to sporting
                    Excellence! At Athlete’s Academy, we are dedicated to
                    connecting aspiring athletes with experienced coaches and
                    mentors through our cutting-edge chat platform. Whether
                    you’re passionate about tennis, football, cricket, or any
                    other sport, we’ve got you covered!
                  </b>
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="h-100 p-5">
                <div className="col-md-10 right-img">
                  <img className="img-fluid i11" src={i11} alt="Sport 1" />
                  <img className="img-fluid i10" src={i10} alt="Sport 2" />
                </div>
                <div className="d-flex">
                  <img className="img-fluid i12" src={i12} alt="Sport 3" />
                  <img className="img-fluid i13" src={i13} alt="Sport 4" />
                </div>
                <div className="d-flex gap-5 btn3">
                  <Link to="/AthPage" className="btn1 text-white p-4">
                    <b>
                      <IoMdArrowRoundBack />
                    </b>
                  </Link>
                  <Link to="/football" className="btn2 p-4">
                    <b>
                      <IoMdArrowRoundForward />
                    </b>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Tennis;
