import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Feedback.css";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import cookies from "js-cookie";

const Feedback = () => {
  const location = useLocation();
  const { sportName } = useParams();
  const { coachId } = location.state || {};
  const [selected, setSelected] = useState(null);
  const [label, setLabel] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const emojis = [
    { id: 1, icon: "😔", label: "Very Bad", rating: 1 },
    { id: 2, icon: "😕", label: "Bad", rating: 2 },
    { id: 3, icon: "😐", label: "Medium", rating: 3 },
    { id: 4, icon: "😊", label: "Good", rating: 4 },
    { id: 5, icon: "😁", label: "Excellent", rating: 5 },
  ];

  // Debugging logs
  console.log("Location State: ", location.state);
  console.log("Sport Name:", sportName);
  console.log("Coach ID:", coachId);

  const handleClick = (id, label, rating) => {
    setSelected(id);
    setLabel(label);
    setRating(rating);
  };

  const handleSubmit = async () => {
    if (!rating || !comment.trim()) {
      alert("Please select a rating and provide a comment.");
      return;
    }

    const feedbackData = {
      coach_id: coachId, // Use coachId from location
      rating,
      comment,
    };

    try {
      const token = cookies.get("auth_token");
      if (!token) {
        alert("Authentication token missing. Please log in.");
        return;
      }

      setIsSubmitting(true);
      await axios.post("https://sports-backend-j4bp.onrender.com/create_review", feedbackData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      alert("Feedback submitted successfully!");
      navigate(`/coachsection/${sportName}`, { state: { coachId } });
    } catch (error) {
      console.error("Error submitting feedback:", error.response?.data || error.message);
      alert("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="py-5 d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="text-center mb-4">
        <h1>How are you feeling?</h1>
        <p className="feedback-description mt-3">
          Your feedback is valuable in helping us understand your needs better
          and tailor our services accordingly.
        </p>
      </div>

      {/* Emoji selection */}
      <div className="d-flex flex-wrap justify-content-center mb-4">
        {emojis.map((emoji) => (
          <div
            key={emoji.id}
            className={`emoji p-3 m-2 rounded-circle ${
              selected === emoji.id ? "emoji-selected" : "emoji-default"
            }`}
            onClick={() => handleClick(emoji.id, emoji.label, emoji.rating)}
            style={{ fontSize: "2rem", cursor: "pointer" }}
          >
            {emoji.icon}
          </div>
        ))}
      </div>

      {/* Label for selected emoji */}
      {label && (
        <div className="text-center mb-4">
          <strong>{label}</strong>
        </div>
      )}

      {/* Comment box */}
      <div className="w-100 w-md-50 d-flex justify-content-center">
        <textarea
          className="form-control mb-4"
          placeholder="Add a comment..."
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>

      {/* Submit button */}
      <div className="text-center">
        <button
          className="btn btn-primary w-100 py-2"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Now"}
        </button>
      </div>
    </div>
  );
};

export default Feedback;
