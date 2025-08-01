import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Hero.css";
import heroLeftImg from "../../../assets/Images/HeroLeft.png";
import heroRightImg from "../../../assets/HeroRight.png";
import leftmanImage from "../../../assets/leftmanImage.png";

const Hero = () => {
  return (
    <Container fluid className="hero-section1 py-4 py-sm-6">
      <Container>
        <Row className="align-items-center mb-4 mb-sm-5">
          <Col xs={12} md={4} className="text-center mb-4 mb-md-0">
            <div className="image-wrapper left-image">
              <Image
                src={heroLeftImg}
                alt="Coach helping an athlete"
                fluid
                className="hero-image"
              />
            </div>
          </Col>

          <Col xs={12} md={4} className="text-center">
            <h1 className="hero-title">
              <span className="text-yellow-200">GROW</span>
              <br />
              <span className="text-white">FASTER</span>
              <br />
              <span className="text-white">WITH A</span>
              <br />
              <span className="text-danger">COACH</span>
            </h1>
          </Col>

          <Col xs={12} md={4} className="text-center">
            <div className="image-wrapper right-image">
              <div className="heroImageDiv">
                <div className="Div2ofImage">
                  <img src={leftmanImage} alt="" className="imagelefthero" />
                </div>
                <Image
                  src={heroRightImg}
                  alt="Athlete training"
                  fluid
                  className="hero-image"
                />
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mb-4 mb-sm-5">
          <Col>
            <p className="hero-description text-center">
              ATA online coaching stands for modern and innovative coaching for
              ambitious sports men and women athletes from global.
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col xs={12} sm="auto" className="mb-3 mb-sm-0 text-center">
            <Link to="/SignUp" className="text-decoration-none">
              <Button
                variant="success"
                className="hero-button"
                style={{ width: "10rem" }}
              >
                Get Started
              </Button>
            </Link>
          </Col>
          <Col xs={12} sm="auto" className="text-center">
            <Link to="/" className="text-decoration-none">
              <Button
                variant="light"
                className="hero-button"
                style={{ width: "10rem" }}
              >
                Learn More
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Hero;
