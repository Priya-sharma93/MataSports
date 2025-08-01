import React from "react";
import AthHeader from "../AthPage/AthHeader/AthHeader";

function AthBlog() {
  return (
    <>
      <AthHeader />
      <div className="container mt-5">
        <div className="text-center mb-4">
          <h1 className="display-4">
            Why We Need a Coach or Mentor in a Sports Professional Journey
          </h1>
          <p className="lead text-muted">
            Insights into the crucial role of mentors in shaping athletes'
            success stories.
          </p>
        </div>

        <div className="row">
          {/* Blog Image */}
          <div className="col-md-6">
          <img
          src="https://placehold.co/500x300"
          alt="Sports mentorship"
          className="img-fluid rounded shadow"
          width="500"
          height="300"  
          />

          </div>

          {/* Blog Content */}
          <div className="col-md-6">
            <h2 className="mb-3">The Role of a Coach</h2>
            <p>
              A coach is more than just a trainer. They serve as a guide,
              strategist, and motivator, helping athletes unlock their full
              potential. Whether it's refining techniques or building mental
              resilience, a good coach lays the foundation for long-term
              success.
            </p>
            <h3 className="mb-3">Key Benefits of Having a Coach:</h3>
            <ul>
              <li>
                <strong>Skill Development:</strong> Coaches provide technical
                guidance to improve performance.
              </li>
              <li>
                <strong>Mental Support:</strong> They help athletes overcome
                challenges and maintain focus.
              </li>
              <li>
                <strong>Strategic Planning:</strong> Coaches plan training
                sessions tailored to individual needs.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-5">
          <h2>Why Mentorship Matters</h2>
          <p>
            Mentors offer invaluable wisdom gained from their own experiences,
            enabling young athletes to avoid pitfalls and make informed
            decisions. Mentorship fosters confidence and builds a solid support
            system for navigating the ups and downs of a sports career.
          </p>
          <blockquote className="blockquote bg-light p-4 rounded">
            <p>
              "Behind every successful athlete, there's a mentor who believed in
              their potential before anyone else did."
            </p>
            <footer className="blockquote-footer">My Mentor</footer>
          </blockquote>
        </div>

        <div className="mt-5">
          <h2>Conclusion</h2>
          <p>
            Whether you're an aspiring athlete or a seasoned professional,
            having a coach or mentor is indispensable. They shape not just your
            career but also your character, preparing you for the challenges
            that lie ahead. Invest in mentorship—it’s a game-changer!
          </p>
        </div>

        <div className="text-center mt-5">
          <button className="btn btn-primary">Read More Blogs</button>
        </div>
      </div>
    </>
  );
}

export default AthBlog;
