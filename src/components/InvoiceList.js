import React from "react";
import iconRight from "../assets/icon-arrow-right.svg";
import "../styles/invoiceList.css";

const InvoiceList = ({ id, paymentDue, clientName, total, status }) => {
  return (
    <div className="invoice-list-container">
      <div className="responsive-flex-div-left">
        <div className="invoice-list-id">#{id}</div>
        <div className="invoice-list-gray">{paymentDue}</div>
        <div className="display-none-responsive">${total}</div>
        <div className="invoice-list-gray invoice-list-text ">{clientName}</div>
      </div>

      <div className="responsive-flex-div-right">
        <div className="invoice-list-gray invoice-list-text display-none-responsive">
          {clientName}
        </div>
        <button className={`invoice-list-button invoice-list-button-${status}`}>
          <div></div>{" "}
          {`${status.charAt(0).toUpperCase()}${status.substring(1)}`}
        </button>
        <div className="invoice-list-icon">
          <img src={iconRight} alt="" />
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;
