import i1 from "../../assets/CoachProfileImages/coach6.png";
import i2 from "../../assets/CoachProfileImages/editProfileImg.png";
import i3 from "../../assets/CoachProfileImages/messageImg.png";
import i4 from "../../assets/CoachProfileImages/callImg.png";
import i8 from "../../assets/CoachProfileImages/basketballBanner.png";
import "../CoachProfile/CoachProfile.css";
import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import AthleteEditProfile from "./AthleteEditProfile";
import { useNavigate } from "react-router-dom";
import AthHeader from "../../Pages/AthPage/AthHeader/AthHeader";
import axios from "axios";
import cookies from "js-cookie";
import config from "../../config";
import { toast } from "react-toastify";

const AthProfile = () => {
  const [open, setOpen] = useState(false);
  const [athleteData, setAthleteData] = useState(null); // State to store athlete data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const handleOpen = () => setOpen(true);
  const onHandleClose = () => setOpen(false);
  const navigate = useNavigate();

  const onHandleNavigate = () => {
    navigate(-1);
  };

  // Function to decode JWT token manually
  const decodeToken = (token) => {
    try {
      const base64Url = token.split(".")[1]; // Get the payload part of the token
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decodedData = JSON.parse(atob(base64)); // Decode Base64 to JSON
      return decodedData;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  // Fetch athlete data dynamically
  useEffect(() => {
    const fetchAthleteData = async () => {
      const token = cookies.get("auth_token"); // Get token from cookies

      if (!token) {
        toast.error("Authentication token not found!");
        return;
      }

      try {
        // Decode the token to extract athlete ID
        const decodedToken = decodeToken(token);
        if (!decodedToken) {
          toast.error("Failed to decode token!");
          return;
        }

        const athleteId = decodedToken.id; // Extract athlete ID
        console.log("id: ", athleteId);

        if (!athleteId) {
          toast.error("Athlete ID not found in the token!");
          return;
        }

        // Fetch athlete profile from the backend
        const profileResponse = await axios.get(
          `${config.baseURL}/atheleteprofile/${athleteId}`,
          {
            headers: { Authorization: `Bearer ${token}` }, // Include token in the request
          }
        );

        if (profileResponse.status === 200) {
          setAthleteData(profileResponse.data.athlete); // Save athlete data in state
        } else {
          toast.error("Failed to fetch athlete profile!");
        }
      } catch (error) {
        console.error("Error fetching athlete data:", error);
        toast.error("An error occurred while fetching athlete data.");
      } finally {
        setIsLoading(false); // Stop loading spinner
      }
    };

    fetchAthleteData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading spinner
  }

  if (!athleteData) {
    return <div>Athlete profile not found!</div>; // Show error if athlete data is not found
  }

  return (
    <div>
      <AthHeader />
      <div className="" style={{ minHeight: "40vh" }}>
        <button
          className="position-absolute z-1 bg-primary border-0 rounded-circle text-white fw-bold"
          style={{ height: "3rem", width: "3rem", top: "20%", left: "5%" }}
          onClick={onHandleNavigate}
        >
          {"<"}
        </button>
        {/* Banner Section */}
        <div className="position-relative text-center">
          <img
            src={i8} // Use dynamic banner image or fallback
            alt="Basketball Banner"
            className="img-fluid object-fit-cover"
            style={{ height: "15rem", width: "100%" }}
          />
          <div
            className="position-absolute border-0 rounded-circle"
            style={{
              bottom: "-5rem",
              left: "50%",
              transform: "translateX(-50%)",
              width: "10rem",
              height: "10rem",
              backgroundColor: "#faf7f7",
            }}
          >
            {athleteData.image ? (
              <img
                src={athleteData.image}
                alt={athleteData?.name}
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

        {/* Edit Profile Section */}
        <div
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
        </div>
      </div>
      <Modal open={open} onClose={onHandleClose}>
        <div
          className="bg-white shadow p-5 w-75 border-0"
          style={{
            margin: "6rem auto",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <h2 className="mb-4 fs-4 fw-bold">Edit Your Profile</h2>

          <AthleteEditProfile
            athleteData={athleteData}
            onHandleClose={onHandleClose}
          />
        </div>
      </Modal>
      <div className="d-flex flex-wrap flex-lg-row flex-column justify-content-lg-center gap-3">
        {/* Profile and contact information section */}
        <div
          className="shadow border w-auto d-flex rounded-5 p-4 justify-content-around overflow-hidden"
          style={{ minWidth: "45%", minHeight: "14rem" }}
        >
          <div className="pt-3">
            <strong className="fs-5 text-capitalize ">
              {athleteData.name}
            </strong>
            <p className="fw-semibold text-muted coach-text-size">
              {athleteData.gender}, {athleteData.age}
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
                {athleteData.email}
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
                {athleteData.phone}
              </span>
            </div>
          </div>
        </div>
        {/* About me section */}
        <div
          className="shadow border rounded-5 p-4 overflow-hidden about-me-coach-profile"
          style={{ minHeight: "14rem", minWidth: "45%" }}
        >
          <strong className="fs-5">About Me</strong>
          <h6 className="fw-bold mt-2 coach-text-size">
            {athleteData.detail_health}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default AthProfile;
