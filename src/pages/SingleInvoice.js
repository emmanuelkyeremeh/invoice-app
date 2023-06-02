import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/app.css";
import Navbar from "../components/Navbar";
import "../styles/singleInvoice.css";
import iconLeft from "../assets/icon-arrow-left.svg";
import "../styles/invoiceList.css";
import EditInvoice from "../components/EditInvoice";
import DeleteInvoice from "../components/DeleteInvoice";
import { darkMode, invoices } from "../state/state";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const SingleInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const data = useRecoilValue(invoices);
  const setData = useSetRecoilState(invoices);
  const [singleData, setSingleData] = useState(
    data.find((elem) => elem.id === id)
  );

  useEffect(() => {
    let updatedSingleData = data.find((elem) => elem.id === id);

    if (updatedSingleData) {
      setSingleData(updatedSingleData);
    }
  }, [data]);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const isDark = useRecoilValue(darkMode);
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

  const markAsPaidHandler = () => {
    setData(data.filter((item) => item.id !== id));

    let updatedData = { ...singleData, status: "paid" };

    if (data.length) {
      setData((prev) => [...prev, updatedData]);
    } else {
      setData([updatedData]);
    }
  };

  return (
    <div
      className="container"
      style={{
        backgroundColor: `${isDark ? "#141625" : "#F8F8FB"}`,
        color: `${isDark ? "white" : "black"}`,
      }}
    >
      <div
        style={{
          position: "fixed",
        }}
      >
        <Navbar />
      </div>

      <div className="invoice-page-container single-invoice-container">
        <div
          className="single-invoice-container-back"
          onClick={() => navigate("/")}
          style={{ color: `${isDark ? "white" : "#7E88C3"}` }}
        >
          <img src={iconLeft} alt="" /> Go back
        </div>
        <div
          className="single-invoice-container-tray"
          style={{ backgroundColor: `${isDark ? "#1E2139" : "white"}` }}
        >
          <div
            className="single-invoice-container-tray-status"
            style={{ color: `${isDark ? "white" : "#858BB2"}` }}
          >
            <div>
              <p>Status</p>
            </div>

            <button
              className={`invoice-list-button invoice-list-button-${status}`}
            >
              <div></div>{" "}
              {`${status.charAt(0).toUpperCase()}${status.substring(1)}`}
            </button>
          </div>
          <div className="single-invoice-container-tray-buttons buttons-display-none">
            <button
              className="single-invoice-container-button edit"
              onClick={() => setOpen(true)}
            >
              Edit
            </button>
            <button
              className="single-invoice-container-button delete"
              onClick={() => setOpenDeleteDialog(true)}
            >
              Delete
            </button>
            <button
              onClick={() => markAsPaidHandler()}
              className="single-invoice-container-button mark-as-paid"
            >
              Mark as Paid
            </button>
          </div>
        </div>
        <div
          className="single-invoice-container-body"
          style={{ backgroundColor: `${isDark ? "#1E2139" : "white"}` }}
        >
          <div className="single-invoice-container-body-id-tray">
            <div className="single-invoice-container-id">
              <h2>#{id}</h2>
              <p style={{ color: `${isDark ? "white" : "#7E88C3"}` }}>
                {description}
              </p>
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
              <p style={{ color: `${isDark ? "white" : "#7E88C3"}` }}>
                Invoice Date
              </p>
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
            <table
              style={{ backgroundColor: `${isDark ? "#252945" : "#F9FAFE"}` }}
            >
              <thead>
                <th style={{ color: `${isDark ? "white" : "#7E88C3"}` }}>
                  Item Name
                </th>
                <th style={{ color: `${isDark ? "white" : "#7E88C3"}` }}>
                  {" "}
                  <span className="single-invoice-display-none-responsive">
                    QTY
                  </span>{" "}
                </th>
                <th style={{ color: `${isDark ? "white" : "#7E88C3"}` }}>
                  <span className="single-invoice-display-none-responsive">
                    Price
                  </span>{" "}
                </th>
                <th style={{ color: `${isDark ? "white" : "#7E88C3"}` }}>
                  Total
                </th>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr>
                    <td>
                      {item.name}
                      <span className="single-invoicedisplay-all-responsive">
                        <br />
                        {item.quantity}x{item.price}
                      </span>
                    </td>
                    <td>
                      <span className="single-invoice-display-none-responsive">
                        {item.quantity}
                      </span>
                    </td>
                    <td>
                      <span className="single-invoice-display-none-responsive">
                        {item.price}
                      </span>
                    </td>
                    <td>
                      <h3>${item.total}</h3>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <footer
            style={{ backgroundColor: `${isDark ? "#0C0E16" : "#373B53"}` }}
          >
            <p>Amount Due</p>
            <h2>${total}</h2>
          </footer>
        </div>
        <div className="tray-responsive">
          <div className="single-invoice-container-tray">
            <div className="single-invoice-container-tray-status tray-status-responsive">
              <div>
                <p>Status</p>
              </div>

              <button
                className={`invoice-list-button invoice-list-button-${status}`}
              >
                <div></div>{" "}
                {`${status.charAt(0).toUpperCase()}${status.substring(1)}`}
              </button>
            </div>
            <div className="single-invoice-container-tray-buttons tray-buttons-show">
              <button
                className="single-invoice-container-button edit"
                onClick={() => setOpen(true)}
              >
                Edit
              </button>
              <button
                className="single-invoice-container-button delete"
                onClick={() => setOpenDeleteDialog(true)}
              >
                Delete
              </button>
              <button className="single-invoice-container-button mark-as-paid">
                Mark as Paid
              </button>
            </div>
          </div>
        </div>
        {open && <EditInvoice open={open} setOpen={setOpen} id={id} />}
        {openDeleteDialog && (
          <DeleteInvoice
            open={openDeleteDialog}
            setOpen={setOpenDeleteDialog}
            id={id}
          />
        )}
      </div>
    </div>
  );
};

export default SingleInvoice;
