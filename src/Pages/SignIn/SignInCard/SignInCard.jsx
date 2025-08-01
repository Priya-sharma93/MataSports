import { useContext, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import cookies from "js-cookie";
import { toast } from "react-toastify";
import { useAuthContext } from "../../../context/AuthContext/AuthContext";
import apiMethods from "../../../../src/api/axios.config";
import googleIcon from "../../../assets/google-icon.svg";
import facebookIcon from "../../../assets/facebook-icon.svg";
import appleIcon from "../../../assets/apple-icon.svg";
import "./SignInCard.css";
import config from "../../../config";

const SignInCard = (props) => {
  const { setIsLoggedIn } = useAuthContext();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState({ email: false, password: false });
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility


  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => /^[^\s@]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(email);
  const validatePassword = (password) => password.length >= 8 && password.length <= 20;

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErr((prev) => ({
      ...prev,
      [name]: name === "email" ? !validateEmail(value) : !validatePassword(value),
    }));
  };

//   const handleLogin = async () => {
//     const emailIsValid = validateEmail(form.email);
//     const passwordIsValid = validatePassword(form.password);

//     setErr({ email: !emailIsValid, password: !passwordIsValid });

//     if (emailIsValid && passwordIsValid) {
//       try {
//         const payload = {
//           email: form.email,
//           password: form.password,
//           is_coach: userType === "coach",
//         };
//         const response = await apiMethods.post("/logging", payload);

//         if (response.status === 200) {
//           const token = response.data;
//           cookies.set("auth_token", token);
//           setIsLoggedIn(true);

          
//           // Navigate based on user type
//           if (userType === "coach") {
//             // Fetch coaches' data using axios
//             const coachResponse = await axios.get(
//               `${config.baseURL}/coaches`,
//               {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                 },
//               }
//             );
//   //  const userId = response.data.user.id;  // Extracting user ID from response
//   // localStorage.setItem("userId", userId); 
//   // localStorage.setItem("userRole", userType); // "coach" or "athlete"

// //   const userId = response.data.user.id; // Extract user ID
// // localStorage.setItem("userId", userId);
// // localStorage.setItem("userRole", userType);
// // localStorage.setItem("userName", response.data.user.name); // Store user name

//             if (coachResponse.status === 200 && Array.isArray(coachResponse.data.coaches)) {
//               const coach = coachResponse.data.coaches.find((c) => c.email === form.email);
//               if (coach) {
//                 console.log(`/CoachUpdatePage/${coach.id}`);
//                 navigate(`/CoachUpdatePage/${coach.id}`);
                
//                 props.fun(true); // Inform the parent component
//               } else {
//                 console.error("Coach not found.");
//                 toast.error("Coach account not found.");
//               }
//             } else {
//               console.error("Coach data is missing.");
//               toast.error("Error retrieving coach data.");
//             }
//           } else if (userType === "athlete") {
           
//             navigate("/AthPage");
//             props.fun(true); // Inform the parent component
//           } else {
//             navigate("/");
//           }
//         } else {
//           toast.error("Login failed. Please check credentials.");
//         }
//       } catch (error) {
//         console.error("Login error:", error);
//         toast.error("Login failed. Please try again.");
//       }

//     }
//   };


const handleLogin = async () => {
    const emailIsValid = validateEmail(form.email);
    const passwordIsValid = validatePassword(form.password);
  
    setErr({ email: !emailIsValid, password: !passwordIsValid });
  
    if (emailIsValid && passwordIsValid) {
      try {
        const payload = {
          email: form.email,
          password: form.password,
          is_coach: userType === "coach",
        };
        const response = await apiMethods.post("/logging", payload);
  
        if (response.status === 200) {
          const token = response.data;
          cookies.set("auth_token", token);
          setIsLoggedIn(true);
  
          
          const decodeToken = (token) => {
            try {
              const base64Url = token.split(".")[1];
              const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
              return JSON.parse(atob(base64));
            } catch (error) {
              console.error("Token decoding error:", error);
              return null;
            }
          };
  
          const decoded = decodeToken(token);
          if (!decoded || !decoded.id) {
            toast.error("Unable to decode user ID from token.");
            return;
          }
  
          const userId = decoded.id;
  
          let user = null;
  
          if (userType === "coach") {
            // Fetch coach list and find by email
            const coachRes = await axios.get(`${config.baseURL}/coaches`, {
              headers: { Authorization: `Bearer ${token}` },
            });
  
            if (coachRes.status === 200 && Array.isArray(coachRes.data.coaches)) {
              user = coachRes.data.coaches.find((c) => c.email === form.email);
            }
          } else {
            // Fetch single athlete profile
            const athRes = await axios.get(`${config.baseURL}/atheleteprofile/${userId}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
  
            if (athRes.status === 200) {
              user = athRes.data.athlete;
            }
          }
  
          if (user) {
            const userName = userType === "coach" ? user.coach_name : user.name;
            localStorage.setItem("user_id", user.id);
            // localStorage.setItem("user_name", coachUser.name);
            localStorage.setItem("user_type", userType);
            localStorage.setItem("user_profile", JSON.stringify(user));
            localStorage.setItem("user_name", userName);
  
            if (userType === "coach") {
              navigate(`/CoachUpdatePage/${user.id}`);
            } else {
              navigate("/AthPage");
            }
  
            props.fun(true); // Notify parent
          } else {
            toast.error(`${userType} account not found.`);
          }
        } else {
          toast.error("Login failed. Please check credentials.");
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error("Login failed. Please try again.");
      }
    }
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  return (
    <Card className="d-flex justify-content-center align-items-center border-0 shadow custom-card">
      <Card.Body className="p-5">
        <h3 className="text-center mb-4 font-family-Roboto custom-heading">
          Please Enter Email and Password
        </h3>
        <p className="text-center mb-4 font-family-Roboto custom-para">
          Start your career counseling Today!
        </p>
        <h5 className="text-center mb-4 font-family-Roboto custom-h5">
          Login to your Account
        </h5>
        <p className="text-center font-family-Roboto custom-loginWith">
          Login With
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

        {userType === "coach" && (
          <p className="text-center text-success">Welcome, Coach!</p>
        )}
        {userType === "athlete" && (
          <p className="text-center text-primary">Welcome, Athlete!</p>
        )}
        <Form className="d-flex flex-column justify-content-center align-items-center">
          <Form.Group controlId="userTypeSelect" className="mb-4">
            <Form.Label className="font-family-Roboto label">
              I am a...
            </Form.Label>
            <Form.Control
              as="select"
              value={userType}
              onChange={handleUserTypeChange}
              className="form-select form selectCA"
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="coach">Coach</option>
              <option value="athlete">Athlete</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-4">
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
            <p className="text-danger">Please enter a valid email address.</p>
          )}

          <Form.Group controlId="formPassword" className="mb-4">
            <Form.Label className="font-family-Roboto label">
              Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Please enter your password"
              className="form password"
              name="password"
              value={form.password}
              onChange={handleForm}
              onBlur={handleBlur}
            />
          </Form.Group>
          {err.password && (
            <p className="text-danger">Your password must contain 8-20 characters.</p>
          )}

         
          <button
            className="form-btn"
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            SIGN IN
          </button>
           <Link  to="/ForgetPassword" style={{"textDecoration" :"None"}}><p className="font-family-Roboto m-4 custom-p">Forgot password?</p></Link>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SignInCard;
