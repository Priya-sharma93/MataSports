import React, { useState } from "react";
import { Form, Card } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import googleIcon from "../../../assets/google-icon.svg";
import facebookIcon from "../../../assets/facebook-icon.svg";
import appleIcon from "../../../assets/apple-icon.svg";
import "./SignUpCard.css";

const SignUpCard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get("role");

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [err, setErr] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // Email validation: standard email format
  const validateEmail = (email) =>
    /^[^\s@]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(email);

  // Password validation: 8-20 characters, at least one uppercase, one lowercase, one number, and one special character
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
      password
    );

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setErr((prev) => ({ ...prev, email: !validateEmail(value) }));
    } else if (name === "password") {
      setErr((prev) => ({ ...prev, password: !validatePassword(value) }));
    } else if (name === "confirmPassword") {
      setErr((prev) => ({ ...prev, confirmPassword: value !== form.password }));
    }
  };

  const handleErr = (e) => {
    e.preventDefault();
    const emailIsValid = validateEmail(form.email);
    const passwordIsValid = validatePassword(form.password);
    const confirmPasswordIsValid = form.password === form.confirmPassword;

    setErr({
      email: !emailIsValid,
      password: !passwordIsValid,
      confirmPassword: !confirmPasswordIsValid,
    });

    if (emailIsValid && passwordIsValid && confirmPasswordIsValid) {
      setForm({ email: "", password: "", confirmPassword: "" });

      if (role === "CoachProfile") {
        navigate("/coach", { state: { form } });
      } else if (role === "AthProfile") {
        navigate("/athlete", { state: { form } });
      }
    }
  };

  const onHandleSignup = (e) => {
    e.preventDefault();
    const emailIsValid = validateEmail(form.email);
    const passwordIsValid = validatePassword(form.password);
    const confirmPasswordIsValid = form.password === form.confirmPassword;
    setErr({
      email: !emailIsValid,
      password: !passwordIsValid,
      confirmPassword: !confirmPasswordIsValid,
    });

    if (emailIsValid && passwordIsValid && confirmPasswordIsValid) {
      navigate("/email-otp-verification", {
        state: { email: form.email, password: form.password, role: role },
        replace: true,
      });
    }
  };

  return (
    <Card className="d-flex justify-content-center align-items-center border-0 shadow custom-card">
      <div className="p-5 divforPass">
        <h3 className="text-center mb-4 font-family-Roboto custom-heading">
          Please Enter Email and Password
        </h3>
        <p className="text-center mb-4 font-family-Roboto custom-para">
          Start your career counseling Today!
        </p>
        <h5 className="text-center mb-4 font-family-Roboto custom-h5">
          SignUp to your Account
        </h5>

        <p className="text-center font-family-Roboto custom-SignUpWith">
          SignUp With
        </p>
        <div className="d-flex justify-content-center align-items-center m-4">
          <img
            src={googleIcon}
            alt="Google"
            className="mx-2 cursor-pointer google"
          />
          <img
            src={facebookIcon}
            alt="Facebook"
            className="mx-2 cursor-pointer"
          />
          <img src={appleIcon} alt="Apple" className="mx-2 cursor-pointer" />
        </div>

        <Form
          className="d-flex flex-column justify-content-center align-items-center"
          onSubmit={handleErr}
        >
          <Form.Group controlId="formEmail" className="mb-4 emailpassWidth">
            <Form.Label className="font-family-Roboto label">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Please enter your email"
              className="form icon"
              name="email"
              value={form.email}
              onChange={handleForm}
              onBlur={handleBlur}
            />
          </Form.Group>
          {err.email && (
            <p className="text-danger">
              <i className="fa-solid fa-circle-xmark"></i> Please enter a valid
              email address.
            </p>
          )}

          <Form.Group controlId="formPassword" className="mb-4 emailpassWidth">
            <Form.Label className="font-family-Roboto label">
              Password
            </Form.Label>
            <div className="position-relative">
              <Form.Control
                type={showPassword ? "text" : "password"} // Toggle between text and password
                placeholder="Please enter your password"
                className="form password"
                name="password"
                value={form.password}
                onChange={handleForm}
                onBlur={handleBlur}
              />
              <span
                className="position-absolute end-0 top-0 mt-2 me-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
              >
                {showPassword ? (
                  <i className="fa-solid fa-eye-slash"></i>
                ) : (
                  <i className="fa-solid fa-eye"></i>
                )}{" "}
                {/* Icon for toggle */}
              </span>
            </div>
          </Form.Group>
          {err.password && (
            <p className="text-danger">
              <i className="fa-solid fa-circle-xmark"></i> Your password must be
              8-20 characters, include at least one uppercase letter, one
              lowercase letter, one number, and one special character.
            </p>
          )}

          <Form.Group
            controlId="formConfirmPassword"
            className="mb-4 emailpassWidth"
          >
            <Form.Label className="font-family-Roboto label">
              Confirm Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter confirm password"
              className="form password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleForm}
              onBlur={handleBlur}
            />
          </Form.Group>
          {err.confirmPassword && (
            <p className="text-danger">
              <i className="fa-solid fa-circle-xmark"></i> Passwords do not
              match.
            </p>
          )}

          <button
            type="submit"
            className="d-flex justify-content-center align-items-center mt-4 mb-5 font-family-Roboto form-btn"
            onClick={onHandleSignup}
          >
            SIGN UP
          </button>
        </Form>

        <p className="text-center text-black fw-semibold mt-4">
          Already have an account?{" "}
          <Link to="/SignInForm" className="text-danger text-decoration-none">
            Sign In
          </Link>
        </p>
      </div>
    </Card>
  );
};

export default SignUpCard;
