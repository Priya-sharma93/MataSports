import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Review.css";
import coachImg from "../../../assets/Images/Coach.png";
import { Link } from "react-router-dom";

const Review = () => {
  const stats = [
    { label: "12+", desc: "Reviews" },
    { label: "1K+", desc: "Happy Athletes" },
    { label: "12+", desc: "Years Experience" },
    { label: "70+", desc: "Win Awards" },
  ];

  return (
    <Container fluid className="review-section">
      <Row className="align-items-center">
        <Col xs={12} lg={4} className="text-center text-lg-start mb-4 mb-lg-0">
          <h1 className="display-title">
            <div>ONLINE</div>
            <div>COACH</div>
            <div>SOLUTION</div>
          </h1>
        </Col>
        <Col xs={12} lg={8}>
          <div className="review-content">
            <Row>
              <Col lg={8} className="position-relative">
                <div className="image-container">
                  <Image
                    src={coachImg}
                    alt="Coach and player"
                    fluid
                    className="coach-image"
                  />
                </div>
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-3 p-2 reviews-action">
                  <p className="text-white fst-italic review-text mb-2 mb-sm-0">
                    Check out our 12 Reviews
                  </p>
                  <Link to="/review">
                    <Button
                      variant="warning"
                      className="view-button"
                      style={{ width: "auto" }}
                    >
                      VIEW
                    </Button>
                  </Link>
                </div>
              </Col>
              <Col lg={4}>
                <Row className="stats-grid">
                  {stats.map((stat, index) => (
                    <Col
                      key={index}
                      xs={6}
                      lg={12}
                      className="text-center text-lg-start mb-3"
                    >
                      <div className="stat-label">{stat.label}</div>
                      <div className="stat-description">{stat.desc}</div>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Review;
