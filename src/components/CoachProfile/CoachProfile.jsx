import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import i2 from "../../assets/CoachProfileImages/editProfileImg.png";
import i3 from "../../assets/CoachProfileImages/messageImg.png";
import i4 from "../../assets/CoachProfileImages/callImg.png";
import i5 from "../../assets/CoachProfileImages/tennisImg.png";
import i8 from "../../assets/CoachProfileImages/basketballBanner.png";
import { Modal } from "react-bootstrap";
import config from "../../config";
// import CoachEditProfile from "./CoachEditProfile";
import cookies from "js-cookie";

const CoachProfile = () => {
  const { sportName, id } = useParams(); // Get the sport name and id from the URL
  const navigate = useNavigate();
  const [coachData, setCoachData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchCoachData = async () => {
      try {
        const token = cookies.get("auth_token");
        const response = await axios.get(`${config.baseURL}/coaches`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const coach = response.data.coaches.find(
          (coach) => coach.id === parseInt(id)
        );

        if (coach) {
          setCoachData(coach);
        } else {
          setError("Coach not found.");
        }
      } catch (err) {
        console.error("Error fetching coach:", err);
        setError("Failed to load coach profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchCoachData();
  }, [id]);

  const handleBack = () => {
    console.log("sportname: ", sportName);
    navigate(-1);
  };

  // const handleOpen = () => setOpen(true);
  // const onHandleClose = () => setOpen(false);

  const onHandleProfileUpdate = (updateCoach) => {
    setCoachData(updateCoach);
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="" style={{ minHeight: "40vh" }}>
        <button
          className="position-absolute z-1 back-arrow-button border-0 rounded-circle fw-bold fs-5"
          style={{ height: "3.3rem", width: "3.3rem", top: "20%", left: "5%" }}
          onClick={handleBack}
        >
          {"<"}
        </button>
        {/* Banner Section */}
        <div className="position-relative text-center">
          <img
            src={i8}
            alt="Basketball Banner"
            className="img-fluid object-fit-cover"
            style={{ height: "15rem", width: "100%" }}
          />
          <div
            className="position-absolute border-0 bg-light rounded-circle"
            style={{
              bottom: "-5rem",
              left: "50%",
              transform: "translateX(-50%)",
              width: "10rem",
              height: "10rem",
            }}
          >
            {coachData.image ? (
              <img
                src={coachData.image}
                alt={coachData.coach_name}
                className="w-100 h-100 object-fit-cover rounded-circle"
              />
            ) : (
              <i
                className="bi bi-person-circle d-flex align-items-center justify-content-center w-100 h-100 object-fit-cover rounded-circle"
                style={{
                  fontSize: "4rem",
                  color: "#ccc",
                  height: "8rem",
                }}
              ></i>
            )}
          </div>
        </div>

        {/* Edit profile section */}
        {/* <div
          className="text-center d-flex justify-content-center mt-5"
          style={{ minHeight: "20vh" }}
        >
          <p
            className="d-flex align-items-center justify-content-center w-auto fw-bold"
            style={{ cursor: "pointer" }}
            onClick={handleOpen}
          >
            <img
              src={i2}
              alt="Edit Icon"
              className="me-2"
              style={{ width: "20px" }}
            />
            Edit Your Profile
          </p>
        </div> */}
      </div>

      {/* Edit your profile modal */}
      {/* <Modal open={open} onClose={onHandleClose}>
        <div
          className="bg-white shadow p-5 h-100 border-0"
          style={{
            margin: "6rem auto",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <h2 className="mb-4 fs-4 fw-bold">Edit Your Profile</h2>

          <CoachEditProfile
            coachData={coachData}
            onProfileUpdate={onHandleProfileUpdate}
            onHandleClose={onHandleClose}
          />
        </div>
      </Modal> */}

      <div
        className="d-flex flex-wrap flex-lg-row flex-column justify-content-lg-center gap-3 p-3"
        style={{ marginTop: "3rem" }}
      >
        {/* Profile and contact information section */}
        <div
          className="shadow border w-auto d-flex rounded-5 p-4 justify-content-around overflow-hidden"
          style={{ minWidth: "45%", minHeight: "14rem" }}
        >
          <div className="pt-3">
            <strong className="fs-5">{coachData.coach_name}</strong>
            <p className="fw-semibold text-muted mb-0 mt-2 coach-text-size">
              {coachData.domains} Coach
            </p>
            <p className="fw-semibold text-muted coach-text-size">
              {coachData.gender && coachData.age
                ? `${coachData.gender},${coachData.age}`
                : "women, 26"}
            </p>
            <button className="message-btn border-0 px-1 py-1 fs-6 w-100 rounded-3 fw-medium">
              Messages
            </button>
          </div>
          <div className="pt-3">
            <strong className="fs-6">Contact information</strong>
            <div className="d-flex align-items-center mt-2">
              <img
                src={i3}
                alt="Message icon"
                className="me-3"
                style={{ height: "2rem", width: "2rem" }}
              />
              <span className="fw-bold text-muted coach-text-size">
                {coachData.email}
              </span>
            </div>
            <div className="d-flex align-items-center mt-2">
              <img
                src={i4}
                alt="Call icon"
                className="me-3"
                style={{ height: "2rem", width: "2rem" }}
              />
              <span className="fw-bold text-muted coach-text-size">
                {coachData.coach_phone}
              </span>
            </div>
          </div>
        </div>
        {/* About me section */}
        <div
          className="shadow border rounded-5 p-4  overflow-hidden about-me-coach-profile"
          style={{ minHeight: "14rem", minWidth: "45%" }}
        >
          <strong className="fs-4">About Me</strong>
          <h6
            className="text-muted mt-4 px-4"
            style={{ wordSpacing: "2px", lineHeight: "1rem" }}
          >
            {coachData.detail_experience}
          </h6>
        </div>
        {/* Teams section */}
        <div
          className="shadow border w-auto rounded-5 p-3"
          style={{ minWidth: "20%", height: "14rem" }}
        >
          <p className="fs-5 fw-bold mt-2 px-3 text-center text-lg-start">
            Teams
          </p>
          <div className="d-flex justify-content-center">
            <img
              src={i5}
              alt="Tennis Image"
              className="object-fit-cover"
              style={{ width: "auto", height: "auto" }}
            />
          </div>
        </div>
        {/* Skills sections */}
        <div
          className="shadow border w-auto p-3 rounded-5"
          style={{ minWidth: "20%", height: "14rem" }}
        >
          <p className="fs-5 fw-bold px-3 text-center text-lg-start">Skills</p>
          <div className="d-flex flex-column ms-5 w-auto mt-1 overflow-hidden">
            <p className="text-muted fw-bold mb-1 mt-1 fs-6">
              {coachData.domains}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachProfile;
