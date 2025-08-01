import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

const YogaHeader = () => {
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu((prev) => !prev);
  };

  return (
    <header
      className="position-fixed w-100 d-flex align-items-center px-4"
      style={{
        backgroundColor: "#DDEBEA",
        height: "8rem",
        zIndex: "10",
      }}
    >
      <div>
        <Link
          to="/homepage"
          className="text-decoration-none fw-bold fs-3 color-darkblue"
        >
          ATA Yoga
        </Link>
      </div>

      <nav className="d-none d-lg-flex flex-grow-1 justify-content-center">
        <ul className="d-flex list-unstyled m-0" style={{ gap: "40px" }}>
          <li>
            <Link
              to="/classes"
              className="fw-bold text-decoration-none fs-5 color-darkblue"
            >
              Classes
            </Link>
          </li>
          <li>
            <Link
              to="/programs"
              className="fw-bold text-decoration-none fs-5 color-darkblue"
            >
              Programs
            </Link>
          </li>
          <li>
            <Link
              to="/teachers"
              className="fw-bold text-decoration-none fs-5 color-darkblue"
            >
              Teachers
            </Link>
          </li>
          <li>
            <Link
              to="/articles"
              className="fw-bold text-decoration-none fs-5 color-darkblue"
            >
              Articles
            </Link>
          </li>
          <li>
            <Link
              to="/resources"
              className="fw-bold text-decoration-none fs-5 color-darkblue"
            >
              Resources
            </Link>
          </li>
          <li>
            <Link
              to="/academy"
              className="fw-bold text-decoration-none fs-5 color-darkblue"
            >
              Academy
            </Link>
          </li>
        </ul>
      </nav>

      <div className="d-none d-lg-block">
        <button
          className="rounded-pill fw-bold text-white z-2 btn-red border-0 me-4"
          style={{
            padding: "0.7rem 1.4rem",
          }}
        >
          Start Free Trial
        </button>
        <Link to="/yogasigninpage">
          <button className="btn-sign-in">Sign In</button>
        </Link>
      </div>

      <button
        className="d-lg-none border-0 bg-transparent fs-1"
        style={{ position: "absolute", right: "10%" }}
        onClick={toggleMenu}
      >
        ☰
      </button>

      {menu && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-white d-flex flex-column align-items-center justify-content-center"
          style={{ zIndex: "20" }}
        >
          <button
            className="position-absolute border-0 bg-transparent fs-1 "
            style={{ top: "15%" }}
            onClick={toggleMenu}
          >
            ✕
          </button>
          <ul className="list-unstyled text-center">
            <li className="my-3">
              <Link
                to=""
                className=" fw-bold text-decoration-none fs-1 color-darkblue"
                onClick={toggleMenu}
              >
                Classes
              </Link>
            </li>
            <li className="my-3">
              <Link
                to="/programs"
                className="fw-bold text-decoration-none fs-1 color-darkblue"
                onClick={toggleMenu}
              >
                Programs
              </Link>
            </li>
            <li className="my-3">
              <Link
                to="/teachers"
                className="fw-bold text-decoration-none fs-1 color-darkblue"
                onClick={toggleMenu}
              >
                Teachers
              </Link>
            </li>
            <li className="my-3">
              <Link
                to=""
                className="fw-bold text-decoration-none fs-1 color-darkblue"
                onClick={toggleMenu}
              >
                Articles
              </Link>
            </li>
            <li className="my-3">
              <Link
                to=""
                className="fw-bold text-decoration-none fs-1 color-darkblue"
                onClick={toggleMenu}
              >
                Resources
              </Link>
            </li>
            <li className="my-3">
              <Link
                to=""
                className="fw-bold text-decoration-none fs-1 color-darkblue"
                onClick={toggleMenu}
              >
                Academy
              </Link>
            </li>
          </ul>

          {/* <div className="mt-4">
            <div onClick={toggleMenu}>
              <button className="color-darkblue border-0 bg-white fw-bold my-3">
                Sign In
              </button>
            </div>
          </div> */}

          <div className="mt-5 w-75">
            <button
              className="rounded-pill w-100 btn-red text-white border-0 fw-bold"
              style={{ height: "5rem" }}
            >
              Try 14 days for free
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default YogaHeader;
