import React, { useState } from "react";
import data from "../data/data.json";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/app.css";
import Navbar from "../components/Navbar";
import "../styles/singleInvoice.css";
import iconLeft from "../assets/icon-arrow-left.svg";
import "../styles/invoiceList.css";
import EditInvoice from "../components/EditInvoice";

const SingleInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const singleData = data.find((elem) => elem.id === id);
  const {
    status,
    description,
    senderAddress,
    createdAt,
    clientName,
    clientAddress,
    clientEmail,
    items,
    total,
  } = singleData;

  return (
    <div className="container">
      <div style={{ position: "fixed" }}>
        <Navbar />
      </div>

      <div className="invoice-page-container single-invoice-container">
        <div
          className="single-invoice-container-back"
          onClick={() => navigate("/")}
        >
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
          <div className="single-invoice-container-tray-buttons">
            <button
              className="single-invoice-container-button edit"
              onClick={() => setOpen(true)}
            >
              Edit
            </button>
            <button className="single-invoice-container-button delete">
              Delete
            </button>
            <button className="single-invoice-container-button mark-as-paid">
              Mark as Paid
            </button>
          </div>
        </div>
        <div className="single-invoice-container-body">
          <div className="single-invoice-container-body-id-tray">
            <div className="single-invoice-container-id">
              <h2>#{id}</h2>
              <p>{description}</p>
            </div>
            <div className="single-invoice-container-sender-address">
              <p>{senderAddress.street}</p>
              <p>{senderAddress.city}</p>
              <p>{senderAddress.postCode}</p>
              <p>{senderAddress.country}</p>
            </div>
          </div>
          <div className="single-invoice-container-body-lower-tray">
            <div>
              <p>Invoice Date</p>
              <h2>{createdAt}</h2>
            </div>
            <div className="single-invoice-container-body-lower-tray-address">
              <p>Bill To</p>
              <h2>{clientName}</h2>
              <p>{clientAddress.street}</p>
              <p>{clientAddress.city}</p>
              <p>{clientAddress.postCode}</p>
              <p>{clientAddress.country}</p>
            </div>
            <div>
              <p>Sent to</p>
              <h2>{clientEmail}</h2>
            </div>
          </div>
          <div>
            <table>
              <thead>
                <th>Item Name</th>
                <th>QTY.</th>
                <th>Price</th>
                <th>Total</th>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>
                      <h3>${item.total}</h3>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <footer>
            <p>Amount Due</p>
            <h2>${total}</h2>
          </footer>
        </div>
        {open && (
          <EditInvoice open={open} setOpen={setOpen} singleData={singleData} />
        )}
      </div>
    </div>
  );
};

export default SingleInvoice;
