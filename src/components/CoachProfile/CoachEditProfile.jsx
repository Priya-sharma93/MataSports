import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import axios from "axios";
import cookies from "js-cookie";
import config from "../config";
import { Password } from "@mui/icons-material";

const CoachEditProfile = ({ coachData, onHandleClose, onProfileUpdate }) => {
  const [photo, setPhoto] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const [formData, setFormData] = useState({
    email: "",
    coach_name: "",
    coach_phone: "",
    coach_dob: "",
    coach_address: "",
    domains: "",
    detail_experience: "",
  });

  useEffect(() => {
    if (coachData) {
      setFormData({
        coach_name: coachData.coach_name || "",
        coach_phone: coachData.coach_phone || "",
        coach_dob: coachData.coach_dob || "",
        coach_address: coachData.coach_address || "",
        domains: coachData.domains || "",
        detail_experience: coachData.detail_experience || "",
        email: coachData.email || "",
      });
    }
  }, [coachData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = cookies.get("auth_token");
      
      console.log("Token: ", token);

      console.log("formdata: ", formData);

      const response = await axios.put(
        `${config.baseURL}/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Profile updated successfully:", response.data);
      onProfileUpdate(response.data.coach); // Pass updated coach data to parent
      onHandleClose();
    } catch (err) {
      console.error("Error updating profile:", err.response);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex flex-column"
      style={{ height: "60vh" }}
    >
      {/* Upload Photo Section */}
      <div className="d-flex justify-content-end position-relative">
        <button
          className="rounded-circle bg-white w-auto border cross-button"
          style={{
            marginTop: "-2rem",
            marginRight: "-2rem",
            minHeight: "2rem",
            minWidth: "2rem",
          }}
          onClick={onHandleClose}
        >
          X
        </button>
      </div>
      <div className="d-flex mb-4">
        <div className="d-flex align-items-center gap-3">
          <div
            className="rounded-circle bg-light d-flex align-items-center justify-content-center overflow-hidden upload-image"
            style={{
              minWidth: "6rem",
              minHeight: "6rem",
              border: "2px solid #ccc",
            }}
          >
            {photo ? (
              <img
                src={photo}
                alt="Uploaded"
                style={{
                  width: "6rem",
                  height: "6rem",
                  objectFit: "cover",
                }}
              />
            ) : (
              <i
                className="bi bi-person-circle"
                style={{ fontSize: "2rem", color: "#ccc" }}
              ></i>
            )}
          </div>

          <label
            htmlFor="uploadPhoto"
            className="rounded-4 px-2 py-2 fw-bold upload-button-css upload-photo-btn"
            style={{ cursor: "pointer" }}
          >
            <i className="bi bi-upload d-flex align-items-center upload-photo-css">
              <span className="ms-2">Upload Photo</span>
            </i>
          </label>
          <input
            type="file"
            id="uploadPhoto"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handlePhotoChange}
          />
        </div>
      </div>

      {/* Form Fields */}
      <div className="d-flex flex-wrap justify-content-between gap-3 ms-3">
        <div className="col-md-3">
          <TextField
            label="Full Name"
            name="coach_name"
            value={formData.coach_name}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            className="rounded-3"
          />
        </div>
        <div className="col-md-3">
          <TextField
            label="Phone"
            name="coach_phone"
            value={formData.coach_phone}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            className="rounded-3"
          />
        </div>
        <div className="col-md-3">
          <TextField
            label="Date of Birth"
            name="coach_dob"
            type="date"
            value={formData.coach_dob}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            className="rounded-3"
            InputLabelProps={{ shrink: true }}
          />
        </div>
        <div className="col-md-3">
          <TextField
            label="Address"
            name="coach_address"
            value={formData.coach_address}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            className="rounded-3"
          />
        </div>
        <div className="col-md-3">
          <TextField
            label="Domain"
            name="domains"
            value={formData.domains}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            className="rounded-3"
          />
        </div>
        <div className="col-md-3">
          <TextField
            label="Experience"
            name="detail_experience"
            value={formData.detail_experience}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            className="rounded-3"
          />
        </div>
        <div className="col-md-3">
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            className="rounded-3"
            disabled
          />
        </div>
      </div>

      <div className="d-flex justify-content-lg-end justify-content-center p-5 gap-3 w-100">
        <button
          type="button"
          className="upload-button-css fw-bold px-3 rounded-3 w-auto py-1"
          onClick={onHandleClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 upload-button-css fw-bold rounded-3 w-auto py-1 save-changes-button"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default CoachEditProfile;
