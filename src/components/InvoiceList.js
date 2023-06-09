import React from "react";
import iconRight from "../assets/icon-arrow-right.svg";
import "../styles/invoiceList.css";
import { useRecoilValue } from "recoil";
import { darkMode } from "../state/state";

const InvoiceList = ({
  id,
  paymentDue,
  clientName,
  total,
  status,
  showItem,
}) => {
  const isDark = useRecoilValue(darkMode);
  const display_none = `${showItem ? "" : "display-invoice-list-none"} `;
  return (
    <div
      className={`invoice-list-container ${display_none}`}
      style={{
        backgroundColor: `${isDark ? "#1E2139" : "white"}`,
        color: `${isDark ? "white" : "black"}`,
      }}
    >
      <div className="responsive-flex-div-left">
        <div className="invoice-list-id">#{id}</div>
        <div style={{ color: `${isDark ? "white" : "#7E88C3"}` }}>
          {paymentDue.replaceAll("/", "-")}
        </div>
        <div className="display-none-responsive">
          <h2>${total}</h2>
        </div>
        <div
          className="invoice-list-text-responsive"
          style={{ color: `${isDark ? "white" : "#7E88C3"}` }}
        >
          {clientName}
        </div>
      </div>

      <div className="responsive-flex-div-right">
        <div
          className="display-none-responsive"
          style={{ color: `${isDark ? "white" : "#7E88C3"}` }}
        >
          {clientName}
        </div>
        <div className="invoice-list-text-responsive">
          <h2>${total}</h2>
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
