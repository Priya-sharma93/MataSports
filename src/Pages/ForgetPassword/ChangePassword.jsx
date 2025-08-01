import React, { useState } from "react";
import "../../Pages/ForgetPassword/ChangePassword.css"
import { Link } from "react-router-dom";

function ChangePassword() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newPassword === confirmPassword) {
            setMessage("✅ Password reset successful!");
        } else {
            setMessage("⚠ Passwords do not match!");
        }
    };

    return (
        <div className="styles container1"> 
            <div className="styles formContainer1">
                <h2>Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="styles input"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="styles input" 
                    />
                    <button type="submit" className="styles button"> 
                        Reset Password
                    </button>
                </form>
                <p style={{ color: newPassword === confirmPassword ? "green" : "red" }}>
                    {message}
                </p>
                <Link to="/SignInForm" style={{"textDecoration" :"None"}}><p className="font-family-Roboto m-4 custom-p">Signin</p></Link>
            </div>
              
            
        </div>
    );
}

export default ChangePassword;
