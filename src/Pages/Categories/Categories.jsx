import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Tennis from "../../assets/Images/Tennis.png";
import Football from "../../assets/Images/Football.png";
import Basketball from "../../assets/Images/Basketball.png";
import Yoga from "../../assets/Images/Yoga.png";
import Cricket from "../../assets/Images/Cricket.png";
import Hockey from "../../assets/Images/Hockey.png";
import Boxing from "../../assets/Images/Boxing.png";
import Skating from "../../assets/Images/Skating.png";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import AthHeader from "../AthPage/AthHeader/AthHeader";
import "./Categories.css";
import cookies from "js-cookie";
import config from "../../config";
import blueball1 from "../../assets/Images/Leftcard.png";
import blueball2 from "../../assets/Images/rightcard.png";

function Categories() {
  const [domains, setDomains] = useState([]);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const gamesImages = {
    Tennis,
    Football,
    Basketball,
    Yoga,
    Cricket,
    Hockey,
    Boxing,
    Skating,
  };

  const gamesColors = {
    Tennis: "linear-gradient(180deg, #F9618E, #FFEEF3)",
    Football: "linear-gradient(180deg, #247CE4, #C5DDFA)",
    Basketball: "linear-gradient(180deg, #F8441C, #F9E4E0)",
    Yoga: "linear-gradient(180deg, #D615DB, #FEEAFF)",
    Cricket: "linear-gradient(180deg, #E7F4E3, #F3E0E0)",
    Boxing: "linear-gradient(180deg, #EFD23B, #FCFAF2)",
    Hockey: "linear-gradient(180deg, #1FCBE2, #89DEEA, #EEF6F8)",
    Skating: "linear-gradient(180deg, #DF404A, #D31739, #F5E6EB)",
  };

  const fetchDomains = async () => {
    try {
      setIsLoading(true);
      setError("");
      const token = cookies.get("auth_token");

      const response = await axios.get(`${config.baseURL}/coaches`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const uniqueDomains = [];
      response.data.coaches.forEach((coach) => {
        if (!uniqueDomains.includes(coach.domains)) {
          uniqueDomains.push(coach.domains);
        }
      });
      setDomains(uniqueDomains);
    } catch (err) {
      console.error("Error fetching domains:", err);
      setError("Failed to load games. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      const allServices = await Promise.all(
        domains.map(async (domain) => {
          const response = await axios.get(
            `${config.baseURL}/get_services/${domain}`
          );
          return response.data.services.map((service) => ({
            ...service,
            domain,
          }));
        })
      );
      setServices(allServices.flat());
    } catch (err) {
      console.error("Error fetching services:", err);
      setError("Failed to load services. Please try again.");
    }
  };

  useEffect(() => {
    fetchDomains();
  }, []);

  useEffect(() => {
    if (domains.length > 0) {
      fetchServices();
    }
  }, [domains]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const uniqueServices = [];
  for (let i = 0; i < services.length; i++) {
    if (
      !uniqueServices.some((service) => service.domain === services[i].domain)
    ) {
      uniqueServices.push(services[i]);
    }
  }

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "linear-gradient(90deg, #ed6b0d, #fcbf93)",
      }}
    >
      <AthHeader />
      <img
        src={blueball1}
        alt="Ball Image"
        className="img-fluid position-absolute start-0 bottom-0"
        style={{ height: "auto", width: "55%" }}
      />
      <img
        src={blueball2}
        alt="Ball Image"
        className="img-fluid position-absolute end-0"
        style={{ height: "auto", width: "30%" }}
      />
      <img
        src={blueball2}
        alt="Ball Image"
        className="img-fluid position-absolute bottom-0 end-0"
        style={{
          height: "auto",
          width: "30%",
          transform: "rotate(90deg)",
        }}
      />
      <div className="athlete-section">
        <Container className="popular-con">
          <Row className="g-4">
            {uniqueServices.length === 0 ? (
              <p>No services available at the moment.</p>
            ) : (
              uniqueServices.map((service, index) => (
                <Col key={index} md={3} sm={6} xs={12}>
                  <Card
                    className="sports-card text-center"
                    style={{
                      background: gamesColors[service.domain],
                    }}
                  >
                    <Card.Img
                      src={gamesImages[service.domain]}
                      className="d-block"
                      alt={service.coach_name}
                    />
                    <Link to={`/categories/${service.domain}`}>
                      <Button
                        variant="light"
                        className="spt-btn mt-2 text-capitalize"
                      >
                        {service.domain}
                      </Button>
                    </Link>
                  </Card>
                </Col>
              ))
            )}
          </Row>
          
        </Container>
      </div>
     
    </div>
  );
}

export default Categories;
