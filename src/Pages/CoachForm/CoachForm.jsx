import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import googleIcon from "../../assets/google-icon.svg";
import facebookIcon from "../../assets/facebook-icon.svg";
import appleIcon from "../../assets/apple-icon.svg";
import userIcon from "../../assets/user-icon.svg";
import "../SignUp/SignUpCard/SignUpCard.css";
import { useNavigate, useLocation, Link } from "react-router-dom";
import apiMethods from "../../api/axios.config";
import cookies from "js-cookie";

const CoachForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";
  const password = location.state?.password || "";

  console.log("email: ", email);

  const [form, setForm] = useState({
    fullname: "",
    phone: "",
    dob: "",
    address: "",
    domain: "",
    experience: "",
  });

  const [err, setErr] = useState({
    fullname: false,
    phone: false,
    dob: false,
    address: false,
    domain: false,
    experience: false,
  });

  const validateFullname = (fullname) =>
    /^[a-zA-Z]+(?: [a-zA-Z]+)+$/.test(fullname);

  const validatePhone = (phone) => /^\d{10}$/.test(phone);

  const validateDOB = (dob) => {
    const today = new Date();
    const enteredDate = new Date(dob);
    if (enteredDate > today) {
      return false;
    }
    const age = today.getFullYear() - enteredDate.getFullYear();
    return age >= 18;
  };

  const validateAddress = (address) => address.trim() !== "";
  const validateDomain = (domain) => domain !== "Choose your Domain";
  const validateExperience = (experience) => experience.trim() !== "";

  const handleBlur = (e) => {
    const { name, value } = e.target;
    // setErr((prev) => ({
    //   ...prev,
    //   [name]: !(
    //     (name === "phone" && validatePhone(value)) ||
    //     (name === "dob" && validateDOB(value)) ||
    //     (name === "address" && validateAddress(value)) ||
    //     (name === "domain" && validateDomain(value)) ||
    //     (name === "experience" && validateExperience(value))
    //   ),
    // }));
  };

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // const handleErr = async () => {
  //   const fullnameIsValid = validateFullname(form.fullname);
  //   const phoneIsValid = validatePhone(form.phone);
  //   const dobIsValid = validateDOB(form.dob);
  //   const addressIsValid = validateAddress(form.address);
  //   const domainIsValid = validateDomain(form.domain);
  //   const experienceIsValid = validateExperience(form.experience);

  //   setErr({
  //     fullname: !fullnameIsValid,
  //     phone: !phoneIsValid,
  //     dob: !dobIsValid,
  //     address: !addressIsValid,
  //     domain: !domainIsValid,
  //     experience: !experienceIsValid,
  //   });

  //   if (
  //     fullnameIsValid &&
  //     phoneIsValid &&
  //     dobIsValid &&
  //     addressIsValid &&
  //     domainIsValid &&
  //     experienceIsValid
  //   ) {
  //     try {
  //       const response = await apiMethods.post("/coachregistration", {
  //         email,
  //         password,
  //         domains: form.domain,
  //         coach_address: form.address,
  //         coach_name: form.fullname,
  //         coach_phone: form.phone,
  //         detail_experience: form.experience,
  //         coach_dob: form.dob,
  //       });
  //       console.log(response.status);

  //       if (response.status === 200 || response.status === 201) {
  //         // Store token if it's returned
  //         // console.log("response1: ", response);

  //         const token = response.data;
  //         cookies.set("auth_token", token);
  //         console.log("token:", token);

  //         navigate(
  //           "/SignInForm",
  //           {
  //             state: {
  //               email,
  //               fullname: form.fullname,
  //               phone: form.phone,
  //               dob: form.dob,
  //               address: form.address,
  //               domain: form.domain,
  //               experience: form.experience,
  //             },
  //           },
  //           { replace: true }
  //         );
  //       }
  //     } catch (error) {
  //       console.error("Error submitting form:", error);
  //       // You might want to show an error message to the user
  //     }
  //   }
  // };



  const handleErr = async () => {
    // const fullnameIsValid = validateFullname(form.fullname);
    const phoneIsValid = validatePhone(form.phone);
    const dobIsValid = validateDOB(form.dob);
    const addressIsValid = validateAddress(form.address);
    const domainIsValid = validateDomain(form.domain);
    const experienceIsValid = validateExperience(form.experience);

    setErr({
      // fullname: !fullnameIsValid,
      phone: !phoneIsValid,
      dob: !dobIsValid,
      address: !addressIsValid,
      domain: !domainIsValid,
      experience: !experienceIsValid,
    });

    if (
      // fullnameIsValid &&
      phoneIsValid &&
      dobIsValid &&
      addressIsValid &&
      domainIsValid &&
      experienceIsValid
    ) {
      try {
        const response = await apiMethods.post("/coachregistration", {
          email,
          password,
          domains: form.domain,
          coach_address: form.address,
          coach_name: form.fullname,
          coach_phone: form.phone,
          detail_experience: form.experience,
          coach_dob: form.dob,
        });

        console.log(response.status);

        if (response.status === 200 || response.status === 201) {
          alert("Successfully saved!"); // Success alert

          const token = response.data;
          cookies.set("auth_token", token);
          console.log("token:", token);

          navigate(
            "/SignInForm",
            {
              state: {
                email,
                fullname: form.fullname,
                phone: form.phone,
                dob: form.dob,
                address: form.address,
                domain: form.domain,
                experience: form.experience,
              },
            },
            { replace: true }
          );
        }
      } catch (error) {
        console.error("Error submitting form:", error);

        // Show duplicate email alert only if the error is specifically due to an existing email
        if (error.response && error.response.status === 400) {
          alert("Email already exists! Please use a different email.");
        }
      }
    }
  };


  return (
    <Card className="d-flex justify-content-center align-items-center border-0 shadow custom-card h-100">
      <Card.Body className="p-5 m-4">
        <div className="d-flex justify-content-center">
          <img src={userIcon} alt="User Icon" className="user-icon m-3" />
        </div>
        <h3 className="mb-4 font-weight-bold font-family-Roboto custom-h3">
          Please share your Details
        </h3>

        <Form className="pageForm">
          <Form.Group className="mb-3 input-group">
            <Form.Control
              type="text"
              placeholder="Enter Fullname"
              name="fullname"
              className="form profile"
              style={{ paddingLeft: "60px" }}
              value={form.fullname}
              onChange={handleForm}
              onBlur={handleBlur}
            />
          </Form.Group>
          {err.fullname && (
            <p className="text-danger">
              <i className="fa-solid fa-circle-xmark"></i> Fullname must only
              contain letters.
            </p>
          )}
          <Form.Group className="mb-3 input-group">
            <Form.Control
              type="text"
              placeholder="Enter mobile number"
              name="phone"
              className="form phone"
              style={{ paddingLeft: "60px" }}
              value={form.phone}
              onChange={handleForm}
              onBlur={handleBlur}
            />
          </Form.Group>
          {err.phone && (
            <p className="text-danger">
              <i className="fa-solid fa-circle-xmark"></i> Mobile number must be
              10 digits.
            </p>
          )}
          <Form.Group className="mb-3 input-group">
            <Form.Control
              type="date"
              placeholder="Enter D.O.B"
              name="dob"
              className="form dob"
              style={{ paddingLeft: "60px" }}
              value={form.dob}
              onChange={handleForm}
              onBlur={handleBlur}
            />
          </Form.Group>
          {err.dob && (
            <p className="text-danger">
              <i className="fa-solid fa-circle-xmark"></i> Please enter a valid
              date of birth. You must be at least 18 years old.
            </p>
          )}
          <Form.Group className="mb-3 input-group">
            <Form.Control
              type="text"
              placeholder="Enter full address with pincode"
              name="address"
              className="form pin"
              style={{ paddingLeft: "60px" }}
              value={form.address}
              onChange={handleForm}
              onBlur={handleBlur}
            />
          </Form.Group>
          {err.address && (
            <p className="text-danger">
              <i className="fa-solid fa-circle-xmark"></i> Address is required.
            </p>
          )}
          <Form.Group className="mb-3 ">
            <Form.Control
              as="select"
              name="domain"
              className="w-100 form drop"
              style={{ paddingLeft: "60px" }}
              value={form.domain}
              onChange={handleForm}
              onBlur={handleBlur}
            >
              <option>Choose your Domain</option>
              <option>Tennis</option>
              <option>Football</option>
              <option>Basketball</option>
              <option>Yoga</option>
              <option>Cricket</option>
              <option>Boxing</option>
              <option>Hockey</option>
              <option>Skating</option>
              <option>Physiotherapist</option>
              <option>Sports-Suusgeon</option>
            </Form.Control>
          </Form.Group>
          {err.domain && (
            <p className="text-danger">
              <i className="fa-solid fa-circle-xmark"></i> Please select a valid
              domain.
            </p>
          )}
          <Form.Group className="mb-3 ">
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Details about your Experience"
              name="experience"
              className="w-100 form detail"
              style={{ paddingLeft: "60px" }}
              value={form.experience}
              onChange={handleForm}
              onBlur={handleBlur}
            />
          </Form.Group>{" "}
          {err.experience && (
            <p className="text-danger">
              <i className="fa-solid fa-circle-xmark"></i> Experience details
              are required.
            </p>
          )}
          <Form.Group className="d-flex justify-content-center">
            <Button
              variant="danger"
              className="d-flex justify-content-center  text-center mb-3 font-family-Roboto form-btn-save"
              onClick={handleErr}
            >
              SAVE
            </Button>
          </Form.Group>
        </Form>

        <p className="text-center font-weight-bold mb-2 custom-loginWith">
          Sign up with
        </p>
        <div className="d-flex justify-content-center align-items-center m-4">
          <img
            src={googleIcon}
            alt="Google"
            className="mx-2 cursor-pointer "
            style={{ width: "40px", height: "40px", marginTop: "5px" }}
          />
          <img
            src={facebookIcon}
            alt="Facebook"
            className="mx-2 cursor-pointer "
          />
          <img src={appleIcon} alt="Apple" className="mx-2 cursor-pointer " />
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

export default CoachForm;
