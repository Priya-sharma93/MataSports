import { GoArrowUpRight } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import img1 from "../../assets/w1.png";
import img2 from "../../assets/w2.png";
import img3 from "../../assets/m3.png";
import img4 from "../../assets/w4.png";
import { RxDotFilled } from "react-icons/rx";

import "./Chat.css";

function Chat() {
  return (
    <div className="main-chat-container">
      <div className="col-md-12 d-flex justify-content-between">
        <button type="button" className="btn btn-primary rounded-pill mt-2">
          Chat history
        </button>
        <GoArrowUpRight />
      </div>
      <br />
      <div className="d-flex gap-2">
        <div className="col-md-4 ">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <form>
                <div className="input-group search rounded-5 shadow-sm bg-white rounded">
                  <FaSearch className="m-2" />
                  <input
                    type="text"
                    className="form-control rounded-5"
                    placeholder="Search or start new chat"
                    aria-label="Search"
                  />
                </div>
              </form>
            </div>
          </div>
          <br />
          <div className="col-md-12 ">
            <div className="col-md-12 border rounded-3  d-flex gap-3 m-1">
              <img
                className="img rounded-circle"
                style={{ height: "50px", width: "50px", margin: "0" }}
                src={img1}
              />
              <div className="text d-flex col-md-9 justify-content-between">
                <div>
                  <b>Christina joshap</b>
                  <p>Hello,what’s up?</p>
                </div>

                <div>
                  <b>
                    <RxDotFilled className="text-muted" />
                  </b>
                  <p className="text-muted">09.20</p>
                </div>
              </div>
            </div>

            <div className="col-md-12 border rounded-3  d-flex gap-3 m-1">
              <img
                className="img rounded-circle"
                style={{ height: "50px", width: "50px", margin: "0" }}
                src={img2}
              />
              <div className="text d-flex col-md-9 justify-content-between">
                <div>
                  <b>Meera krishna tej</b>
                  <p>Hello,what’s up?</p>
                </div>

                <div>
                  <b>
                    <RxDotFilled className="text-muted" />
                  </b>
                  <p className="text-muted">08.20</p>
                </div>
              </div>
            </div>

            <div className="col-md-12 border rounded-3  d-flex gap-3 m-1 align-items-center">
              <img
                className="img rounded-circle"
                style={{ height: "50px", width: "50px", margin: "0" }}
                src={img3}
              />
              <div className="text d-flex col-md-9 justify-content-between">
                <div>
                  <b>Aravindh kihorer </b>
                  <p>Hello,what’s up?</p>
                </div>

                <div>
                  <b>
                    <RxDotFilled className="text-muted" />
                  </b>
                  <p className="text-muted">08.20</p>
                </div>
              </div>
            </div>

            <div className="col-md-12 border rounded-3  d-flex gap-3 m-1">
              <img
                className="img rounded-circle"
                style={{ height: "50px", width: "50px", margin: "0" }}
                src={img4}
              />
              <div className="text d-flex col-md-9 justify-content-between">
                <div>
                  <b>Choraphligana ji </b>
                  <p>Hello,what’s up?</p>
                </div>

                <div>
                  <b>
                    <RxDotFilled className="text-muted" />
                  </b>
                  <p className="text-muted">12.20</p>
                </div>
              </div>
            </div>

            <div className="col-md-12 border rounded-3  d-flex gap-3 m-1">
              <img
                className="img rounded-circle"
                style={{ height: "50px", width: "50px", margin: "0" }}
                src={img1}
              />
              <div className="text d-flex col-md-9 justify-content-between">
                <div>
                  <b>Christina joshap </b>
                  <p>Hello,what’s up?</p>
                </div>

                <div>
                  <b>
                    <RxDotFilled className="text-muted" />
                  </b>
                  <p className="text-muted">12.20</p>
                </div>
              </div>
            </div>

            <div className="col-md-12 border rounded-3  d-flex gap-3 m-1">
              <img
                className="img rounded-circle"
                style={{ height: "50px", width: "50px", margin: "0" }}
                src={img2}
              />
              <div className="text d-flex col-md-9 justify-content-between">
                <div>
                  <b>Meera krishna tej </b>
                  <p>Hello,what’s up?</p>
                </div>

                <div>
                  <b>
                    <RxDotFilled className="text-muted" />
                  </b>
                  <p className="text-muted">08.20</p>
                </div>
              </div>
            </div>

            <div className="col-md-12 border rounded-3  d-flex gap-3 m-1">
              <img
                className="img rounded-circle"
                style={{ height: "50px", width: "50px", margin: "0" }}
                src={img3}
              />
              <div className="text d-flex col-md-9 justify-content-between">
                <div>
                  <b>Aravindh kihorer </b>
                  <p>Hello,what’s up?</p>
                </div>

                <div>
                  <b>
                    <RxDotFilled className="text-muted" />
                  </b>
                  <p className="text-muted">08.20</p>
                </div>
              </div>
            </div>

            <div className="col-md-12 border rounded-3  d-flex gap-3 m-1">
              <img
                className="img rounded-circle"
                style={{ height: "50px", width: "50px", margin: "0" }}
                src={img4}
              />
              <div className="text d-flex col-md-9 justify-content-between">
                <div>
                  <b>Choraphligana ji </b>
                  <p>Hello,what’s up?</p>
                </div>

                <div>
                  <b>
                    <RxDotFilled className="text-muted" />
                  </b>
                  <p className="text-muted">12.20</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8 border rounded-4">
          <br />
          <div className="col-md-4 d-flex gap-3 top">
            <img
              className="img rounded-circle"
              style={{ height: "50px", width: "50px", margin: "0" }}
              src={img3}
            />
            <div className="text d-flex col-md-9 justify-content-between">
              <div>
                <b>Aravindh kihorer </b>
                <p>Hello,what’s up?</p>
              </div>
            </div>
          </div>
          <hr />

          <h5 className="text-center p-1 bg mx-auto rounded-5">Yesterday</h5>
          <br />

          <div className="col-md-6 bg1 rounded-3 ml">
            <b className="m-3">
              Hlo mam,Good morning, your last class was too good
            </b>
            <p className="ml">09:09 AM</p>
          </div>

          <div className="col-md-6 bg1 rounded-3 ml bg-2 ">
            <b className="m-3">
              Okay,Thank you for your comments ,i am really happy
            </b>
            <p className="ml">09:09 AM</p>
          </div>

          <div className="col-md-6 bg1 rounded-3 ml bg-2 ">
            <b className="m-3">
              Okay,Thank you for your comments ,i am really happy
            </b>
            <p className="ml">09:09 AM</p>
          </div>

          <div className="col-md-6 bg1 rounded-3 ml">
            <b className="m-3">
              Hlo mam,Good morning, your last class was too good
            </b>
            <p className="ml">09:09 AM</p>
          </div>

          <div className="col-md-6 bg1 rounded-3 ml">
            <b className="m-3">
              Hlo mam,Good morning, your last class was too good
            </b>
            <p className="ml">09:09 AM</p>
          </div>
          <br />

          <div className="col-md-10 bg1 rounded-3 ml mx-auto p-2 d-flex">
            <b className="m-3 text-1">Write a message</b>
            <div className=" d-flex flex-row-reverse gap-5 text-3">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.000976562 23.3877V14.7627L10.1062 11.8877L0.000976562 9.0127V0.387695L24.001 11.8877L0.000976562 23.3877Z"
                  fill="#3A2DD6"
                />
              </svg>
              <svg
                className="pin"
                width="15"
                height="15"
                viewBox="0 0 25 25"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.64816 19.36L7.50771 21.4379C6.94644 21.9986 6.1852 22.3136 5.39144 22.3136C4.59769 22.3136 3.83644 21.9986 3.27518 21.4379C2.71391 20.8772 2.39859 20.1167 2.39859 19.3238C2.39859 18.5308 2.71391 17.7703 3.27518 17.2096L8.76538 11.7128C9.30425 11.1728 10.0303 10.8603 10.7934 10.84C11.5564 10.8198 12.2981 11.0934 12.8649 11.6041L13.01 11.7249C13.2393 11.9492 13.5484 12.0733 13.8693 12.0699C14.1902 12.0665 14.4966 11.9359 14.7212 11.7068C14.9457 11.4777 15.0699 11.1689 15.0665 10.8483C15.0631 10.5277 14.9323 10.2216 14.703 9.99736C14.6348 9.9092 14.5621 9.82453 14.4853 9.74366C13.453 8.84643 12.1179 8.37472 10.7505 8.42407C9.38309 8.47342 8.08555 9.04014 7.12073 10.0094L1.55798 15.5062C0.612738 16.5341 0.101526 17.887 0.131098 19.2824C0.16067 20.6778 0.72874 22.0079 1.71668 22.9949C2.70461 23.9818 4.03602 24.5493 5.43286 24.5789C6.8297 24.6084 8.18395 24.0977 9.21282 23.1534L11.3049 21.1118C11.5115 20.8866 11.625 20.5917 11.6227 20.2863C11.6204 19.9809 11.5024 19.6877 11.2925 19.4657C11.0825 19.2438 10.7962 19.1095 10.4911 19.0898C10.1861 19.0702 9.88486 19.1668 9.64816 19.36ZM22.5755 2.15689C21.5582 1.14693 20.1823 0.580078 18.7481 0.580078C17.3139 0.580078 15.938 1.14693 14.9207 2.15689L12.8286 4.19855C12.622 4.42368 12.5085 4.71861 12.5108 5.02399C12.5131 5.32938 12.6311 5.62257 12.8411 5.84455C13.051 6.06653 13.3373 6.20085 13.6424 6.22046C13.9475 6.24008 14.2486 6.14354 14.4853 5.95027L16.5774 3.87237C17.1387 3.31166 17.8999 2.99666 18.6937 2.99666C19.4874 2.99666 20.2487 3.31166 20.81 3.87237C21.3712 4.43307 21.6865 5.19356 21.6865 5.98652C21.6865 6.77948 21.3712 7.53996 20.81 8.10067L15.3198 13.5975C14.7809 14.1375 14.0548 14.45 13.2918 14.4703C12.5287 14.4905 11.7871 14.2169 11.2202 13.7062L11.0751 13.5854C10.8458 13.3611 10.5367 13.237 10.2158 13.2404C9.8949 13.2438 9.58849 13.3744 9.36398 13.6035C9.13947 13.8326 9.01525 14.1414 9.01866 14.462C9.02206 14.7826 9.1528 15.0887 9.38212 15.3129C9.46996 15.4027 9.56282 15.4874 9.66026 15.5666C10.6938 16.4612 12.0283 16.9311 13.3949 16.8818C14.7615 16.8325 16.0586 16.2676 17.0249 15.3009L22.5272 9.80407C23.5446 8.7942 24.1207 7.42321 24.1298 5.99044C24.1388 4.55767 23.5801 3.17952 22.5755 2.15689Z"
                  fill-opacity="0.63"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
