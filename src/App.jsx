import { useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./CoachPage/Home/Home";
import WalletPage from "./CoachWallet/WalletPage";
import Chat from "./DashboardPages/AllChat/Chat";
import Dashboard from "./DashboardPages/Dashboard";
import Layout from "./Layout/Layout";
import AthBlog from "./Pages/AthBlog/AthBlog";
import AthPage from "./Pages/AthPage/AthPage";
import Athlete from "./Pages/AthleteForm/Athlete";
import EmailOtp from "./Pages/Authentication/Authentication";
import Bargraph from "./Pages/Bargraph/Bargraph";
import BasketBall from "./Pages/BasketBall/BasketBall";
import Categories from "./Pages/Categories/Categories";
import CoachBlog from "./Pages/CoachBlog/CoachBlog";
import Coach from "./Pages/CoachForm/Coach";
import CoachReviewPage from "./Pages/CoachReview/CoachReviewPage";
import CoachSchedule from "./Pages/CoachSchedule/CoachSchedule";
import CoachSection from "./Pages/CoachSection/CoachSection";
import CoachUpdatePage from "./Pages/CoachUpdatePage/CoachUpdatePage";
import Football from "./Pages/Football/Football";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import LogoutPage from "./Pages/LogoutPage/LogoutPage";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import SignUpHome from "./Pages/SignUpHome/SignUpHome";
import Tennis from "./Pages/TennisPage/Tennis";
import Homepage from "./Pages/YogaPages/Pages/homePage";
import Programs from "./Pages/YogaPages/Pages/programs";
import YogaSignInPage from "./Pages/YogaPages/Pages/signinPage";
import Teachers from "./Pages/YogaPages/Pages/teachers";
import AthProfile from "./components/AthProfile/AthProfile";
import AthWallet from "./components/AthWallet/AthWallet";
import { default as CoachEditProfile, default as CoachProfile } from "./components/CoachProfile/CoachProfile";
import Feedback from "./components/Feedback/Feedback";
import TermsAndConditions from "./components/TermsAndConditions/TermsAndCondition";
import HomePage from "./components/VideoCall/Home/Index";
import RoomPage from "./components/VideoCall/Room/Index";
import AuthContext from "./context/AuthContext/AuthContext";
import TokenContext from "./context/TokenContext/TokenContext";
// import NewVideoCall from "./components/VideoCall/NewVideoCall";
import Schedule from "./Pages/Categories/Schedule";
import ChangePassword from "./Pages/ForgetPassword/ChangePassword";
import EmailVarification from "./Pages/ForgetPassword/EmailVarification";
import ChatBox from "./components/ChatBox/ChatBox";
import ChatStateProvider from "./components/ChatBox/Context/ChatStateProvider";
import CoachChat from "./components/CoachChat/CoachChat";
import ChatInterface from "./components/ChatBox/ChatInterface";
import ChatSidebar from "./components/CoachChat/ChatSidebar";
import VideoCallIndex from "./components/NewVideoCall/VideoCallIndex";

function App() {
  const [getAuthenticated, setAuthenticated] = useState(false);

  // const location = useLocation();

  const manageState = (val) => {
    setAuthenticated(val);
  };
  return (
    <>
      <AuthContext>
        <ToastContainer pauseOnHover={false} autoClose={3000} />

        <TokenContext>
          <Router>
            {/* <LoginLandingPage/> */}
            <Layout />
            <Routes>
              <Route path="/email-otp-verification" element={<EmailOtp />} />
              <Route path="EmailVarification" element={<EmailVarification />} />
              <Route path="ChangePassword" element={<ChangePassword />} />
              <Route path="/signup" element={<SignUpHome />} />
              <Route path="/SignUpForm" element={<SignUp />} />
              <Route
                path="/SignInForm"
                element={<SignIn fun={manageState} />}
              />
              <Route path="/coach" element={<Coach />} />
              <Route path="/athlete" element={<Athlete />} />
              <Route path="/CoachUpdatePage" element={<CoachUpdatePage />} />
              <Route
                path="/CoachUpdatePage/:coachId"
                element={<CoachUpdatePage />}
              />
              <Route
                path="/logout"
                element={<LogoutPage fun={manageState} />}
              />

              <Route path="/categories/:sportName" element={<CoachSection />} />
              <Route path="/AthPage" element={<AthPage />} />
              <Route path="/" element={<Navigate to="/home" replace />} />

              <Route path="/tennis" element={<Tennis />} />
              <Route path="/football" element={<Football />} />
              <Route path="/basketball" element={<BasketBall />} />
              <Route path="/Categories" element={<Categories />} />
              <Route path="/coachschedule" element={<CoachSchedule />} />
              <Route path="/review" element={<CoachReviewPage />} />
              <Route path="/home" element={<Home />} />
              {/* <Route path="/blog" element={<Blog />} />*/}
              <Route
                path="/coachwallet"
                element={getAuthenticated ? <WalletPage /> : <SignIn />}
              />
              <Route
                path="/dashboard"
                element={getAuthenticated ? <Dashboard /> : <SignIn />}
              />
              <Route path="/chat" element={<Chat />} />
              <Route path="/videocall" element={<HomePage />} />
              {/* <Route
                path="/videocall/:sportName/:coachId"
                element={<RoomPage />}
              /> */}

               <Route
                path="/videocall/:sportName/:coachId"
                element={<VideoCallIndex />}
              />
              <Route path="/" element={<HomePage />} />
              <Route path="/room/:roomId" element={<VideoCallIndex />} />

              {/* <Route path="/videocall/:coachId" element={<VideoCall />} />
          <Route
            path="/videocall/:sportName/:coachId"
            element={<VideoCall />}
          /> */}
              {/* <Route path="/videocall" element={<VideoCall/>}/> */}
              <Route path="/coachchat" element={<CoachChat />} />
              <Route
                path="/ChatBox"
                element={
                  <ChatStateProvider>
                    {/* <ChatInterface /> */}
                    {/* <ChatSidebar/> */}
                    <ChatBox />
                  </ChatStateProvider>
                }
              />

              <Route
                path="/AthWallet"
                element={getAuthenticated ? <AthWallet /> : <SignIn />}
              />
              {/* {/* <Route 
  path="/AthWallet" 
  element={getAuthenticated ? <AthWallet /> : <Navigate to="/SignIn" state={{ from: location }} />} 
/> */}
              <Route
                path="/AthBlog"
                element={getAuthenticated ? <AthBlog /> : <SignIn />}
              />
              <Route
                path="/coachblog"
                element={getAuthenticated ? <CoachBlog /> : <SignIn />}
              />

              <Route path="/CoachProfile/:id" element={<CoachProfile />} />
              <Route
                path="/coachEditProfile/:coachId"
                element={<CoachEditProfile />}
              />
              <Route path="/ForgetPassword" element={<ForgetPassword />} />
              <Route path="/AthProfile" element={<AthProfile />} />
              <Route path="/Bargraph" element={<Bargraph />} />
              <Route path="/Schedule" element={<Schedule />} />
              <Route path="/coachschedule" element={<CoachSchedule />} />
              {/* <Route 
              path="/review/coachupdatepage"
              element={<CoachUpdatePage />}
            />
            <Route
              path="/schedule/coachupdatepage"
              element={<CoachUpdatePage />}
            />
            <Route
              path="/coachwallet/coachupdatepage"
              element={<CoachUpdatePage />}
            /> */}

              {/* Yoga Homepage */}
              <Route path="/homepage" element={<Homepage />} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/yogasigninpage" element={<YogaSignInPage />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/feedback/:sportName" element={<Feedback />} />
              <Route
                path="/TermsAndConditions"
                element={<TermsAndConditions />}
              />
            </Routes>
          </Router>
        </TokenContext>
      </AuthContext>
    </>
  );
}

export default App;
