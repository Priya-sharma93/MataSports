import React, { useState } from "react";
import { Navbar, Container, Nav, Offcanvas, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoWhite from "../../assets/logoWhite.svg";
import "./CoachHeader.css";
import { useAuthContext } from "../../context/AuthContext/AuthContext";
import cookies from "js-cookie";

function CoachHeader() {
  const { pathname } = useLocation();
  const isOnDashboard = pathname === "/dashboard";

  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn } = useAuthContext();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
    cookies.remove("isLoggedIn");
    cookies.remove("auth_token");
    cookies.remove("isVerified");
    navigate("/logout"); // Redirect to login after logout
  };

  return (
    <>
      {/* Navbar Component */}
      <Navbar expand="lg" sticky="top" className="navbar">
        <Container fluid className="px-8">
          {/* Logo Section */}
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img src={logoWhite} alt="Logo" className="header-logo" />
          </Navbar.Brand>

          {/* Mobile Menu Toggle */}
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={handleShow}
          />

          {/* Navigation Menu */}
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className={`justify-content-between ${show ? "d-none" : ""}`}
          >
            <Nav className="me-auto mb-2 mb-md-0 justify-content-center flex-grow-1">
              <Nav.Link as={Link} to="/home">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/coachblog">
                Blogs
              </Nav.Link>
              <Nav.Link as={Link} to="/coachwallet">
                Wallet
              </Nav.Link>
              <Nav.Link as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
            </Nav>

            {/* Desktop Buttons */}
            {!isOnDashboard && (
              <div className="d-none d-md-flex align-items-center">
                {isLoggedIn ? (
                  <Button
                    variant="light"
                    onClick={handleLogout}
                    className="me-5"
                  >
                    Log Out
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="light"
                      className="me-2"
                      as={Link}
                      to="/SignInForm"
                    >
                      Sign In
                    </Button>
                    <Button variant="light" as={Link} to="/signup">
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Mobile Menu Offcanvas */}
      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column mb-3">
            <Nav.Link as={Link} to="/" onClick={handleClose}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/coachblog" onClick={handleClose}>
              Blogs
            </Nav.Link>
            <Nav.Link as={Link} to="/coachwallet" onClick={handleClose}>
              Wallet
            </Nav.Link>
            <Nav.Link as={Link} to="/dashboard" onClick={handleClose}>
              Dashboard
            </Nav.Link>
          </Nav>

          {/* Mobile Buttons */}
          <div className="d-flex flex-column">
            {isLoggedIn ? (
              <Button
                variant="primary"
                className="mb-2"
                onClick={() => {
                  handleLogout();
                  handleClose();
                }}
              >
                Log Out
              </Button>
            ) : (
              <>
                <Button
                  variant="primary"
                  className="mb-2"
                  as={Link}
                  to="/SignInForm"
                  onClick={handleClose}
                >
                  Login
                </Button>
                <Button
                  variant="primary"
                  as={Link}
                  to="/signup"
                  onClick={handleClose}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default CoachHeader;
