import sideImageOfLogout from "../../assets/sideImageOfLogout.png"; // Side image asset for the logout page
import googleIcon from "../../assets/google-icon.svg"; // Google sign-in icon
import facebookIcon from "../../assets/facebook-icon.svg"; // Facebook sign-in icon
import appleIcon from "../../assets/apple-icon.svg"; // Apple sign-in icon
import "./LogoutPage.css"; // Importing CSS styles for the component
import { Link } from "react-router-dom"; // For navigation to different routes

const LogoutPage = (props) => {
  return (
    // Outer container with a full viewport height and custom background
    <div className="min-vh-100 custom-bg">
      {props.fun(false)}
      <div className="container p-5">
        {/* Row containing two main sections: image on the left and content on the right */}
        <div className="row bg-white">
          {/* Left column for displaying the side image */}
          <div className="col border-end border-black">
            <img src={sideImageOfLogout} className="img" alt="" />
          </div>

          {/* Right column for logout content and options */}
          <div className="col d-flex flex-column justify-content-center align-items-center">
            {/* Logout title */}
            <h3 className="text-primary font-family-Roboto m-4 custom-logOut">
              LOG OUT
            </h3>
            {/* Logout status message */}
            <p className="font-family-Roboto m-4 custom-para-logout">
              YOU ARE LOGGED OUT
            </p>
            {/* Link to redirect users to the signup page */}
            <Link to="/signup">
              <button className="font-family-Roboto m-4 custom-btn">
                SIGN IN
              </button>
            </Link>
            {/* Forgot password option */}
            <Link  to="/ForgetPassword" style={{"textDecoration" :"None"}}><p className="font-family-Roboto m-4 custom-p">Forgot password?</p></Link>

            {/* Section title for alternative sign-up options */}
            <p className="text-center font-weight-bold mb-2 custom-loginWith">
              Sign up with
            </p>
            {/* Icons for third-party sign-up options */}
            <div className="d-flex justify-content-center align-items-center m-4">
              {/* Google sign-in icon */}
              <img
                src={googleIcon}
                alt="Google"
                className="mx-2 cursor-pointer"
                aria-label="Sign in with Google"
              />
              {/* Facebook sign-in icon */}
              <img
                src={facebookIcon}
                alt="Facebook"
                className="mx-2 cursor-pointer"
                aria-label="Sign in with Facebook"
              />
              {/* Apple sign-in icon */}
              <img
                src={appleIcon}
                alt="Apple"
                className="mx-2 cursor-pointer"
                aria-label="Sign in with Apple"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
