import React, { useState } from "react";
import Navbar from "../components/Navbar";
import iconArrowDown from "../assets/icon-arrow-down.svg";
import iconPlus from "../assets/icon-plus.svg";
import "../styles/app.css";
import InvoiceList from "../components/InvoiceList";
import { Link } from "react-router-dom";
import NewInvoice from "../components/NewInvoice";
import { useRecoilState, useRecoilValue } from "recoil";
import { darkMode, displayFilter, invoices } from "../state/state.js";
import illustrationEmpty from "../assets/illustration-empty.svg";

const App = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const isDark = useRecoilValue(darkMode);
  const data = useRecoilValue(invoices);
  const [filters, setFilters] = useRecoilState(displayFilter);
  const [showDropdown, setShowDropdown] = useState(false);
  const [draft, setDraft] = useState(filters[0]);
  const [pending, setPending] = useState(filters[1]);
  const [paid, setPaid] = useState(filters[2]);

  const showDropdownHandler = () => {
    setShowDropdown(!showDropdown);
  };

  const handleChange = (status) => {
    if (status === "draft") {
      setDraft(!draft);
      setFilters([!draft, pending, paid]);
    } else if (status === "pending") {
      setPending(!pending);
      setFilters([draft, !pending, paid]);
    } else {
      setPaid(!paid);
      setFilters([draft, pending, !paid]);
    }
  };

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
              <div
                className="invoice-page-info-filter-content"
                onClick={() => showDropdownHandler()}
              >
                Filter by status <img src={iconArrowDown} alt="" />
              </div>
              {showDropdown && (
                <div
                  className="invoice-page-info-filter-dropdown"
                  style={{
                    color: `${isDark ? "white" : "black"}`,
                    backgroundColor: `${isDark ? "#1E2139" : "white"}`,
                    boxShadow: `${
                      isDark
                        ? "1px 1px 1px 1px rgb(31, 31, 31)"
                        : "1px 1px 1px 1px #c0c0c0"
                    }`,
                  }}
                >
                  <div className="invoice-page-dropdown-item">
                    <input
                      type="checkbox"
                      name="draft"
                      id=""
                      checked={draft}
                      onChange={() => handleChange("draft")}
                    />{" "}
                    Draft
                  </div>
                  <div className="invoice-page-dropdown-item">
                    <input
                      type="checkbox"
                      name="draft"
                      id=""
                      checked={pending}
                      onChange={() => handleChange("pending")}
                    />{" "}
                    Pending
                  </div>
                  <div className="invoice-page-dropdown-item">
                    <input
                      type="checkbox"
                      name="draft"
                      id=""
                      checked={paid}
                      onChange={() => handleChange("paid")}
                    />{" "}
                    Paid
                  </div>
                </div>
              )}
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
          data.map((item) => (
            <Link to={`/invoice/${item.id}`} key={item.id}>
              <InvoiceList
                id={item.id}
                paymentDue={item.paymentDue}
                clientName={item.clientName}
                total={item.total}
                status={item.status}
                showItem={
                  item.status === "draft"
                    ? draft
                    : item.status === "pending"
                    ? pending
                    : paid
                }
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
