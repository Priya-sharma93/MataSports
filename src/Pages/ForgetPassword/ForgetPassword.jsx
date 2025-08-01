import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import EmailVarification from "./EmailVarification";


const ForgotPassword = () => {
   
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState(""); 
    const [userType, setUserType] = useState(""); // Properly handling dropdown selection
    const [message, setMessage] = useState("");
    const [selectedRole , setSelectedRole] = useState("");
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
    
        if (email !== confirmEmail) {
            setMessage("Emails do not match. Please check again.");
            return;
        }
    
        localStorage.setItem("email", email);
    
        try {
            const response = await axios.post("https://sports-backend-u17y.onrender.com/reset_password", { email });
    
            if (response.data.success) {
                setMessage("Password reset link sent successfully! Check your email.");
            } else {
                setMessage("Something went wrong. Please try again.");
            }
        } catch (error) {
            setMessage("Error sending request. Please check your connection.");
        }
    };
    

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#f8f9fa" }}>
            <div className="card p-4 shadow-sm rounded" style={{ width: "400px" }}>
                <div className="text-center">
                    <span className="fs-1 text-primary">🔒</span>
                    <h3 className="mt-3">Forgot Password?</h3>
                    <p className="text-muted">Enter your details to reset your password</p>
                </div>
                <Form className="d-flex flex-column justify-content-center align-items-center" onSubmit={handleSubmit}>
                    {/* Role Selection Dropdown */}
                    <Form.Group controlId="userTypeSelect" className="mb-4">
                        <Form.Label className="font-family-Roboto label">I am a...</Form.Label>
                        {/* <Form.Control
                            as="select"
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                             //className="form-select form selectCA"
                             className="form-control rounded-pill ps-4 select"
                            required
                        >
                            <option value="" disabled>Select Role</option>
                            <option value="coach">Coach</option>
                            <option value="athlete">Athlete</option>
                        </Form.Control> */}
                        <Form.Group className="mb-3 position-relative">
    <Form.Select
        className="form-control rounded-pill ps-4"
        required
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
    >
        <option value="">Select Role</option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
    </Form.Select>
</Form.Group>

                    </Form.Group>

                    {/* Email Input */}
                    <Form.Group className="mb-3 position-relative">
                        <Form.Control
                            type="email"
                            className="form-control rounded-pill ps-4"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                <Link to="/EmailVarification">
                
                    <button type="submit" className="btn btn-primary w-100 rounded-pill">Submit
                    </button>
                    {/* res?<EmailVarification/> */}
                    </Link>
                </Form>

                {message && <p className="mt-3 text-center text-success">{message}</p>}

                <div className="mt-3 text-center">
                    <a href="/SignInForm" className="text-decoration-none text-muted">Back to Login</a>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
