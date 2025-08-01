import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import CoachHeader from "../components/CoachHeader/CoachHeader";

function Layout({ children }) {
  const location = useLocation();

  // Define the route(s) where the header should be hidden
  const hideHeaderRoutes = [
    "/AthPage",
    "/tennis",
    "/football",
    "/basketball",
    "/Categories",
    "/AthWallet",
    "/videocall",
    "/coachchat",
    "/AthBlog",
    "/categories",
    "/homepage",
    "/yogasigninpage",
    "/programs",
    "/teachers",
    "/AthProfile",
    "/AthProfile",
    "/feedback",
  ];

  const locationPath = location.pathname; // Get the pathname from the location

  return (
    <>
      {/* Conditionally render the LandingHeader */}
      {/* {!hideHeaderRoutes.includes(location.pathname) && <CoachHeader />} */}
      {!hideHeaderRoutes.some((route) => locationPath.startsWith(route)) && (
        <CoachHeader />
      )}

      {children}
    </>
  );
}

export default Layout;
