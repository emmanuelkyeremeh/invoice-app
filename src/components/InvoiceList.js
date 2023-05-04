import React from "react";
import iconRight from "../assets/icon-arrow-right.svg";
import "../styles/invoiceList.css";

const InvoiceList = ({ id, paymentDue, clientName, total, status }) => {
  return (
    <div className="invoice-list-container">
      <div className="invoice-list-id">#{id}</div>
      <div className="invoice-list-gray">{paymentDue}</div>
      <div className="invoice-list-gray invoice-list-text">{clientName}</div>
      <div>${total}</div>
      <div>
        <button className={`invoice-list-button invoice-list-button-${status}`}>
          <div></div>{" "}
          {`${status.charAt(0).toUpperCase()}${status.substring(1)}`}
        </button>
      </div>
      <div>
        <img src={iconRight} alt="" />
      </div>
    </div>
  );
};

export default InvoiceList;
