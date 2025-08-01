import React, { useEffect, useState } from "react";
import axios from "axios";
import cookies from "js-cookie";
import reviwer from "../../assets/Review-ratingImg/reviewer.png";
import "./CoachreviewPage.css";
import backwardArrow from "../../assets/backwardArrow.svg";
import config from "../../config";
import { useNavigate } from "react-router-dom";

const CoachReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingDistribution, setRatingDistribution] = useState([0, 0, 0, 0, 0]);
  const [userRating, setUserRating] = useState(0); // NEW: Store athlete's rating
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      const token = cookies.get("auth_token");
      try {
        const response = await axios.get(`${config.baseURL}/get_all_reviews`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && response.data.success) {
          const fetchedReviews = response.data.reviews;
          setReviews(fetchedReviews);

          // Calculate average rating
          const totalRatings = fetchedReviews.reduce(
            (sum, review) => sum + review.rating,
            0
          );

          const avgRating = fetchedReviews.length
            ? totalRatings / fetchedReviews.length
            : 0;
          setAverageRating(avgRating.toFixed(1));

          // Calculate rating distribution
          const distribution = [0, 0, 0, 0, 0];
          fetchedReviews.forEach((review) => {
            distribution[5 - review.rating] += 1;
          });
          setRatingDistribution(distribution);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const handleRatingClick = (rating) => {
    setUserRating(rating); // Updates rating when athlete clicks
  };

  return (
    <div className="bg-black font-family-Roboto">
      <div className="px-5 d-flex align-items-center flex-wrap gap-3">
        <img
          src={backwardArrow}
          alt="Back"
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h4 className="fw-bold font-family-Roboto lh-base fs-2 text-light">
          Ratings
        </h4>
      </div>
      <div className="px-5 my-10">
        <div className="row">
          {/* Ratings Section */}
          <div className="col-md-7 col-sm-12 d-flex flex-wrap border-light coach-content">
            <div className="coach-img">
              <img src={reviwer} alt="Coach" />
            </div>
            <div>
              <h3 className="fw-bold font-family-Roboto lh-base fs-4 text-light mb-5">
                Ratings
              </h3>
              <p className="fw-medium fs-6 text-light">Your Rating</p>
              <h1 className="fw-bold font-family-Roboto lh-base fs-2 text-light my-4 mb-5">
                {[...Array(5)].map((_, index) => (
                  <i
                    key={index}
                    className={`fa-solid fa-star ${
                      index < userRating ? "text-warning" : "text-white"
                    } cursor-pointer`}
                    onClick={() => handleRatingClick(index + 1)} // Clickable stars
                  ></i>
                ))}
              </h1>
              <p className="fw-bold font-family-Roboto lh-base fs-4 text-light">
                Average ratings for this year: {averageRating}
              </p>
            </div>
          </div>

          {/* Bar Chart Section */}
          <div className="col-md-5 col-sm-12">
            {ratingDistribution.map((count, index) => (
              <div className="mb-2" key={5 - index}>
                <span className="text-light fs-5">{5 - index} ★</span>
                <div className="progress bg-black">
                  <div
                    className="progress-bar bg-success"
                    style={{
                      width: `${(count / reviews.length) * 100 || 0}%`,
                    }}
                  ></div>
                </div>
                <span className="text-white">{count} Reviews</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachReviewPage;
