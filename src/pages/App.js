import React, { useState } from "react";
import Navbar from "../components/Navbar";
import iconArrowDown from "../assets/icon-arrow-down.svg";
import iconPlus from "../assets/icon-plus.svg";
import "../styles/app.css";
import InvoiceList from "../components/InvoiceList";
import { Link } from "react-router-dom";
import NewInvoice from "../components/NewInvoice";
import { useRecoilValue } from "recoil";
import { darkMode, invoices } from "../state/state.js";
import illustrationEmpty from "../assets/illustration-empty.svg";

const App = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const isDark = useRecoilValue(darkMode);
  const data = useRecoilValue(invoices);

  return (
    <div
      className="container"
      style={{
        color: `${isDark ? "white" : "black"}`,
        backgroundColor: `${isDark ? "#141625" : "#F2F2F2"}`,
      }}
    >
      <div style={{ position: "fixed" }}>
        <Navbar />
      </div>

      <div className="invoice-page-container">
        <div className="invoice-page-header">
          <div className="invoice-page-title">
            <h1>Invoices</h1>
            <h3 style={{ color: `${isDark ? "white" : "#888EB0"}` }}>
              There are 7 total invoices
            </h3>
          </div>
          <div className="invoice-page-info">
            <div className="invoice-page-info-filter">
              Filter by status <img src={iconArrowDown} alt="" />
            </div>
            <div className="invoice-page-info-new">
              <button
                className="invoice-page-info-new-button"
                onClick={() => setOpenSidebar(true)}
              >
                <div>
                  <img src={iconPlus} alt="" />
                </div>{" "}
                New Invoice
              </button>
            </div>
          </div>
        </div>
        {data.length ? (
          data.map((item, index) => (
            <Link to={`/invoice/${item.id}/${index}`} key={item.id}>
              <InvoiceList
                id={item.id}
                paymentDue={item.paymentDue}
                clientName={item.clientName}
                total={item.total}
                status={item.status}
              />
            </Link>
          ))
        ) : (
          <div className="invoice-list-empty">
            <img className="invoice-list-img" src={illustrationEmpty} alt="" />
            <h2 className="invoice-list-heading">There is nothing here</h2>
            <p
              style={{ color: `${isDark ? "white" : "#888EB0"}` }}
              className="invoice-list-text"
            >
              Create an invoice by clicking the <span>New Invoice</span> button
              and get started
            </p>
          </div>
        )}
      </div>
      {openSidebar && (
        <NewInvoice openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      )}
    </div>
  );
};

export default App;
