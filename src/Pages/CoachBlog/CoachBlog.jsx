import React from "react";

function CoachBlog() {
  return (
    <div className="container mt-5">
      {/* Blog Header */}
      <div className="text-center mb-4">
        <h1 className="display-4">
          How Coaches Help Athletes in a Sports Professional Journey
        </h1>
        <p className="lead text-muted">
          Discover how a coach can transform an athlete's potential into a
          thriving career.
        </p>
      </div>

      {/* Blog Content */}
      <div className="row mb-5">
        {/* Blog Image */}
        <div className="col-md-6">
        <img 
          src="https://placehold.co/600x400"
          alt="Coach guiding athlete" 
          className="img-fluid rounded shadow"
          />
        </div>

        {/* Introduction */}
        <div className="col-md-6">
          <h2>The Dynamic Duo: Coach and Athlete</h2>
          <p>
            Behind every successful athlete is a coach who acts as a guide,
            motivator, and strategist. A coach plays a critical role in refining
            skills, building mental resilience, and fostering confidence,
            helping athletes to achieve their full potential.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-5">
        <h2>The Role of a Coach in an Athlete's Career</h2>
        <p>
          A coach is not just a trainer but a mentor who helps athletes set
          goals, overcome challenges, and maintain consistency. Here’s how
          coaches help athletes advance their careers:
        </p>

        <div className="row">
          {/* Key Point 1 */}
          <div className="col-md-4 text-center">
            <div className="card shadow-sm p-3 mb-4">
              <h3 className="card-title">Skill Development</h3>
              <p className="card-text">
                Coaches design personalized training routines to help athletes
                master their craft, focusing on improving their strengths and
                addressing weaknesses.
              </p>
            </div>
          </div>

          {/* Key Point 2 */}
          <div className="col-md-4 text-center">
            <div className="card shadow-sm p-3 mb-4">
              <h3 className="card-title">Mental Toughness</h3>
              <p className="card-text">
                Building mental resilience is crucial in sports. Coaches provide
                psychological support to help athletes handle pressure,
                setbacks, and competition stress.
              </p>
            </div>
          </div>

          {/* Key Point 3 */}
          <div className="col-md-4 text-center">
            <div className="card shadow-sm p-3 mb-4">
              <h3 className="card-title">Strategic Planning</h3>
              <p className="card-text">
                Coaches develop strategies for competitions and create
                structured schedules for training, ensuring athletes peak at the
                right time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mentorship Section */}
      <div className="mt-5">
        <h2>Mentorship Beyond the Field</h2>
        <p>
          A coach’s role goes beyond the physical aspects of training. They are
          life mentors who provide guidance on decision-making, teamwork, and
          character development. This mentorship is crucial for long-term
          growth, both in and out of the sports arena.
        </p>
        <blockquote className="blockquote bg-light p-4 rounded">
          <p>
            "The difference between an average athlete and a great one often
            lies in the quality of mentorship they receive."
          </p>
          <footer className="blockquote-footer">Anonymous</footer>
        </blockquote>
      </div>

      {/* Conclusion */}
      <div className="mt-5">
        <h2>Conclusion</h2>
        <p>
          Coaches are indispensable in an athlete's professional journey. From
          perfecting techniques to instilling discipline, their influence shapes
          not just athletic performance but also life skills. If you’re an
          aspiring athlete, finding the right coach could be the key to
          unlocking your potential and building a successful career.
        </p>
        <div className="text-center mt-4">
          <button className="btn btn-primary">Explore More Articles</button>
        </div>
      </div>
    </div>
  );
}

export default CoachBlog;
