import React from "react";
import "../styles/deleteInvoice.css";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { invoices } from "../state/state";

const DeleteInvoice = ({ id, open, setOpen, index }) => {
  const navigate = useNavigate();
  const [invoiceList, setInvoiceList] = useRecoilState(invoices);

  const deleteHandler = () => {
    setInvoiceList(invoiceList.filter((invoice) => invoice.id !== id));
    navigate("/");
  };
  return (
    <div className="delete-invoice-container" onClick={() => setOpen(false)}>
      <div className="delete-invoice-child">
        <h1>Confirm deletion</h1>
        <p>
          Are you sure you want to delete invoice #{id}? This action cannot be
          undone
        </p>
        <div className="delete-invoice-button-flex">
          <div></div>
          <div className="delete-invoice-button-item">
            <button className="delete-invoice-button button-light">
              Cancel
            </button>
            <button
              className="delete-invoice-button button-red"
              onClick={() => deleteHandler()}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteInvoice;
