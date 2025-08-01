import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./CoachUpdatePage.css";
import backwardArrow from "../../assets/backwardArrow.svg";
import reviwer from "../../assets/Review-ratingImg/reviewer.png";
import tennis from "../../assets/tennis-icon.svg";
import { FaPhoneAlt } from "react-icons/fa";
import cookies from "js-cookie";
import config from "../../config";
import { toast } from "react-toastify";


const CoachUpdatePage = (props) => {
  const navigate = useNavigate();
  const { coachId } = useParams();
  const fileInputRef = useRef(null);
  const profileImageRef = useRef(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [coachData, setCoachData] = useState("");

  // Main states
  const [fullname, setFullName] = useState("");
  const [domain, setDomain] = useState("");
  const [coach_languages, setLanguage] = useState("");
  const [coach_age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  console.log("domain: ", domain);

  // Temporary states
  const [tempFullname, setTempFullname] = useState("");
  const [tempDomain, setTempDomain] = useState("");
  console.log("tempdomain: ", tempDomain);
  const [tempCoachLanguages, setTempCoachLanguages] = useState("");
  const [tempCoachAge, setTempCoachAge] = useState("");
  const [tempGender, setTempGender] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [tempCoachrate, settempCoachrate] = useState();

  const [imageId, setImageId] = useState(null);


  const fetchProfileImage = async (coachId) => {
    const token = cookies.get("auth_token");

    try {
      const response = await axios.get(
        `${config.baseURL}/get_image/${coachId}`,
        {
          responseType: "blob",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const imageUrl = URL.createObjectURL(response.data);
      setProfileImage(imageUrl);
    } catch (error) {
      console.error("Error fetching profile image:", error);
      setProfileImage(reviwer); // Fallback to default image
    }
  };
  console.log(coachId)

  const handleProfile = () => {
    setTempFullname(fullname);
    setTempDomain(domain);
    setTempCoachLanguages(coach_languages);
    setTempCoachAge(coach_age);
    setTempGender(gender);
    setTempEmail(email);
    setShowUpdateModal(true);
    settempCoachrate(rate);
  };

  // const handleCancel = () => {
  //   setShowHiddenDivs(false);
  // };

  const handleUpdateCoach = async (e) => {
    e.preventDefault();

    setFullName(tempFullname);
    setDomain(tempDomain);
    setLanguage(tempCoachLanguages);
    setAge(tempCoachAge);
    setGender(tempGender);
    setEmail(tempEmail);

    const body = {
      coach_name: tempFullname,
      coach_phone: coachData?.coach_phone || "",
      coach_dob: coachData?.coach_dob || "",
      coach_address: coachData?.coach_address || "",
      email: tempEmail,
      domains: tempDomain,
      detail_experience: coachData?.detail_experience || "",
      coach_languages: tempCoachLanguages,
      coach_age: tempCoachAge,
      gender: tempGender,
      image_id: imageId,
    };

    try {
      const response = await axios.put(
        `${config.baseURL}/coach/update`,
        body,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        toast.success("Profile updated successfully");
        setShowUpdateModal(false);
      }
    } catch (error) {
      console.error("Error during update:", error.message);
      toast.error("Profile update failed");
    }
  };

  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    const fetchCoachData = async () => {
      const token = cookies.get("auth_token");

      try {
        const response = await fetch(`${config.baseURL}/coach/${coachId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setCoachData(data.coach);
          setFullName(data.coach.coach_name);
          setDomain(data.coach.domains);
          setLanguage(data.coach.coach_languages);
          setAge(data.coach.coach_age);
          setGender(data.coach.gender);
          setEmail(data.coach.email);

          // If coach has an image_id, fetch the image
          if (data.coach.image_id) {
            setImageId(data.coach.image_id);
            await fetchProfileImage(data.coach.image_id);
          }
        } else {
          console.error("Failed to fetch coach data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching coach data:", error);
      }
    };

    fetchCoachData();
  }, [coachId]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(
          `${config.baseURL}/upload_image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data && response.data.image_id) {
          setImageId(response.data.image_id);
          // Fetch and display the newly uploaded image
          await fetchProfileImage(response.data.image_id);
          toast.success("Profile image updated successfully");
        }
      } catch (error) {
        console.error("Image upload failed:", error);
        toast.error("Failed to upload profile image");
      }
    }
  };

  // const handleFileUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const newFile = {
  //       name: file.name.toUpperCase(),
  //       size: `${Math.round(file.size / (1024 * 1024))} MB`,
  //     };
  //     setUploadedFiles([...uploadedFiles, newFile]);
  //   }
  // };
  const handleFileUpload = async () => {
  if (!file) {
    setMessage("Please select a file first!");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  const token = cookies.get("auth_token"); // Assuming token is stored in cookies

  try {
    const response = await axios.post(
      "https://sports-backend-x6w5.onrender.com/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data && response.data.success) {
      setMessage("File uploaded successfully!");
    } else {
      setMessage("Upload failed. Please try again.");
    }
  } catch (error) {
    console.error("Upload failed:", error);

    if (error.response) {
      setMessage(`Error: ${error.response.data.message || "Upload failed"}`);
    } else {
      setMessage("Network error or server not responding.");
    }
  }
};


  return (
    <div className="bg-dark min-vh-100 text-white p-4">
      {/* Header */}

      <div className="px-5 d-flex flex-column flex-sm-row align-items-center gap-3">
        <span>
          <img
            src={backwardArrow}
            alt="Back Arrow"
            className=" cursor-pointer"
            onClick={() => navigate(-1)}
          />{" "}
          {/* Back arrow */}
          <button className=" font-family-Roboto btn rounded-pill fw-semibold fs-5 lh-sm px-3 btn-bg w-auto ms-3">
            coach profile
          </button>
        </span>
      </div>
      <div className="row mt-4">
        {/* Profile Info */}
        <div className="col-md-7">
          <div>
            <div className="d-flex flex-wrap gap-3 rounded">
              <div className="position-relative">
                <img
                  src={profileImage || reviwer}
                  alt="Profile"
                  className="profileImageU"
                  onClick={() => profileImageRef.current.click()}
                  style={{ cursor: "pointer" }}
                />
                <input
                  type="file"
                  ref={profileImageRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="d-none"
                />
                <div
                  className="position-absolute bottom-0 right-0 p-2 bg-info rounded-circle"
                  style={{ cursor: "pointer" }}
                  onClick={() => profileImageRef.current.click()}
                >
                  <i className="fas fa-camera"></i>
                </div>
              </div>

              <div>
                <button
                  className="btn btn-info w-100 mb-3"
                  // onClick={() => setShowUpdateModal(true)}
                  onClick={handleProfile}
                >
                  UPDATE PROFILE
                </button>
                <div className="rounded-4 bg-white text-black p-3">
                  {/* Profile name */}
                  <h5 className="fw-bold fs-2 text-capitalize">
                    {fullname}
                  </h5>{" "}
                  {/* Age and gender */}
                  <p className="mb-0 fw-semibold fs-5">
                    {coach_age} Years, {gender}
                  </p>
                  <div className="d-flex align-items-center gap-2 my-2">
                    <p className="mb-0 fw-semibold fs-5">
                      Teams:
                      <span className="lang-color ms-2">{domain}</span>
                    </p>
                    {/* <img src={tennis} alt="Tennis" /> 
                    <i className="fa-solid fa-futbol"></i>{" "} */}
                    {/* Another team icon */}
                  </div>
                  <p className="fw-semibold fs-5">
                    Language:
                    <span className="lang-color ms-2">{coach_languages}</span>
                    {/* Language information */}
                  </p>
                  <p className="fw-semibold fs-5">Rate: </p>
                  <div className="d-flex align-items-center gap-3 my-2 t-color">
                    <FaPhoneAlt /> {/* Phone icon */}
                    <p className="m-0 p-0">{coachData?.coach_phone}</p>{" "}
                    {/* Phone number */}
                  </div>
                  <div className="d-flex align-items-center gap-3 my-2 mt-4 t-color">
                    <i className="fa-regular fa-envelope"></i>{" "}
                    {/* Email icon */}
                    <p className="m-0 p-0">{coachData?.email}</p>{" "}
                    {/* Email address */}
                  </div>
                </div>
                <div className="d-flex gap-2 m-3">
              <Link to="/review"><button className="px-2 threebutton">Ratings</button></Link>
              <Link to="/CoachSchedule" state={{coachId:coachId}}><button className="px-2 threebutton">Schedule</button></Link>
                  <button className="px-2 threebutton">Transaction</button>
                </div>
              </div>
            </div>
          </div>
          {/* About Section */}
          <div className="row mt-4">
            <div className="col-12">
              <h3>About Me</h3>
              <p>{coachData?.detail_experience}</p>
            </div>
          </div>
        </div>

        {/* File Upload */}
        <div className="col-md-5">
          <div className="card bg-white text-dark p-3 filediv">
            <div className="cloudimgDiv">
              <div className="upload-cloud-icon mb-3 ">
                <i className="fas fa-cloud-upload-alt fa-3x text-info"></i>
              </div>
              <h4>DRAG & DROP</h4>
              <button
                className="btn btn-outline-dark w-100"
                onClick={() => fileInputRef.current.click()}
              >
                BROWSE
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="d-none"
              />
            </div>

            <h5>UPLOADED FILES</h5>
            {uploadedFiles?.map((file, index) => (
              <div
                key={index}
                className="d-flex justify-content-between align-items-center border p-2 mb-2"
              >
                <div>
                  <i className="far fa-file me-2"></i>
                  {file.name} - {file.size}
                </div>
                <button
                  className="btn btn-link text-danger"
                  onClick={() => {
                    const newFiles = uploadedFiles.filter(
                      (_, i) => i !== index
                    );
                    setUploadedFiles(newFiles);
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-dark">Update information</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowUpdateModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row g-3">
                    {/* Coach name */}
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your first name"
                        value={tempFullname}
                        onChange={(e) => setTempFullname(e.target.value)}
                      />
                    </div>
                    {/* coach domain */}
                    <div className="col-12">
                      <select
                        className="form-select"
                        value={tempDomain || ""}
                        onChange={(e) => setTempDomain(e.target.value)}
                      >
                        <option value="">Choose your Domain</option>
                        <option value="Cricket">Cricket</option>
                        <option value="Football">Football</option>
                        <option value="Basketball">Basketball</option>
                        <option value="Badminton">Badminton</option>
                      </select>
                    </div>
                    {/* coach language */}
                    <div className="col-12">
                      <select
                        className="form-select"
                        value={tempCoachLanguages || ""}
                        onChange={(e) => setTempCoachLanguages(e.target.value)}
                      >
                        <option value="">Choose your Language</option>
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                      </select>
                    </div>
                    {/* caoch age */}
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your age"
                        value={tempCoachAge}
                        onChange={(e) => setTempCoachAge(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter your rate"
                        value={tempCoachrate}
                        onChange={(e) => settempCoachrate(e.target.value)}
                      />
                    </div>
                    {/* coach gender */}
                    <div className="col-md-6">
                      <select
                        className="form-select"
                        value={tempGender || ""}
                        onChange={(e) => setTempGender(e.target.value)}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                    {/* coach email */}
                    <div className="col-12">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={tempEmail}
                        onChange={(e) => setTempEmail(e.target.value)}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="mt-4 text-end">
                    <button
                      type="button"
                      className="buttoncancel"
                      onClick={() => setShowUpdateModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="buttonUpdate"
                      onClick={(e) => handleUpdateCoach(e)}
                    >
                      UPDATE
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoachUpdatePage;
