import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Components/footer.jsx";
import "../index.css";
import YogaHeader from "../Components/header.jsx";

const Homepage = () => {
  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <YogaHeader />
      <div
        className="d-flex flex-column align-items-center justify-content-center text-center"
        style={{
          gap: "20px",
          flexGrow: 1,
          minHeight: "50vh",
          paddingTop: "10rem",
          backgroundColor: "#ddebea",
        }}
      >
        <h2
          className="fw-bold mb-3"
          style={{
            fontSize: "60px",
            color: "#0C646F",
            fontFamily: "sofia-pro, sans-serif",
          }}
        >
          Your online yoga studio
        </h2>
        <p
          className="fs-2 mb-4 opacity-50"
          style={{
            color: "#0C646F",
            fontFamily: "sofia-pro, sans-serif",
          }}
        >
          Over 5,000 yoga and meditation classes and guided programs.
        </p>
        <button
          className="fw-bold text-white border-0 btn-red"
          style={{
            borderRadius: "50px",
            padding: "0px 60px",
            height: "60px",
            fontSize: "15px",
            marginBottom: "30px",
          }}
        >
          Try us free for 14 days
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
