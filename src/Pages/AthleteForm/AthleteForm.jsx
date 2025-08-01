import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./AthleteForm.css";
import googleIcon from "../../assets/google-icon.svg";
import facebookIcon from "../../assets/facebook-icon.svg";
import appleIcon from "../../assets/apple-icon.svg";
import userIcon from "../../assets/user-icon.svg";
import config from "../../config";
import { useAuthContext } from "../../context/AuthContext/AuthContext";

const AthleteForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const password = location.state?.password || "";

  const { setIsLoggedIn } = useAuthContext();

  const [form, setForm] = useState({
    fullname: "",
    phone: "",
    parentPhone: "",
    dob: "",
    address: "",
    healthDetails: "",
  });

  const [err, setErr] = useState({
    fullname: false,
    phone: false,
    parentPhone: false,
    dob: false,
    address: false,
    healthDetails: false,
  });

  const [isTermsAccepted, setIsTermsAccepted] = useState(false); // State for checkbox

  const validateFullname = (fullname) => /^[a-zA-Z\s]+$/.test(fullname);
  const validatePhone = (phone) => /^\d{10}$/.test(phone);
  const validateDOB = (dob) => {
    const today = new Date();
    const enteredDate = new Date(dob);
    if (enteredDate > today) return false;
    const age = today.getFullYear() - enteredDate.getFullYear();
    return age >= 12;
  };
  const validateAddress = (address) => address.trim() !== "";
  const validateHealthDetails = (healthDetails) => healthDetails.trim() !== "";

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErr((prev) => ({
      ...prev,
      [name]: !(
        (name === "fullname" && validateFullname(value)) ||
        (name === "phone" && validatePhone(value)) ||
        (name === "parentPhone" && validatePhone(value)) ||
        (name === "dob" && validateDOB(value)) ||
        (name === "address" && validateAddress(value)) ||
        (name === "healthDetails" && validateHealthDetails(value))
      ),
    }));
  };

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // const handleErr = async () => {
  //   const fullnameIsValid = validateFullname(form.fullname);
  //   const phoneIsValid = validatePhone(form.phone);
  //   const parentPhoneIsValid = validatePhone(form.parentPhone);
  //   const dobIsValid = validateDOB(form.dob);
  //   const addressIsValid = validateAddress(form.address);
  //   const healthDetailsIsValid = validateHealthDetails(form.healthDetails);

  //   setErr({
  //     fullname: !fullnameIsValid,
  //     phone: !phoneIsValid,
  //     parentPhone: !parentPhoneIsValid,
  //     dob: !dobIsValid,
  //     address: !addressIsValid,
  //     healthDetails: !healthDetailsIsValid,
  //   });
  //   console.log(fullnameIsValid,
  //     phoneIsValid,
  //     parentPhoneIsValid,
  //     dobIsValid,
  //     addressIsValid,
  //     healthDetailsIsValid)
  //   if (
  //     fullnameIsValid &&
  //     phoneIsValid &&
  //     // parentPhoneIsValid &&
  //     dobIsValid &&
  //     addressIsValid &&
  //     healthDetailsIsValid
  //   ) {
  //     try {
  //       const response = await axios.post(
  //         `${config.baseURL}/registration`,
  //         {
  //           email,
  //           password,
  //           detail_health: form.healthDetails,
  //           address: form.address,
  //           name: form.fullname,
  //           phone: form.phone,
  //           dob: form.dob,
  //         }
  //       );

  //       if (response.status === 201 || response.status === 200) {
  //         setForm({
  //           fullname: "",
  //           phone: "",
  //           parentPhone: "",
  //           dob: "",
  //           address: "",
  //           healthDetails: "",
  //         });
  //         navigate("/SignInForm");
  //       }
  //     } catch (error) {
  //       console.error("Error submitting form:", error);
  //     }
  //   }
  // };


  const handleErr = async () => {
    const fullnameIsValid = validateFullname(form.fullname);
    const phoneIsValid = validatePhone(form.phone);
    const parentPhoneIsValid = validatePhone(form.parentPhone);
    const dobIsValid = validateDOB(form.dob);
    const addressIsValid = validateAddress(form.address);
    const healthDetailsIsValid = validateHealthDetails(form.healthDetails);

    setErr({
      fullname: !fullnameIsValid,
      phone: !phoneIsValid,
      parentPhone: !parentPhoneIsValid,
      dob: !dobIsValid,
      address: !addressIsValid,
      healthDetails: !healthDetailsIsValid,
    });
    
    console.log(
      fullnameIsValid,
      phoneIsValid,
      parentPhoneIsValid,
      dobIsValid,
      addressIsValid,
      healthDetailsIsValid
    );

    if (
      fullnameIsValid &&
      phoneIsValid &&
      // parentPhoneIsValid &&
      dobIsValid &&
      addressIsValid &&
      healthDetailsIsValid
    ) {
      try {
        const response = await axios.post(
          `${config.baseURL}/registration`,
          {
            email,
            password,
            detail_health: form.healthDetails,
            address: form.address,
            name: form.fullname,
            phone: form.phone,
            dob: form.dob,
          }
        );

        if (response.status === 201 || response.status === 200) {
          alert("Successfully saved!"); // Alert for successful registration

          setForm({
            fullname: "",
            phone: "",
            parentPhone: "",
            dob: "",
            address: "",
            healthDetails: "",
          });

          navigate("/SignInForm");
        }
      } catch (error) {
        console.error("Error submitting form:", error);

        if (error.response && error.response.status === 400) { // Assuming 400 is for "email already exists"
          alert("Email already exists! Please use a different email."); // Alert for duplicate email
        }
      }
    }
  };

  return (
    <Card className="d-flex justify-content-center align-items-center border-0 shadow custom-card">
      <Card.Body className="p-5 m-4">
        <div className="d-flex justify-content-center">
          <img src={userIcon} alt="User Icon" className="user-icon m-3" />
        </div>

        <h3 className="mb-3 font-weight-bold font-family-Roboto custom-h3 text-center">
          Please share your Details
        </h3>

        <Form>
          <Form.Group className="mb-4 inputGroupAth">
            <Form.Control
              type="text"
              placeholder="Enter Fullname"
              name="fullname"
              value={form.fullname}
              onChange={handleForm}
              onBlur={handleBlur}
              className="form profile"
            />
          </Form.Group>
          {err.fullname && (
            <p className="text-danger">
              <i className="fa-solid fa-circle-xmark"></i> Fullname must only
              contain letters.
            </p>
          )}

          <Form.Group className="mb-4 inputGroupAth">
            <Form.Control
              type="text"
              placeholder="Enter mobile number"
              name="phone"
              value={form.phone}
              onChange={handleForm}
              onBlur={handleBlur}
              className="form phone"
            />
          </Form.Group>
          {err.phone && (
            <p className="text-danger">
              <i className="fa-solid fa-circle-xmark"></i> Mobile number must be
              10 digits.
            </p>
          )}

          <Form.Group className="mb-4 inputGroupAth">
            <Form.Control
              type="date"
              placeholder="Enter D.O.B"
              name="dob"
              value={form.dob}
              onChange={handleForm}
              onBlur={handleBlur}
              className="form dob"
            />
          </Form.Group>
          {err.dob && (
            <p className="text-danger">
              <i className="fa-solid fa-circle-xmark"></i> Please enter a valid
              date of birth. You must be at least 12 years old.
            </p>
          )}

          <Form.Group className="mb-4 inputGroupAth">
            <Form.Control
              type="text"
              placeholder="Enter full address with pincode"
              name="address"
              value={form.address}
              onChange={handleForm}
              onBlur={handleBlur}
              className="form pin"
            />
          </Form.Group>
          {err.address && (
            <p className="text-danger">
              <i className="fa-solid fa-circle-xmark"></i> Address is required.
            </p>
          )}

          <Form.Group className="mb-4 inputGroupAth">
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Details about your health"
              name="healthDetails"
              value={form.healthDetails}
              onChange={handleForm}
              onBlur={handleBlur}
              className="form detail"
            />
          </Form.Group>
          {err.healthDetails && (
            <p className="text-danger">
              <i className="fa-solid fa-circle-xmark"></i> Health details are
              required.
            </p>
          )}

          <Form.Group className="mb-4 d-flex flex-start ">
            <Form.Check
              type="checkbox"
              id="terms-checkbox"
              label="I agree to the Terms and Conditions"
              checked={isTermsAccepted}
              onChange={(e) => setIsTermsAccepted(e.target.checked)}
              className="me-2"
            />
            <Link to="/TermsAndConditions" className="text-danger">
              View Terms and Conditions
            </Link>
          </Form.Group>

          <Form.Group className="mb-4 d-flex justify-content-center">
            <Button
              variant="danger"
              className="form-btn-save"
              onClick={handleErr}
              disabled={!isTermsAccepted} // Disable button if terms are not accepted
            >
              SAVE
            </Button>
          </Form.Group>
        </Form>

        <p className="text-center font-weight-bold mb-2 custom-loginWith">
          Sign up with
        </p>
        <div className="d-flex justify-content-center align-items-center m-4">
          <img src={googleIcon} alt="Google" className="mx-2 cursor-pointer" />
          <img
            src={facebookIcon}
            alt="Facebook"
            className="mx-2 cursor-pointer"
          />
          <img src={appleIcon} alt="Apple" className="mx-2 cursor-pointer" />
        </div>

        <p className="text-center custom-loginWith">
          Already a member in athletes?{" "}
          <Link to="/SignInForm" className="text-danger font-weight-bold">
            Login
          </Link>
        </p>
      </Card.Body>
    </Card>
  );
};

export default AthleteForm;
