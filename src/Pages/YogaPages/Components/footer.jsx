import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

const Footer = () => {
  return (
    <footer className="py-5" style={{ backgroundColor: "#F4F4F4" }}>
      <div className="container mb-5">
        <div className="row py-2">
          {/* 1st Section */}
          <div className="col-6 col-md-2">
            <h5 className="fw-bold py-3 fs-4 color-muted-black">Play</h5>
            <ul className="list-unstyled">
              <li className="mb-3">
                <a
                  href="#"
                  style={{ color: "#a9aaa9" }}
                  className="color-muted-gray"
                >
                  Try 14 days for free
                </a>
              </li>
              <li className="mb-3">
                <a
                  href="#"
                  style={{ color: "#a9aaa9" }}
                  className="color-muted-gray"
                >
                  Classes
                </a>
              </li>
              <li className="mb-3">
                <a
                  href="/programs"
                  style={{ color: "#a9aaa9" }}
                  className="color-muted-gray"
                >
                  Programs
                </a>
              </li>
              <li className="mb-3">
                <a
                  href="#"
                  // style={{ color: "#a9aaa9" }}
                  className="color-muted-gray"
                >
                  Playlists
                </a>
              </li>
            </ul>
          </div>
          {/* 2nd Section */}
          <div className="col-6 col-md-2">
            <h5 className="fw-bold py-3 color-muted-black">Pause</h5>
            <ul className="list-unstyled">
              <li className="mb-3">
                <a
                  href="#"
                  style={{ color: "#a9aaa9" }}
                  className="color-muted-gray"
                >
                  Articles
                </a>
              </li>
              <li className="mb-3">
                <a
                  href="#"
                  style={{ color: "#a9aaa9" }}
                  className="color-muted-gray"
                >
                  Resources
                </a>
              </li>
            </ul>
          </div>
          {/* 3rd Section */}
          <div className="col-6 col-md-2">
            <h5 className="fw-bold py-3 color-muted-black">Connect</h5>
            <ul className="list-unstyled">
              <li className="mb-3">
                <a
                  href="#"
                  style={{ color: "#a9aaa9" }}
                  className="color-muted-gray"
                >
                  Newsletter signup
                </a>
              </li>
              <li className="mb-3">
                <a
                  href="#"
                  style={{ color: "#a9aaa9" }}
                  className="color-muted-gray"
                >
                  Teachers
                </a>
              </li>
              <li className="mb-3">
                <a
                  href="#"
                  style={{ color: "#a9aaa9" }}
                  className="color-muted-gray"
                >
                  Workshops
                </a>
              </li>
              <li className="mb-3">
                <a
                  href="#"
                  style={{ color: "#a9aaa9" }}
                  className="color-muted-gray"
                >
                  Academy
                </a>
              </li>
            </ul>
          </div>
          {/* 4th Section */}
          <div className="col-6 col-md-2">
            <h5 className="fw-bold py-3 color-muted-black">Support</h5>
            <ul className="list-unstyled">
              <li className="mb-3">
                <a
                  href="#"
                  style={{ color: "#a9aaa9" }}
                  className="color-muted-gray"
                >
                  Give the gift of yoga
                </a>
              </li>
              <li className="mb-3">
                <a
                  href="#"
                  style={{ color: "#a9aaa9" }}
                  className="color-muted-gray"
                >
                  Redeem gift card
                </a>
              </li>
              <li className="mb-3">
                <a
                  href="#"
                  style={{ color: "#a9aaa9" }}
                  className="color-muted-gray"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          {/* 5th Section */}
          <div className="col-6 col-md-2">
            <h5 className="fw-bold py-3 color-muted-black">About</h5>
            <ul className="list-unstyled">
              <li className="mb-3">
                <a
                  href="#"
                  style={{ color: "#a9aaa9" }}
                  className="color-muted-gray"
                >
                  FAQ
                </a>
              </li>
              <li className="mb-3">
                <a
                  href="#"
                  style={{ color: "#a9aaa9" }}
                  className="color-muted-gray"
                >
                  Terms and conditions
                </a>
              </li>
            </ul>
          </div>
          {/* 6th Section */}
          <div className="col-6 col-md-2">
            <h5 className="fw-bold py-3 color-muted-black">Apps</h5>
            <ul className="list-unstyled">
              <li className="mb-3">
                <a
                  href="#"
                  style={{ color: "#a9aaa9" }}
                  className="color-muted-gray"
                >
                  iOS
                </a>
              </li>
              <li className="mb-3 ">
                <a
                  href="#"
                  style={{ color: "#a9aaa9" }}
                  className="color-muted-gray"
                >
                  Android
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className="pt-4 font-family-sofia-pro fw-bold border-top"
        style={{ color: "#a9aaa9", fontSize: "80%" }}
      >
        <p className="pt-4 mt-3" style={{ marginLeft: "15%" }}>
          © 2024 Ekhart Yoga. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
