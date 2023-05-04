import React from "react";
import data from "../data/data.json";
import { useParams } from "react-router-dom";
import "../styles/app.css";
import Navbar from "../components/Navbar";
import "../styles/singleInvoice.css";
import iconLeft from "../assets/icon-arrow-left.svg";
import "../styles/invoiceList.css";

const SingleInvoice = () => {
  const { id } = useParams();
  const singleData = data.find((elem) => elem.id === id);
  const { status } = singleData;

  return (
    <div className="container">
      <Navbar />
      <div className="invoice-page-container single-invoice-container">
        <div className="single-invoice-container-back">
          <img src={iconLeft} alt="" /> Go back
        </div>
        <div className="single-invoice-container-tray">
          <div className="single-invoice-container-tray-status">
            <p>Status</p>
            <button
              className={`invoice-list-button invoice-list-button-${status}`}
            >
              <div></div>{" "}
              {`${status.charAt(0).toUpperCase()}${status.substring(1)}`}
            </button>
          </div>
        </div>
        <div className="single-invoice-container-body"></div>
      </div>
    </div>
  );
};

export default SingleInvoice;
