import { useState } from "react";
import { useNavigate } from "react-router-dom";
import coachLogIn from "../../assets/coachLogIn.svg"; // Import image for the coach role
import athleteLogIn from "../../assets/tennis player.png"; // Import image for the athlete role
import "./SignUpHome.css"; // Importing CSS styles for the component
import { toast } from "react-toastify";

const SignUpHome = () => {
  // State to track the selected role
  const [selectedRole, setSelectedRole] = useState(null);

  // Hook to navigate to different routes
  const navigate = useNavigate();

  // Roles array contains details about coach and athlete roles
  const roles = [
    {
      image: coachLogIn, // Image for the coach role
      title: "COACH", // Title of the role
      description:
        "Coach responsible for online training athletes in a sport by analyzing their performance, instructing in relevant skills, and providing encouragement.",
      path: "/SignUpForm?role=CoachProfile",
    },
    {
      image: athleteLogIn, // Image for the athlete role
      title: "ATHLETE", // Title of the role
      description:
        "Athletes responsible for carrying out game or competition strategies while following the rules of their sport. They compete in team and individual sports like tennis, football.",
      path: "/SignUpForm?role=AthProfile",
    },
  ];

  // Handles the click event when a role is selected
  const handleRoleClick = (role) => {
    setSelectedRole(role); // Update the selected role in state
  };

  // Handles the continue button click
  const handleContinue = () => {
    if (selectedRole) {
      // Navigate to the selected role's path if a role is chosen
      navigate(selectedRole.path);
    } else {
      // Show an toast message if no role is selected
      toast.error("Please select a role before continuing.");
    }
  };

  return (
    <div className="signupPage">
      {/* Background container for the landing page */}
      <div className="background-image">
        {/* Title prompting the user to select a role */}
        <h3 className="text-center text-danger lh-lg fw-bold">
          Please Decide Your Role
        </h3>
        {/* Display role cards for selection */}
        <div className="d-flex align-items-center justify-content-around text-center flex-wrap gap-3">
          {roles.map((role, index) => (
            <div
              key={index} // Unique key for each role
              className={`d-flex mt-0 flex-column align-items-center ${
                selectedRole?.title === role.title ? "selected-role" : "" // Highlight the selected role
              } role-card`}
              onClick={() => handleRoleClick(role)} // Handle role selection
            >
              {/* Role image */}
              <img
                src={role.image}
                className="role-image"
                alt={`${role.title} Login`} // Alt text for accessibility
              />
              {/* Button to display role title */}
              <button className="role-btn">{role.title}</button>
              {/* Paragraph to describe the role */}
              <p className="role-text p-3">{role.description}</p>
            </div>
          ))}
        </div>
        {/* Continue button */}
        <div className="text-center mt-2">
          <button className="continueBtn" onClick={handleContinue}>
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpHome;
