import React from "react";
import "./About.css";
import AboutImage from "../../../assets/Images/AboutImg.png";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="about-section bg-dark text-white py-4 py-sm-5 py-lg-8">
      <div className="container">
        <h2 className="mb-4 fw-bold">ABOUT</h2>

        <div className="about-description mb-5">
          <p className="mb-3">
            Athlete academy is a training and coaching platform that offers live
            action courses to help enhance retention and learning in student
            athletes. We are a sportech platform empowering professional
            athletes and coaches with global connections, remote coaching, and
            consulting opportunities. Our mission is to save time, enhance
            performance, and provide secure, rewarding experiences through
            digital innovation and seamless accessibility. The athletes academy
            got its starts when mike and kelsey stuart realized that their four
            boys,each in year-arounds sports, struggled to keep up with the
            grueling training routines and managing the traditional schedule.
          </p>
        </div>

        <div className="row align-items-center">
          <div className="col-12 col-lg-6 order-2 order-lg-1">
            <img
              src={AboutImage}
              alt="Athlete in red"
              className="img-fluid rounded service-platform-image"
            />
          </div>
          <div className="col-12 col-lg-6 order-1 order-lg-2 mb-4 mb-lg-0 all-step">
            <h2 className="platform-title fw-bold mb-4">
              Key Advantages of Our Sportech Platform
            </h2>
            <div className="platform-steps">
              <div className="platform-step d-flex align-items-start">
                <div className="step-number bg-white text-dark rounded-circle d-flex align-items-center justify-content-center me-3">
                  1
                </div>
                <div>
                  <h3 className="fw-bold">Global Coaching Access:</h3>
                  <p className="text-white-50">
                    Connect with top coaches and consultants from anywhere.
                  </p>
                </div>
              </div>
              <div className="platform-step d-flex align-items-start">
                <div className="step-number bg-white text-dark rounded-circle d-flex align-items-center justify-content-center me-3">
                  2
                </div>
                <div>
                  <h3 className="fw-bold">Time & Money Saving:</h3>
                  <p className="text-white-50">
                    Save on travel costs and access affordable remote sessions.
                  </p>
                </div>
              </div>
              <div className="platform-step d-flex align-items-start">
                <div className="step-number bg-white text-dark rounded-circle d-flex align-items-center justify-content-center me-3">
                  3
                </div>
                <div>
                  <h3 className="fw-bold mb-2">Income Opportunities:</h3>
                  <p className="text-white-50">
                    Coaches can expand their client base and boost earnings.
                  </p>
                </div>
              </div>
              <div className="platform-step d-flex align-items-start">
                <div className="step-number bg-white text-dark rounded-circle d-flex align-items-center justify-content-center me-3">
                  4
                </div>
                <div>
                  <h3 className="fw-bold mb-2">Digital Records:</h3>
                  <p className="text-white-50">
                    Securely store and access your progress and session history
                    anytime.
                  </p>
                </div>
              </div>
              <div className="platform-step d-flex align-items-start">
                <div className="step-number bg-white text-dark rounded-circle d-flex align-items-center justify-content-center me-3">
                  5
                </div>
                <div>
                  <h3 className="fw-bold mb-2">Enhanced Performance: </h3>
                  <p className="text-white-50">
                    Improve skills and increase your chances of winning.
                  </p>
                </div>
              </div>
              <div className="platform-step d-flex align-items-start">
                <div className="step-number bg-white text-dark rounded-circle d-flex align-items-center justify-content-center me-3">
                  6
                </div>
                <div>
                  <h3 className="fw-bold mb-2">Recognition & Rewards:</h3>
                  <p className="text-white-50">
                    Earn the "Performer Coach of the Month" title and Vertula
                    Trophies.
                  </p>
                </div>
              </div>
              <div className="platform-step d-flex align-items-start">
                <div className="step-number bg-white text-dark rounded-circle d-flex align-items-center justify-content-center me-3">
                  7
                </div>
                <div>
                  <h3 className="fw-bold mb-2">Secure Payments:</h3>
                  <p className="text-white-50">
                    Reliable and safe payment methods for peace of mind.
                  </p>
                </div>
              </div>
              <div className="platform-step d-flex align-items-start">
                <div className="step-number bg-white text-dark rounded-circle d-flex align-items-center justify-content-center me-3">
                  8
                </div>
                <div>
                  <h3 className="fw-bold mb-2">Seamless Enrollment:</h3>
                  <p className="text-white-50">
                    Quick and easy registration process. Empower your journey
                    with convenience and innovation!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          {/* <h4>Upcoming services</h4> */}
          <div className="yogabannerdiv">
            <Link to="/homepage">
              {" "}
              <h4 className="yogabannerheading">Upcoming services </h4>
            </Link>
            <img
              className="yogaimgwidth"
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHlvZ2F8ZW58MHx8MHx8fDA%3D"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
