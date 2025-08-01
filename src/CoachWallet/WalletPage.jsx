import React, { useState } from "react";
import googlePay from "../assets/WalletImg/G-pay.png"; // Importing wallet images
import paytm from "../assets/WalletImg/paytm.png";
import paypal from "../assets/WalletImg/paypal.png";
import reviwer from "../assets/Review-ratingImg/reviewer.png"; // Profile image
import backwardArrow from "../assets/backwardArrow.svg"; // Backward arrow image
import tennis from "../assets/tennis-icon.svg"; // Icon representing tennis
import "./WalletPage.css"; // Custom styles for the WalletPage component
import { Button } from "react-bootstrap"; // Bootstrap Button component
import { FaPhoneAlt } from "react-icons/fa"; // Phone icon from react-icons
import { MdOutlineEmail } from "react-icons/md"; // Email icon from react-icons
import { useNavigate } from "react-router-dom";

// WalletPage component function
const WalletPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Handlers to open and close the modal (not implemented in this version)
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const navigate = useNavigate();

  // Sample transactions data
  const transactions = [
    {
      date: "18.03.2024, 11am",
      transaction: "Transferred to 127894",
      amount: "1500.00",
    },
  ];

  const onHandleNavigate = () => {
    navigate(-1);
  };

  return (
    <div className="min-vh-100 custom-bg font-ccccccfamily-Roboto text-light p-4">
      {/* Wallet Header (Commented out for now) */}
      {/* <WalletHeader /> */}

      {/* Back Button and Wallet Header */}
      <div className="px-5 d-flex flex-column flex-sm-row align-items-center gap-3">
        <img
          src={backwardArrow}
          alt="Back Arrow"
          className=" cursor-pointer"
          onClick={onHandleNavigate}
        />{" "}
        {/* Back arrow */}
        <button className="fw-bold font-family-Roboto btn rounded-pill fw-semibold fs-5 lh-sm px-5 btn-bg">
          Wallet
        </button>
        <h4 className="fw-bold m-0">Balance</h4> {/* Wallet balance section */}
      </div>

      <div className="row mt-4">
        {/* Left section for Profile and Wallet Information */}
        <div className="col-12 col-md-6">
          <div className="d-flex flex-wrap gap-3 rounded">
            <img src={reviwer} alt="Profile" className="img-fluid" />{" "}
            {/* Profile image */}
            <div>
              <div className="rounded-4 bg-white text-black p-3">
                <h5 className="fw-bold fs-2">Gayathri Harun Tej</h5>{" "}
                {/* Profile name */}
                <p className="mb-0 fw-semibold fs-5">25 Years, Female</p>{" "}
                {/* Age and gender */}
                <div className="d-flex align-items-center gap-2 my-2">
                  <p className="mb-0 fw-semibold fs-5">Teams: </p>
                  <img src={tennis} alt="Tennis" /> {/* Team icon */}
                  <i className="fa-solid fa-futbol"></i>{" "}
                  {/* Another team icon */}
                </div>
                <p className="fw-semibold fs-5">
                  Language: <span className="lang-color ">English, Hindi</span>{" "}
                  {/* Language information */}
                </p>
                <div className="d-flex align-items-center gap-3 my-2 t-color">
                  <FaPhoneAlt /> {/* Phone icon */}
                  <p className="m-0 p-0">(555) 555-8271</p> {/* Phone number */}
                </div>
                <div className="d-flex align-items-center gap-3 my-2 mt-4 t-color">
                  <i className="fa-regular fa-envelope"></i> {/* Email icon */}
                  <p className="m-0 p-0">gayathriharun@example.com</p>{" "}
                  {/* Email address */}
                </div>
              </div>
              <p className="text-success pt-5 fw-bold">Online</p>{" "}
              {/* Status indicator */}
            </div>
          </div>
          <p className="mt-3">
            my objective professional se enfoca en el desarrollo integral y el
            Alto Rendimento Deportivo, incorporando un enfoque estrategico de
            manager... {/* Short description text */}
          </p>

          {/* Transaction Section */}
          <div className="mt-5 rounded">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="text-center fw-bold mx-auto flex-grow-1">
                Wallet Transaction
              </h4>
              <button className="btn btn-primary ms-auto px-2 py-0">
                See all {/* Button to view all transactions */}
              </button>
            </div>
            <div className="bg-dark"></div>
            <table className="table table-light mt-3">
              <thead>
                <tr>
                  <th className="p-3">Date credit</th>
                  <th className="p-3">Transaction</th>
                  <th className="p-3">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td className="p-3">{transaction.date}</td>{" "}
                    {/* Transaction date */}
                    <td className="p-3">{transaction.transaction}</td>{" "}
                    {/* Transaction details */}
                    <td className="p-3">{transaction.amount}</td>{" "}
                    {/* Transaction amount */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right section for Balance and Payment Methods */}
        <div className="col-12 col-md-6 rounded bg-white p-5">
          <div className="p-3 d-flex justify-content-center align-items-center flex-column">
            <h4 className="text-center font-family-Inter h-color">Balance</h4>
            {/* Balance summary */}
            <div className="d-flex justify-content-center gap-5 text-black fw-bold fs-4 lh-lg m-3">
              <span>Current amount</span>
              <span>= 1500 rs</span>
            </div>
            <div className="d-flex justify-content-center gap-5 text-black fw-bold fs-4 lh-lg m-3">
              <span>Platform fee @10%</span>
              <span>= 50 rs</span>
            </div>
            <div className="d-flex justify-content-center gap-5 text-black m-3 fw-bold fs-4 lh-lg">
              <span>Total amount</span>
              <span>= 1450 rs</span>
            </div>
            <button className="fw-bold fs-4 px-5 mt-3 mb-4 btn-bg">
              Withdraw money {/* Button to withdraw money */}
            </button>
            {/* Payment methods */}
            <h5 className="mt-5 text-danger fw-bold fs-4">Payment methods</h5>
            <div className="d-flex justify-content-center flex-wrap gap-5 mt-3 mb-5">
              <img src={googlePay} alt="Google Pay" className="curser" />{" "}
              {/* Google Pay icon */}
              <img src={paytm} alt="Paytm" className="curser" />{" "}
              {/* Paytm icon */}
              <img src={paypal} alt="PayPal" className="curser" />{" "}
              {/* PayPal icon */}
            </div>
            <button className="fw-bold fs-4 mt-3 px-5 btn-bg">Confirm</button>{" "}
            {/* Confirm payment button */}
          </div>
        </div>
      </div>

      {/* Modal component for transactions (commented out for now) */}
      {/* <Transactionmodel isOpen={isModalOpen} onClose={handleCloseModal} /> */}
    </div>
  );
};

export default WalletPage;
