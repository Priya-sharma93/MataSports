import { TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import cookies from "js-cookie";
import config from "../../config";
import { toast } from "react-toastify";

const AthleteEditProfile = ({ athleteData, onHandleClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "", // Added dob field
    address: "",
    detail_health: "",
    password: "", // Added password field
  });

  // Initialize form with athlete data
  useEffect(() => {
    if (athleteData) {
      setFormData({
        name: athleteData.name || "",
        email: athleteData.email || "",
        phone: athleteData.phone || "",
        dob: athleteData.dob || "", // Directly use dob without formatting
        address: athleteData.address || "",
        detail_health: athleteData.detail_health || "",
        password: "", // Password is left empty by default
      });
    }
  }, [athleteData]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
    console.log("Updated FormData:", { ...formData, [id]: value });
  };

  // Handle form submission
  const onHandleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = cookies.get("auth_token"); // Get token from cookies

      const formDataToSend = {
        ...formData,
        dob: formData.dob || null, // Use the dob as provided
      };

      console.log("Form Data to Submit:", formDataToSend);

      const response = await axios.put(
        `${config.baseURL}/atheleteprofile`,
        formDataToSend, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Profile updated successfully!");
        onHandleClose(); // Close the modal after successful update
      } else {
        toast.error("Failed to update profile!");
      }
    } catch (error) {
      if (error.response) {
        toast.error(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        toast.error("No response from the server. Please try again later.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <form onSubmit={onHandleSubmit} className="" style={{ height: "60vh" }}>
      {/* Close Button */}
      <div className="d-flex justify-content-end position-relative">
        <button
          className="rounded-circle bg-white w-auto border cross-button"
          style={{
            marginTop: "-2rem",
            minHeight: "2rem",
            minWidth: "2rem",
          }}
          onClick={onHandleClose}
        >
          X
        </button>
      </div>

      {/* Form Fields */}
      <div className="d-flex flex-wrap justify-content-between gap-3 ms-3">
        {[
          { id: "name", label: "Full Name", type: "text" },
          { id: "email", label: "Email ID", type: "email" },
          { id: "phone", label: "Phone", type: "text" },
          { id: "dob", label: "Date of Birth", type: "text" }, // Use text for dob to match backend format
          { id: "address", label: "Address", type: "text" }, // Added address field
        ].map((field) => (
          <div className="col-md-3" key={field.id}>
            <label htmlFor={field.id} className="form-label fw-bold">
              {field.label}
            </label>
            {field.type === "email" ? (
              <input
                type={field.type}
                className="form-control rounded-3"
                id={field.id}
                value={formData[field.id]}
                onChange={handleInputChange}
                readOnly
              />
            ) : (
              <input
                type={field.type}
                className="form-control rounded-3"
                id={field.id}
                value={formData[field.id]}
                onChange={handleInputChange}
              />
            )}
          </div>
        ))}
      </div>

      {/* About You Section */}
      <div className="mt-3 d-flex flex-column mt-4 ms-3">
        <label htmlFor="detail_health" className="form-label fw-bold">
          About Your Health
        </label>
        <TextField
          id="detail_health"
          className="form-control"
          placeholder="Write something about your health..."
          multiline
          rows={3}
          variant="outlined"
          fullWidth
          value={formData.detail_health}
          onChange={handleInputChange}
        />
      </div>

      {/* Buttons */}
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

export default AthleteEditProfile;
