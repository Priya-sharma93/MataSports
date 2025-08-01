import React, { useEffect, useState } from "react";
import { Card, Row, Col, Dropdown, Form, InputGroup } from "react-bootstrap";
import blueball1 from "../../assets/Images/Leftcard.png/";
import blueball2 from "../../assets/Images/rightcard.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import ToggleButton from "../CoachSection/ToggelButton";
import axios from "axios";
import config from "../../config";
import AthHeader from "../AthPage/AthHeader/AthHeader";
import cookies from "js-cookie";

const CoachSection = () => {
  const navigate = useNavigate();
  const { sportName } = useParams(); // Get the sport name from the URL
  const [filteredCoaches, setFilteredCoaches] = useState([]);
  const [apiCoaches, setApiCoaches] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedSports, setSelectedSports] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const initiateCall = (coachId) => {
    // Navigate to the VideoCall component and start the call
    window.location.href = `/videocall/${sportName}/${coachId}`;
  };

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const token = cookies.get("auth_token");
        console.log("coach section token: ", token);

        const response = await axios.get(`${config.baseURL}/coaches`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("API Response:", response.data); // Check API response
        const coachesData = response.data.coaches;

        if (Array.isArray(coachesData)) {
          setApiCoaches(coachesData);
          filterCoachesBySport(coachesData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCoaches();
  }, [sportName]); // Re-fetch coaches when sportName changes

  const filterCoachesBySport = (coaches) => {
    console.log("Sport Name:", sportName); // Check the sportName from URL
    const filtered = coaches.filter(
      (coach) => coach.domains.toLowerCase() === sportName.toLowerCase()
    );
    console.log("Filtered Coaches:", filtered); // Log filtered coaches
    setFilteredCoaches(filtered);
  };

  const onHandleSearch = (e) => {
    const input = e.target.value.toLowerCase();
    setSearchInput(input);

    if (input.trim() === "") {
      // If input is empty, reset the filtered coaches to original list
      setFilteredCoaches(apiCoaches);
      return;
    }

    const searchedCoaches = apiCoaches.filter((coach) => {
      const matchesCoachName = coach.coach_name.toLowerCase().includes(input);
      const matchesSport = coach.domains.toLowerCase().includes(input);

      return matchesCoachName || matchesSport;
    });

    setFilteredCoaches(searchedCoaches);
  };

  const handleSaveChanges = () => {
    const filtered = apiCoaches.filter((coach) => {
      const sportMatch =
        selectedSports.length === 0 ||
        selectedSports.some((e) =>
          coach.domains.toLowerCase().includes(e.toLowerCase())
        );

      const languageMatch =
        selectedLanguages.length === 0 ||
        selectedLanguages.some((e) =>
          coach.languages.toLowerCase().includes(e.toLowerCase())
        );

      return sportMatch && languageMatch;
    });

    setFilteredCoaches(filtered);
    setShowDropdown(false);
  };
  const handleSaveData = (e, coach) => {
    e.preventDefault();

    localStorage.setItem("coach_profile", JSON.stringify(coach));
    navigate("/ChatBox");
  }
  return (
    <div
      className="position-relative overflow-hidden "
      style={{
        background: "linear-gradient(90deg, #ed6b0d, #fcbf93)",
        minHeight: "100vh",
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

      {/* Header Section */}
      <div className="mb-4 mt-4" style={{ maxWidth: "100vw" }}>
        <div className="d-flex flex-wrap justify-content-between gap-3 align-items-center px-3">
          <h4 className="text-center text-sm-start ms-3 z-1">
            <Link to="/Categories">
              <span
                className="badge me-1 rounded-3 py-2 px-3 text-capitalize"
                style={{ backgroundColor: "#141CDDAD" }}
              >
                {sportName}
              </span>
            </Link>
            <a
              href="#"
              className="text-white fs-5 text-decoration-none text-capitalize"
            >
              {" > "}Coaching for {sportName}
            </a>
          </h4>
          <div className="d-flex flex-wrap gap-4 mx-5">
            <InputGroup className="w-auto">
              <Form.Control
                value={searchInput}
                onChange={onHandleSearch}
                className="rounded-pill border-0 px-4"
                placeholder="Search coaches or sports here"
                aria-label="Search"
              />
            </InputGroup>
            <Dropdown>
              <Dropdown.Toggle
                variant="none"
                className="px-3 py-2 w-auto rounded-pill border-0 text-black text-muted bg-white"
              >
                Exp: select
              </Dropdown.Toggle>

              <Dropdown.Menu className="p-3">
                <Form>
                  <Form.Check
                    type="radio"
                    id="high-to-low"
                    name="sort"
                    label="High to Low"
                    value="High to Low"
                    onChange={(e) => onHandleSelect(e.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    id="low-to-high"
                    name="sort"
                    label="Low to High"
                    value="Low to High"
                    onChange={(e) => onHandleSelect(e.target.value)}
                  />
                  {/* Experience Range Dropdown */}
                  <div className="mt-4">
                    <label className="d-block">Experience Range</label>
                    <Form.Check
                      type="radio"
                      id="0-10"
                      name="experience"
                      label="0-10 years"
                      onChange={() => onHandleExperience("0-10 years")}
                    />
                    <Form.Check
                      type="radio"
                      id="10-20"
                      name="experience"
                      label="10-20 years"
                      onChange={() => onHandleExperience("10-20 years")}
                    />
                    <Form.Check
                      type="radio"
                      id="20-30"
                      name="experience"
                      label="20-30 years"
                      onChange={() => onHandleExperience("20-30 years")}
                    />
                  </div>
                </Form>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown show={showDropdown} onToggle={setShowDropdown}>
              <Dropdown.Toggle
                variant="none"
                className="px-3 w-auto py-2 rounded-pill border-0 text-black bg-white"
              >
                Filters
              </Dropdown.Toggle>

              <Dropdown.Menu className="p-4 rounded-5">
                <p className="fw-bold fs-5">Select Your Favourite Sports</p>
                <hr />
                <p className="fw-bold">Outdoor Sports</p>
                {/*Outdoor Sports Name */}
                <ToggleButton
                  options={[
                    "Tennis",
                    "Football",
                    "Cricket",
                    "Hockey",
                    "Skating",
                  ]}
                  selectedItems={selectedSports}
                  setSelectedItems={setSelectedSports}
                />
                <p className="fw-bold mt-3">Indoor Sports</p>
                <ToggleButton
                  options={["Basketball", "Yoga", "Boxing"]}
                  selectedItems={selectedSports}
                  setSelectedItems={setSelectedSports}
                />
                <p className="fw-bold mt-3">Select Your Language</p>
                {/* Indoor Sports Name */}
                <ToggleButton
                  options={[
                    "English",
                    "Hindi",
                    "Tamil",
                    "Telugu",
                    "Kannada",
                    "French",
                  ]}
                  selectedItems={selectedLanguages}
                  setSelectedItems={setSelectedLanguages}
                />
                <div className="d-flex justify-content-end mt-5 gap-3">
                  <button
                    className="px-4 py-2 rounded-pill mt border bg-white"
                    onClick={() => {
                      setSelectedSports([]);
                      setSelectedLanguages([]);
                      setFilteredCoaches(apiCoaches);
                      setShowDropdown(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 rounded-pill border text-white custom-save-btn"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </button>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
      {/* Coaches Cards display on screen*/}
      <div>
        <Row
          xs={1}
          sm={1}
          md={2}
          lg={3}
          xl={3}
          className="g-4 mb-4 card-container-width"
        >
          {filteredCoaches.length > 0 ? (
            filteredCoaches.map((coach, index) => (
              <Col key={index} className="d-flex justify-content-center">
                <Card
                  className="rounded-4 border-0 shadow-sm mt-2 overflow-hidden"
                  style={{
                    width: "100%",
                    maxWidth: "18rem",
                    minHeight: "18rem",
                  }}
                >
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <Link to={`/CoachProfile/${coach.id}`}>
                      <div
                        className="d-flex justify-content-center rounded-4 bg-light"
                        style={{ backgroundColor: coach.backgroundColor }}
                        key={coach.id}
                      >
                        {coach.image ? (
                          <img
                            src={coach.image}
                            alt={coach.coach_name}
                            style={{ height: "8rem" }}
                          />
                        ) : (
                          <i
                            className="bi bi-person-circle d-flex align-items-center"
                            style={{
                              fontSize: "3rem",
                              color: "#ccc",
                              height: "8rem",
                            }}
                          ></i>
                        )}
                      </div>
                    </Link>
                    <Card.Title
                      className="ms-4 mb-2 mt-2 fs-6 text-muted fw-bold"
                      style={{ textTransform: "capitalize" }}
                    >
                      {coach.coach_name}
                    </Card.Title>
                    <div>
                      <p
                        className="ms-4 mb-0"
                        style={{
                          fontSize: "0.9rem",
                          textTransform: "capitalize",
                        }}
                      >
                        {coach.domains}
                      </p>
                      <p
                        className="ms-4 mb-0"
                        style={{
                          fontSize: "0.9rem",
                          textTransform: "capitalize",
                        }}
                      >
                        English
                      </p>
                      <p className="ms-4 mb-1" style={{ fontSize: "0.9rem" }}>
                        Exp: {coach.detail_experience}
                      </p>
                      <p className="ms-4 mb-1 custom-link" style={{ fontSize: "0.9rem", textDecoration: "none", color: "inherit" }}>
                        <Link to="/feedback" style={{ textDecoration: "none", color: "inherit" }} s>Ratings :

                          <span style={{ color: "gold", fontSize: "1rem" }}>⭐⭐⭐⭐⭐</span></Link>
                      </p>
                    </div>
                    <div className="d-flex justify-content-around mt-3">
                      <button
                        className="rounded-5 px-3 py-1 fs-6 shadow-sm custom-call-now-btn border-0 fw-bold"
                        onClick={() => initiateCall(coach.id)}
                      >
                        Call Now
                      </button>

                      <Link onClick={(e) => handleSaveData(e, coach)}>
                        <button className="rounded-5 px-3 py-1 fs-6 shadow-sm custom-chat-now-btn border-0 fw-bold">
                          Chat Now
                        </button>
                      </Link>
                      <Link to="/schedule">
                        <button className="rounded-5 px-3 py-1 fs-6 shadow-sm custom-chat-now-btn border-0 fw-bold">
                          Available
                        </button>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <div
              className="position-absolute d-flex justify-content-center h-25 align-items-center"
              style={{ width: "70%" }}
            >
              <h4 className="display-title fw-bold">
                No coaches or sports found
              </h4>
            </div>
          )}
        </Row>
      </div>
    </div>
  );
};

export default CoachSection;
