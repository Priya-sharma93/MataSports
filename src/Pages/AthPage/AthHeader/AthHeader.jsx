import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaTimes } from "react-icons/fa";
import { CiSettings, CiUser, CiImport } from "react-icons/ci";
import { IoHelpCircleOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import logo2 from "../../../assets/logo2.png";
import i3 from "../../../assets/i3.jpg";
import "./AthHeader.css";
import { useAuthContext } from "../../../context/AuthContext/AuthContext";
import cookies from "js-cookie";
// import config from "../config";
import config from "../../../config";
import { toast } from "react-toastify";
import axios from "axios";

function AthHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef(null);
  const { isLoggedIn, setIsLoggedIn } = useAuthContext();
  const [athleteData, setAthleteData] = useState(null); // State to store athlete data
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    setIsLoggedIn(false);
    cookies.remove("auth_token");
    cookies.remove("isVerified");
    toast.success("Logged out successfully!");
    navigate("/logout");
  };

  // Determine if screen size is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600); // Check if screen width is less than 1000px
    };
    handleResize(); // Run on component mount
    window.addEventListener("resize", handleResize); // Add event listener
    return () => window.removeEventListener("resize", handleResize); // Cleanup listener
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getBackgroundColor = () => {
    if (
      location.pathname.startsWith("/coachsection") ||
      location.pathname.startsWith("/videocall")
    ) {
      return "linear-gradient(90deg, rgb(237, 107, 13), rgb(252, 191, 147))";
    }
    switch (location.pathname) {
      case "/AthPage":
        return "linear-gradient(90deg, #272edfd4 17%, #151979d4 83%)";
      case "/tennis":
        return `linear-gradient(
          269.02deg,
          rgba(233, 19, 83, 0.83) 30.84%,
          rgba(233, 20, 84, 0.83) 50.71%,
          rgba(248, 64, 119, 0.83) 78.74%
        )`;
      case "/football":
        return `linear-gradient(
          269.02deg,
          rgba(21, 25, 121, 0.83) 55.53%,
          rgba(39, 46, 223, 0.83) 78.74%
        )`;
      case "/basketball":
        return `linear-gradient(
          269.02deg,
          rgba(242, 49, 6, 0.83) 14.62%,
          rgba(224, 70, 10, 0.83) 42.81%,
          rgba(226, 68, 10, 0.83) 45.66%,
          rgba(249, 82, 10, 0.83) 78.74%
        )`;
      default:
        return "linear-gradient(90deg, #ed6b0d, #fcbf93)"; // Default background
    }
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
  // Fetch user data dynamically
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


  return (
    <header
      className="header text-black"
      style={{ background: getBackgroundColor() }}
    >
      <div className="container-fluid">
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          {/* Logo Section */}
          <div className="d-flex align-items-center">
            <Link to="/AthPage">
              <img src={logo2} alt="Logo" className="mr-3 logo" />
            </Link>
          </div>

          {/* Navigation or Dropdown (based on screen size) */}
          {!isMobile ? (
            <ul className="nav col-8 col-lg-auto mb-2 mb-lg-0 justify-content-center gap-3">
              <li>
                <Link to="/AthPage" className="nav-link px-2 text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/Categories" className="nav-link px-2 text-white">
                  Category
                </Link>
              </li>
              <li>
                <Link to="/AthBlog" className="nav-link px-2 text-white">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/AthWallet" className="nav-link px-2 text-white">
                  Wallet
                </Link>
              </li>
              <li>
                <Link to="/search" className="nav-link px-2 text-white">
                  <FaSearch />
                </Link>
              </li>
            </ul>
          ) : null}

          {/* Profile Dropdown */}
          <div className="dropdown" ref={dropdownRef}>
            {isLoggedIn && (
              <button
                className="btn text-white border-0 p-0 dropdown-toggle"
                id="dropdownMenuButton"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img
                  src={i3}
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: "40px", height: "40px", objectFit: "cover" }}
                />
              </button>
            )}

            {dropdownOpen && (
              <div
                className="dropdown-menu dropdown-menu-right show"
                style={{
                  position: "absolute",
                  top: "50px",
                  right: "0px",
                  minWidth: "200px",
                  zIndex: "999",
                }}
              >
                <div className="d-flex align-items-center gap-2 px-3 py-2">
                  <img
                    src={i3}
                    alt="profile-icon"
                    className="rounded-circle"
                    style={{
                      width: "35px",
                      height: "35px",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <h6 className="mb-0">{athleteData.name}</h6>
                    <p
                      className="mb-0 text-muted"
                      style={{ fontSize: "0.9rem" }}
                    >
                      {athleteData.email}
                    </p>
                  </div>
                </div>

                <div className="dropdown-divider"></div>

                {isMobile ? (
                  <>
                    <Link className="dropdown-item" to="/AthPage">
                      Home
                    </Link>
                    <Link className="dropdown-item" to="/Categories">
                      Category
                    </Link>
                    <Link className="dropdown-item" to="/AthBlog">
                      Blogs
                    </Link>
                    <Link className="dropdown-item" to="/AthWallet">
                      Wallet
                    </Link>
                    <Link className="dropdown-item" to="/search">
                      Search
                    </Link>
                    <div className="dropdown-divider"></div>
                  </>
                ) : null}

                <Link className="dropdown-item" to="/AthProfile">
                  <CiUser size={16} /> My Profile
                </Link>
                <Link className="dropdown-item" to="/AthPage">
                  <CiImport size={16} /> Downloads
                </Link>
                <Link className="dropdown-item" to="/AthPage">
                  <CiSettings size={16} /> Settings
                </Link>
                <Link className="dropdown-item" to="/AthPage">
                  <IoHelpCircleOutline size={16} /> Help
                </Link>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item cursor-pointer" onClick={logout}>
                  <IoMdLogOut size={16} /> Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default AthHeader;
