// import React, { useState } from "react";

// // Importing the SignInCard component for the SignIn form
// import SignInCard from "./SignInCard/SignInCard";

// // Importing the side ball image for decoration
// import sideBallImage from "../../assets/sideBallImage.png";

// // Importing the CSS file for styling the SignIn component
// import "./SignIn.css";

// const SignIn = (props) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     // Main container for the SignIn page with full viewport height
//     <div className="coach-landing-page text-white d-flex flex-column min-vh-100">
//       {/* Section for the SignIn card and decorative circle */}
//       <div className="d-flex justify-content-center align-items-center gap-4 mt-4 flex-wrap">
//         {/* Rendering the SignInCard component */}
//         <SignInCard fun={props.fun} setIsLoggedIn={setIsLoggedIn} />

//         {/* Decorative gradient circle with a side ball image */}
//         <div className="gradient-circle position-relative text-center">
//           <img
//             src={sideBallImage} // Decorative image for visual enhancement
//             alt="Decorative Balls" // Accessibility: descriptive alt text for the image
//             className="side-ball-image position-absolute" // Positioned inside the gradient circle
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;


import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignInCard from "./SignInCard/SignInCard";
import sideBallImage from "../../assets/sideBallImage.png";
import "./SignIn.css";

const SignIn = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    // Authentication logic
    const successfulLogin = true; // Example ke liye

    if (successfulLogin) {
      props.fun(true);
      setIsLoggedIn(true);
      
      // Redirect user to previous page or default to home
      const redirectPath = location.state?.from?.pathname || "/home";
      navigate(redirectPath, { replace: true });
    }
  };

  return (
    <div className="coach-landing-page text-white d-flex flex-column min-vh-100">
      <div className="d-flex justify-content-center align-items-center gap-4 mt-4 flex-wrap">
        <SignInCard fun={props.fun} setIsLoggedIn={setIsLoggedIn} handleLogin={handleLogin} />
        <div className="gradient-circle position-relative text-center">
          <img src={sideBallImage} alt="Decorative Balls" className="side-ball-image position-absolute" />
        </div>
      </div>
    </div>
  );
};

export default SignIn;

