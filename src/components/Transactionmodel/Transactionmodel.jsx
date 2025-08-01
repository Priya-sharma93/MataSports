import React, { useState } from "react";
import Wallet from "../../assets/Images/DashboardImage/Wallet.png";
import crossimg from "../../assets/Images/DashboardImage/cross.png";
import "./Transactionmodel.css";
function Transactionmodel({ cross }) {
  const transactions = [
    { sender: "Riya", date: "17.03.2023, 10:00 AM", amount: "$600" },
    { sender: "Anu", date: "20.03.2023, 12:00 PM", amount: "$200" },
    { sender: "Kira", date: "21.03.2023, 10:00 AM", amount: "$30" },
    { sender: "Riya", date: "17.03.2023, 10:00 AM", amount: "$600" },
    { sender: "Anu", date: "20.03.2023, 12:00 PM", amount: "$200" },
    { sender: "Kira", date: "21.03.2023, 10:00 AM", amount: "$30" },
    { sender: "Riya", date: "17.03.2023, 10:00 AM", amount: "$600" },
    { sender: "Anu", date: "20.03.2023, 12:00 PM", amount: "$200" },
    { sender: "Kira", date: "21.03.2023, 10:00 AM", amount: "$30" },
    { sender: "Riya", date: "17.03.2023, 10:00 AM", amount: "$600" },
    { sender: "Anu", date: "20.03.2023, 12:00 PM", amount: "$200" },
    { sender: "Kira", date: "21.03.2023, 10:00 AM", amount: "$30" },
    { sender: "Riya", date: "17.03.2023, 10:00 AM", amount: "$600" },
    { sender: "Anu", date: "20.03.2023, 12:00 PM", amount: "$200" },
  ];

  return (
    <div className="transaction-box ">
      <div className="header">
        <h2>Transaction</h2>
        <div className="cross" onClick={cross}>
          <img src={crossimg} alt="cross" />
        </div>
      </div>
      <div className="amt-line">
        {transactions.map((item, index) => {
          return (
            <div className="amt-row" key={index}>
              <div className="wallet-img">
                <img
                  className="img-w"
                  height={40}
                  width={40}
                  src={Wallet}
                  alt="cross"
                />
              </div>
              <div className="recive">
                <h6>Recieved from {item.sender}</h6>
                <p>{item.date} </p>
              </div>
              <div className="amt-name">
                <span>+</span>
                <h6>{item.amount}</h6>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Transactionmodel;