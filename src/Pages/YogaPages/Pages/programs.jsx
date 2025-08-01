import React from "react";
import backgroundLogo from "../assets/Images/backgroundLogo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Components/footer";
import "../index.css";
import YogaHeader from "../Components/header";

const Programs = () => {
  return (
    <div>
      <YogaHeader />
      <div
        className="position-relative d-flex align-items-center justify-content-center"
        style={{
          minHeight: "50vh",
          backgroundColor: "#d9ebe8",
          padding: "6rem",
        }}
      >
        {/* Background Logo */}
        <div className="">
          <img
            src={backgroundLogo}
            alt="background logo"
            style={{ position: "absolute", bottom: "0", right: "0" }}
          />
        </div>

        <div
          className="col-22 col-lg-6 text-lg-start position-relative"
          style={{ zIndex: "1", width: "80%" }}
        >
          <h1
            className="fw-bold color-darkblue font-family-sofia-pro"
            style={{
              fontSize: "45px",
              marginTop: "50px",
            }}
          >
            Yoga Programs
          </h1>
          <p className="opacity-75 custom-paragraph-text">
            Follow one of our guided yoga programs to <br /> keep you motivated
            and develop your practice. <br /> Whether you’re looking for a
            beginners’ yoga <br />
            course, a deeper dive into yoga concepts or a <br /> month of yoga
            challenge - we’ve got you <br /> covered.
          </p>
          <div className="d-flex gap-4 mt-5 flex-column flex-md-row text-lg-start">
            <button
              className="px-4 py-3 border-0 text-white rounded-pill fs-6 fw-bold btn-red"
              style={{
                height: "auto",
                width: "auto",
              }}
            >
              Family monthly package for 5 days
            </button>
            <button
              className="px-4 border-0 text-white rounded-pill fs-5 fw-bold btn-red"
              style={{
                height: "auto",
                width: "auto",
              }}
            >
              For a personal coach
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Programs;
