import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Components/footer";
import "../index.css";

const YogaSignInPage = () => {
  return (
    <div className="d-flex flex-column vh-100">
      {/* Main Content */}
      <div className="flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="col-8 col-md-6 col-lg-4 bg-white p-4">
          <div className="w-100">
            <h1 className="mb-5 text-left fw-bold text-muted">Hello</h1>
            <form>
              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email">E-mail address *</label>
                <input
                  type="email"
                  className="form-control text-muted fw-bold"
                  id="email"
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label htmlFor="password">Password *</label>
                <input
                  type="password"
                  className="form-control text-muted fw-bold"
                  id="password"
                />
              </div>

              {/* Forgot Password */}
              <div className="mb-3">
                <a
                  href="/forgot-password"
                  className="text-decoration-none fw-bold text-darkblue"
                >
                  Forgot your password?
                </a>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-100 mb-3 border-0 py-3 fw-bold text-white fs-3 btn-red"
              >
                Sign in
              </button>
            </form>

            {/* Create Account */}
            <p className="text-center">
              Don’t have an account?{" "}
              <a href="/signup" className="text-decoration-none">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default YogaSignInPage;
