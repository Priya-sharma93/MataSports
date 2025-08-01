import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import cookies from "js-cookie";
// import config from "../config";
import config from "../../config";

import "./Authentication.css";

function EmailOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(120);
  const [resendEnabled, setResendEnabled] = useState(false);

  const { email: emailFromState, password, role } = location.state || {};
  const [email, setEmail] = useState(emailFromState || "");

  useEffect(() => {
    if (!email) {
      navigate("/home");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (step === 2 && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (timer === 0) {
      setResendEnabled(true);
    }
  }, [step, timer]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      setStep(2);
      setTimer(120);
      setResendEnabled(false);

      try {
        const response = await axios.post(
          `${config.baseURL}/send_otp_email`,
          { email_id: email }
        );

        toast.success("OTP sent successfully!");
        if (response.data.success) {
          toast.success("OTP Verified successfully!");
        }
      } catch (error) {
        console.error("Error while sending OTP:", error);
        toast.error("Failed to send OTP.");
      }
    } else {
      toast.error("Please enter a valid email address.");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      try {
        const response = await axios.post(
          `${config.baseURL}/verify_email`,
          {
            email_id: email,
            otp_email: otp,
          }
        );

        if (response.data) {
          toast.success("OTP verified successfully!");
          cookies.set("isVerified", "true");

          if (role === "CoachProfile") {
            navigate(
              "/coach",
              { state: { email, password } },
              { replace: true }
            );
          } else if (role === "AthProfile") {
            navigate(
              "/athlete",
              { state: { email, password } },
              { replace: true }
            );
          }
        } else {
          toast.error("Invalid OTP.");
        }
      } catch (error) {
        console.error(
          "Error while verifying OTP:",
          error.response?.data || error.message
        );
        toast.error("Invalid OTP!");
      }
    } else {
      toast.error("Please enter a valid 6-digit OTP.");
    }
  };

  const handleResendOtp = async () => {
    setTimer(120);
    setResendEnabled(false);

    try {
      const response = await axios.post(
        `${config.baseURL}/send_otp_email`,
        { email_id: email }
      );

      toast.success("OTP resend successfully!");
    } catch (error) {
      console.error("Error while resending OTP:", error);
      toast.error("Failed to resend OTP.");
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{
        width: "100%",
        height: "80vh",
        padding: "0",
        margin: "0",
      }}
    >
      <div
        className="mainContainer text-center p-4 shadow"
        style={{
          maxWidth: "500px",
          background: "#3535c9",
          color: "white",
          borderRadius: "10px",
        }}
      >
        <Row className="mb-3">
          <Col>
            <h3 style={{ textTransform: "uppercase" }}>OTP Verification</h3>
          </Col>
        </Row>

        {step === 1 && (
          <Form onSubmit={handleEmailSubmit}>
            <Row className="mb-3">
              <Col>
                <Form.Label style={{ fontWeight: "bold" }}>
                  <h5>Enter Your Email Address</h5>
                </Form.Label>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Control
                  type="email"
                  placeholder="example@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    borderColor: "#ccc",
                    borderRadius: "4px",
                  }}
                  disabled
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <Button
                  size="lg"
                  style={{
                    fontWeight: "bold",
                    color: "#3535c9",
                    backgroundColor: "white",
                  }}
                  className="w-auto rounded-3"
                  type="submit"
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        )}

        {step === 2 && (
          <Form onSubmit={handleOtpSubmit}>
            <Row className="mb-3">
              <Col>
                <Form.Label style={{ fontWeight: "bold" }}>
                  <h5>Enter the OTP</h5>
                </Form.Label>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col xs={12}>
                <Form.Control
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) =>
                    /^\d*$/.test(e.target.value) &&
                    e.target.value.length <= 6 &&
                    setOtp(e.target.value)
                  }
                  style={{
                    textAlign: "center",
                    borderColor: "#ccc",
                    borderRadius: "4px",
                  }}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <Button
                  size="lg"
                  style={{
                    fontWeight: "bold",
                    color: "#3535c9",
                    backgroundColor: "white",
                  }}
                  type="submit"
                  className="w-auto"
                >
                  Verify OTP
                </Button>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <Button
                  variant="link"
                  disabled={!resendEnabled}
                  onClick={handleResendOtp}
                  style={{
                    color: resendEnabled ? "#fff" : "#ccc",
                    textDecoration: "underline",
                    cursor: resendEnabled ? "pointer" : "not-allowed",
                  }}
                >
                  Resend OTP {timer > 0 && `(${timer}s)`}
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </div>
    </Container>
  );
}

export default EmailOtp;
