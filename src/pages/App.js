import React from "react";
import Navbar from "../components/Navbar";
import iconArrowDown from "../assets/icon-arrow-down.svg";
import iconPlus from "../assets/icon-plus.svg";
import "../styles/app.css";
import data from "../data/data.json";
import InvoiceList from "../components/InvoiceList";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="container">
      <Navbar />
      <div className="invoice-page-container">
        <div className="invoice-page-header">
          <div className="invoice-page-title">
            <h1>Invoices</h1>
            <h3>There are 7 total invoices</h3>
          </div>
          <div className="invoice-page-info">
            <div className="invoice-page-info-filter">
              Filter by status <img src={iconArrowDown} alt="" />
            </div>
            <div className="invoice-page-info-new">
              <button className="invoice-page-info-new-button">
                <div>
                  <img src={iconPlus} alt="" />
                </div>{" "}
                New Invoice
              </button>
            </div>
          </div>
        </div>
        {data &&
          data.map((item) => (
            <Link to={`/invoice/${item.id}`}>
              <InvoiceList
                id={item.id}
                paymentDue={item.paymentDue}
                clientName={item.clientName}
                total={item.total}
                status={item.status}
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default App;
