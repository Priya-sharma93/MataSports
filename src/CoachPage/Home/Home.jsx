import React from "react";
import Hero from "./Hero/Hero";
import Review from "./Review/Review";
import Worldmap from "./WorldMap/Worldmap";
import About from "./About/About";

import CoachSports from "./CoachSports/CoachSports";
import Footer from "../../components/Footer";
import ForgetPassword from "../../Pages/ForgetPassword/ForgetPassword";

function Home() {
  return (
    <>
      <Hero />
      <Review />
      <Worldmap />
      <About />
      <CoachSports />
      <Footer />
      {/* <ForgetPassword/> */}
    </>
  );
}

export default Home;
