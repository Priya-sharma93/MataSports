import React from "react";
import { useState ,useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";
import Cardwomen from "../../assets/Images/DashboardImage/Cardwomen.png";
import Womenone from "../../assets/Images/DashboardImage/Womenone.png";
import womentwo from "../../assets/Images/DashboardImage/womentwo.png";
import menthree from "../../assets/Images/DashboardImage/menthree.png";
import womenthree from "../../assets/Images/DashboardImage/womenthree.png";
import Graph from "../../assets/Images/DashboardImage/Graph.png";
import BarGraph from "../../assets/Images/DashboardImage/BarGraph.png";
import Transactionmodal from "../../components/Transactionmodel/Transactionmodel";
import { IoIosStar } from "react-icons/io";
import "./Banner.css";

function Banner() {
  const [ishidden, setishidden] = useState("none");

  const [isopacity, setopacity] = useState(1);

   const [ratings, setRatings] = useState([]);
  
    useEffect(() => {
        fetch("https://sports-backend-x6w5.onrender.com/api/ratings/weekly")
        .then((res) => res.json())
        .then((data) => setRatings(data))
        .catch((err) => console.error('Error Fetching Data:',err));
    }, []);

  const seeall = () => {
    setishidden("flex");
    setopacity(0.7);
  };

  const cross = () => {
    setishidden("none");
    setopacity(1);
  };

  return (
    <>
      {/* Banner starts */}
      <div className="parent ">
        {/* {isModalOpen === false ? ( */}
        <div
          className="d-flex flex-row "
          style={{
            opacity: isopacity,
            height: "2vw",
            width: "30vw",
            marginTop: "-1vw",
            position: "relative",
          }}
        >
          <div
            className="d-flex  "
            style={{
              height: "3vw",
              width: "35vw",
              marginLeft: "4vw",
              marginTop: "2vw",
              gap: "20vw",
            }}
          >
            <div>
              <div className="card mt-2 ">
                <div className="row g-0">
                  <div
                    className="col-md-4"
                    style={{
                      Width: "100%",
                      height: "20%",
                    }}
                  >
                    <img
                      src={Cardwomen}
                      className="img rounded"
                      class="professional-girl"
                      style={{
                        Width: "20%",
                        height: "7vw",
                        objectFit: "contain",
                        // marginRight: "6vw",
                        // marginTop: "1vw",
                        // background: "green",
                      }}
                      alt="cardwomen"
                    />
                  </div>
                  {/* card-one */}
                  <div className="col-md-8 d-flex align-items-center ">
                    <div className="card-body">
                      <h5 className="card-title" style={{ marginLeft: "2vw" }}>
                        Gayathri harun taj
                      </h5>
                      <p
                        className="card-text d-flex,flex-row"
                        style={{ marginLeft: "2vw" }}
                      >
                        <p>
                          4.0
                          <IoIosStar
                            style={{ color: "gold", marginRight: "0.5vw" }}
                          />
                          <IoIosStar
                            style={{ color: "gold", marginRight: "0.5vw" }}
                          />
                          <IoIosStar
                            style={{ color: "gold", marginRight: "0.5vw" }}
                          />
                          <IoIosStar
                            style={{ color: "gold", marginRight: "0.5vw" }}
                          />
                        </p>
                      </p>
                      <h5
                        className="card-text"
                        style={{ marginTop: "-1vw", marginLeft: "2vw" }}
                      >
                        Tennis coach
                      </h5>
                      {/* <p className="card-text">
                  <small className="text-body-secondary">
                    Last updated 3 mins ago
                  </small>
                </p> */}
                    </div>
                  </div>
                </div>
              </div>
              {/* Upcoming Session */}
              <div
                className="card mt-2  bg-white"
                style={{ height: "12vw", maxwidth: "17rem" }}
              >
                <div className="d-flex">
                  <div
                    className="mt-1"
                    style={{ fontWeight: "bold", marginLeft: "1vw" }}
                  >
                    Upcoming session
                  </div>
                  <p
                    className="mt-2"
                    style={{ fontSize: "0.7vw", marginLeft: "9vw" }}
                  >
                    See all schedule page
                  </p>
                </div>

                <div
                  className="card-body"
                  style={{
                    backgroundColor: "#11146D",
                    borderRadius: "1vw",
                    height: "7vw",
                    width: "29vw",
                    marginTop: "0vw",
                    marginBottom: "0.5vw",
                    marginLeft: "1rem",
                    textWrap: "wrap",

                    // marginRight:"1rem",

                    // marginBottom: "0.5vw",
                    // marginLeft: "1vw",
                  }}
                >
                  <p className="card-text" style={{ color: "white" }}>
                    Join your teaching session 03-09-2021 at
                    <p
                      className="card-text"
                      style={{ textAlign: "center", marginBottom: "0.2vw" }}
                    >
                      11.00 Am Asia
                    </p>
                    <div className="">
                      <div className="row">
                        <div
                          className="col-3"
                          style={{
                            textAlign: "center",
                            marginBottom: "0.2vw",
                            fontSize: "1vw",
                          }}
                        >
                          02 <br /> days
                        </div>
                        <div
                          className="col-3"
                          style={{
                            textAlign: "center",
                            marginBottom: "0.2vw",
                            fontSize: "1vw",
                          }}
                        >
                          48
                          <br /> hours
                        </div>
                        <div
                          className="col-3"
                          style={{
                            textAlign: "center",
                            marginBottom: "0.2vw",
                            fontSize: "1vw",
                          }}
                        >
                          10 <br /> minutes
                        </div>
                        <div
                          className="col-3"
                          style={{
                            textAlign: "center",
                            marginBottom: "0.2vw",
                            fontSize: "1vw",
                          }}
                        >
                          30 <br />
                          seconds
                        </div>
                      </div>
                    </div>
                  </p>
                </div>
              </div>
              <div className="card mt-2">
                <div className="card-body">
                  <blockquote
                    className="blockquote  d-flez "
                    style={{ marginTop: "1vw" }}
                  >
                    <p
                      className=" fs-6"
                      style={{
                        height: "5vw",
                        color: "#2634AC",
                        marginTop: "-1vw",
                        fontWeight: "600",
                      }}
                    >
                      Your coaching session has ended, please select from the
                      option below:
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="exampleRadios"
                          id="exampleRadios1"
                          value="option1"
                          checked
                        />
                        <label
                          className="form-check-label"
                          style={{ color: "black" }}
                          for="exampleRadios1"
                        >
                          I attend the session
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="exampleRadios"
                          id="exampleRadios2"
                          value="option2"
                        />
                        <label
                          className="form-check-label"
                          style={{ color: "black" }}
                          for="exampleRadios2"
                        >
                          i wasn't able to attend submit
                        </label>
                      </div>
                      <br />
                    </p>
                  </blockquote>
                </div>
              </div>
              <div
                className="card mb-3"
                style={{ width: "27rem", marginTop: "1vw" }}
              >
                <div
                  className="card-title mt-2"
                  style={{ fontWeight: "700", marginLeft: "2vw" }}
                >
                  Settings
                </div>

                <i
                  className="bi bi-lock d-flex mt-2"
                  style={{ marginLeft: "1vw" }}
                >
                  <p className="" style={{ marginLeft: "1vw" }}>
                    Password
                  </p>
                </i>
                <i
                  className="bi bi-envelope d-flex"
                  style={{ marginLeft: "1vw" }}
                >
                  <p className="" style={{ marginLeft: "1vw" }}>
                    EmailID
                  </p>
                </i>

                <i
                  className="bi bi-paypal d-flex"
                  style={{ marginLeft: "1vw" }}
                >
                  <p className="" style={{ marginLeft: "1vw" }}>
                    paypal
                  </p>
                </i>
                <i className="bi bi-trash d-flex" style={{ marginLeft: "1vw" }}>
                  <p className="" style={{ marginLeft: "1vw" }}>
                    Delete
                  </p>
                </i>
              </div>
            </div>
          </div>
          {/* Transaction card*/}
          <div className="">
            <div
              className="card"
              style={{
                height: "23vw",
                width: "30vw",
                marginTop: "3vw",
                marginLeft: "1vw",
              }}
            >
              <div className="">
                <h5
                  className="card-title d-flex"
                  style={{
                    marginLeft: "0vw",
                    fontWeight: "650",
                    marginTop: "1vw",

                    whiteSpace: "nowrap",
                  }}
                >
                  Transaction history
                  <p
                    className=""
                    style={{
                      marginLeft: "7vw",
                      fontSize: "1vw",
                      color: "grey",
                      textDecorationLine: "underline",
                    }}
                  >
                    See transaction page
                  </p>
                </h5>

                <div
                  className="card-body"
                  style={{
                    backgroundColor: "#11146D",
                    borderRadius: "1vw",
                    height: "20vw",
                    width: "35vw",
                    transform: "scale(0.8)",
                    margin: "-1vw -2vw",
                  }}
                >
                  <p
                    className="card-text d-flex"
                    style={{ color: "white", borderBottom: "1px solid grey" }}
                  >
                    <h5>Transaction</h5>
                    <h5
                      className=""
                      style={{
                        marginLeft: "17vw",
                        fontSize: "1.5vw",
                        marginTop: "0.4vw",
                        textDecorationLine: "underline",
                      }}
                    >
                      {/* See All */}
                      <h5 onClick={seeall}>See All</h5>
                      {/* Conditionally render the modal */}
                    </h5>
                  </p>
                  <div
                    className="d-flex justify-content-between "
                    style={{
                      color: "white",
                      padding: "5px",
                      gap: "1vw",
                    }}
                  >
                    <div>
                      <i
                        className="bi bi-wallet2 "
                        style={{
                          color: "white",
                          marginRight: "4vw",
                          padding: "5px",
                        }}
                      >
                        Received from Riya
                      </i>
                      <br />
                      <small
                        className="text-white"
                        style={{
                          fontSize: "0.8vw",
                          marginLeft: "2vw",
                        }}
                      >
                        17.03.2023, 10:00 AM
                      </small>
                      <br />
                    </div>

                    <span className="text-warning font-weight-bold">
                      + $600
                    </span>
                  </div>
                  {/* second */}
                  <div
                    className="d-flex justify-content-between "
                    style={{
                      color: "white",

                      padding: "5px",
                      gap: "1vw",
                    }}
                  >
                    <div>
                      <i
                        className="bi bi-wallet2 "
                        style={{
                          color: "white",
                          marginRight: "4vw",
                          padding: "5px",
                        }}
                      >
                        Received from Anu
                      </i>
                      <br />
                      <small
                        className="text-white"
                        style={{
                          fontSize: "0.8vw",
                          marginLeft: "2vw",
                        }}
                      >
                        20.03.2023, 10:00 AM
                      </small>
                      <br />
                    </div>

                    <span className="text-warning font-weight-bold">
                      + $200
                    </span>
                  </div>
                  {/* third*/}
                  <div
                    className="d-flex justify-content-between "
                    style={{
                      color: "white",

                      padding: "5px",
                      gap: "1vw",
                    }}
                  >
                    <div>
                      <i
                        className="bi bi-wallet2 "
                        style={{
                          color: "white",
                          marginRight: "4vw",
                          padding: "5px",
                        }}
                      >
                        Received from Kira
                      </i>
                      <br />
                      <small
                        className="text-white"
                        style={{
                          fontSize: "0.8vw",
                          marginLeft: "2vw",
                        }}
                      >
                        21.03.2023, 10:00 AM
                      </small>
                      <br />
                    </div>

                    <span className="text-warning font-weight-bold">+ $30</span>
                  </div>
                </div>
                <br />
              </div>
            </div>
            {/* graph */}
            <div className="row graph">
              <img src={Graph} alt="graph" className="col-12" />
            </div>
          </div>
          <div>
            {/* right */}

            <div
              className="card"
              style={{
                height: "23vw",
                width: "25vw",
                marginTop: "3vw",
                marginLeft: "0vw",
              }}
            >
              <h6 style={{ padding: "10px", marginBottom: "15px" }}>
                My Latest Athletes Chat
              </h6>
              <div
                className="card mb-3"
                style={{
                  maxWidth: "92%",
                  maxHeight: "49px",
                  overflow: "hidden",
                  marginLeft: "1vw",
                }}
              >
                <div className="row g-0">
                  <td
                    className="align-middle customer white-space-nowrap "
                    id="customer"
                  >
                    <div className="d-flex ">
                      <div className="avatar avatar-l">
                        <img
                          className="rounded-circle"
                          id="womenone"
                          src={Womenone}
                          alt="womenone"
                        />
                      </div>
                      <h6
                        className=" text-body d-flex flex-column"
                        id="Christina"
                      >
                        Christina Joshap
                      </h6>

                      <small className="" id="hello">
                        Hello what's up
                      </small>
                    </div>
                  </td>
                </div>
              </div>
              {/* second */}
              <div
                className="card mb-3"
                style={{
                  maxWidth: "92%",
                  maxHeight: "49px",
                  overflow: "hidden",
                  marginLeft: "1vw",
                }}
              >
                <div className="row g-0">
                  <td
                    className="align-middle customer white-space-nowrap "
                    id="customer"
                  >
                    <div className="d-flex ">
                      <div className="avatar avatar-l">
                        <img
                          className="rounded-circle"
                          id="womenone"
                          src={womentwo}
                          alt="womentwo"
                        />
                      </div>
                      <h6
                        className=" text-body d-flex flex-column"
                        id="Christina"
                      >
                        Meera Krishna tej
                      </h6>

                      <small className="" id="hello">
                        Hello what's up
                      </small>
                    </div>
                  </td>
                </div>
              </div>
              {/* third */}
              <div
                className="card mb-3"
                style={{
                  maxWidth: "92%",
                  maxHeight: "49px",
                  overflow: "hidden",
                  marginLeft: "1vw",
                }}
              >
                <div className="row g-0">
                  <td
                    className="align-middle customer white-space-nowrap "
                    id="customer"
                  >
                    <div className="d-flex ">
                      <div className="avatar avatar-l">
                        <img
                          className="rounded-circle"
                          id="womenone"
                          src={menthree}
                          alt="menthree"
                        />
                      </div>
                      <h6
                        className=" text-body d-flex flex-column"
                        id="Christina"
                      >
                        Aravindh Kihorer
                      </h6>

                      <small className="" id="hello">
                        Hello what's up
                      </small>
                    </div>
                  </td>
                </div>
              </div>
              {/* fourth */}
              <div
                className="card mb-3"
                style={{
                  maxWidth: "92%",
                  maxHeight: "49px",
                  overflow: "hidden",
                  marginLeft: "1vw",
                }}
              >
                <div className="row g-0">
                  <td
                    className="align-middle customer white-space-nowrap "
                    id="customer"
                  >
                    <div className="d-flex ">
                      <div className="avatar avatar-l">
                        <img
                          className="rounded-circle"
                          id="womenone"
                          src={womenthree}
                          alt="womenthree"
                        />
                      </div>
                      <h6
                        className=" text-body d-flex flex-column"
                        id="Christina"
                      >
                        Choraphligana ji
                      </h6>

                      <small className="" id="hello">
                        Hello what's up
                      </small>
                    </div>
                  </td>
                </div>
              </div>
            </div>

            {/* <div className="row graph" id="bargraph">
                          <img src={BarGraph} alt="bargraph" className="col-9" />
                        </div> */}
                    <div style = {{ width: '100%' ,height: 300, marginRight: 20}}>
                        {/* <h6>Weekly Ratins Overview</h6> */}
                    <ResponsiveContainer width= "100%" height="100%">
                      <BarChart data={ratings} margin={{ top: 20, right: 40, left: 20, bottom: 5}}>
                        <CartesianGrid strokeDasharry="3 3"/>
                          <XAxis dataKey="day"/>
                          <YAxis allowedDecimals={false}/>
                        <Tooltip/>
                      <Bar dataKey="count" fill="#4A90E2"/>                 
                    </BarChart>
                  </ResponsiveContainer>
                </div>
          </div>
        </div>
        {/* ) : ( */}
        <div
          className="transaction"
          style={{
            display: ishidden,
            height: "100vh",
            width: "100vw",
            position: "relative",
            marginTop: "2vw",

            /* background-color: rgb(206, 187, 187); */
            paddingLeft: "15vw",
          }}
        >
          <Transactionmodal cross={cross} />
          {/* isOpen={isModalOpen} onClose={closeModal} */}
        </div>
        {/* )} */}
      </div>
    </>
  );
}

export default Banner;
