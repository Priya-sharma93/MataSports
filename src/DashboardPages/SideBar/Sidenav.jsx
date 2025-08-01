import { useState } from "react";
import { IoCalendarClearOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

import {
  Button,
  Image,
  ListGroup,
  Nav,
  OverlayTrigger,
  Stack,
  Tooltip,
} from "react-bootstrap";
import { GoStarFill } from "react-icons/go";
import {
  IoBarChartOutline,
  IoBarChartSharp,
  IoWalletOutline,
} from "react-icons/io5";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

import arrowicon from "../../assets/Images/DashboardImage/arrowicon.png";
import chatboyone from "../../assets/Images/DashboardImage/chatboyone.png";
import chatgirlone from "../../assets/Images/DashboardImage/chatgirlone.png";
import chatmen from "../../assets/Images/DashboardImage/chatmen.png";
import professionals from "../../assets/Images/DashboardImage/professionals.png";
import sidenavgirl from "../../assets/Images/DashboardImage/sidenavgirl.png";
import start from "../../assets/Images/DashboardImage/start.png";
//import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";

import { IoMdHome } from "react-icons/io";
import "./Sidenav.css";

// const [ratings, setRatings] = useState([]);
  
//     useEffect(() => {
//         fetch("https://sports-backend-0t76.onrender.com/api/ratings/weekly")
//         .then((res) => res.json())
//         .then((data) => setRatings(data))
//         .catch((err) => console.error('Error Fetching Data:',err));
//     }, []);


function Sidenav() {
  const [showMenu, setShowMenu] = useState(false);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{ width: "8vw", height: "50vw" }}
    >
      {!showMenu ? (
        <>
          <Button
            variant="light"
            onClick={handleToggleMenu}
            className="mb-3 d-flex align-items-center justify-content-center"
          >
            <Image src={arrowicon} alt="Arrow Icon" width={14} height={14} />
          </Button>
          <Nav className="d-flex flex-column justify-content-center align-items-center text-center h-100">
           <Link to="/CoachUpdatePage/2"> <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Profile</Tooltip>}
            >
              <Nav.Item>
                <Image src={sidenavgirl} roundedCircle width={23} height={23} />
              </Nav.Item>
            </OverlayTrigger></Link>
            <Nav.Item>
              <Link to="/">
                <IoMdHome size={24} className="my-5"></IoMdHome>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/Bargraph">
                <IoBarChartSharp size={24} className="my-3" />
                
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/coachschedule">
                <IoCalendarClearOutline size={24} className="my-3" />
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/review">
                <GoStarFill size={24} className="my-3" />
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/coachwallet">
                <IoWalletOutline size={24} className="my-3" />
              </Link>
            </Nav.Item>
            <Nav.Item className="mt-4">
              <Image src={professionals} width={24} height={70} />
            </Nav.Item>
            <Nav.Item className="mt-3">
              <Link to="/logout">
                <Image src={start} width={24} height={24} />
              </Link>
            </Nav.Item>
          </Nav>
        </>
      ) : (
        <div className="w-100">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Button variant="light" onClick={handleToggleMenu}>
              <MdOutlineKeyboardArrowLeft size={24} />
            </Button>
            <h5>Menu</h5>
          </div>
          <div className="text-center mb-4">
            <Image
              src={sidenavgirl}
              roundedCircle
              width={50}
              height={50}
              alt="Profile"
            />
            <p className="mt-2">Profile</p>
          </div>
          <Stack direction="vertical" gap={3} className="align-items-center">
            <IoMdHome size={24} />
            <IoBarChartOutline size={24} />
            <IoCalendarClearOutline size={24} />
            <GoStarFill size={24} />
            <IoWalletOutline size={24} />
          </Stack>
          <div className="mt-4">
            <h6>Chat History</h6>
            <ListGroup>
              <ListGroup.Item className="d-flex align-items-center">
                <Image
                  src={chatgirlone}
                  roundedCircle
                  width={30}
                  height={30}
                  alt="Chat Girl"
                />
                <span className="ms-2">Karthryn Murphy</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex align-items-center">
                <Image
                  src={chatboyone}
                  roundedCircle
                  width={30}
                  height={30}
                  alt="Chat Boy"
                />
                <span className="ms-2">Janee Kuperr</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex align-items-center">
                <Image
                  src={chatmen}
                  roundedCircle
                  width={30}
                  height={30}
                  alt="Chat Men"
                />
                <span className="ms-2">Albert Flores</span>
              </ListGroup.Item>
            </ListGroup>
          </div>
          <div className="mt-4">
            <Link to="/chat">
              <Button variant="primary" className="w-100">
                Chat
              </Button>
            </Link>
            <Link to="/logout">
              <div className="d-flex align-items-center mt-3">
                <Image
                  src={start}
                  roundedCircle
                  width={30}
                  height={30}
                  alt="Start"
                />

                <span className="ms-2">Log out</span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidenav;
