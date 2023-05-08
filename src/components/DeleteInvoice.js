import React from "react";
import "../styles/deleteInvoice.css";

const DeleteInvoice = ({ id, open, setOpen }) => {
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
            <button className="delete-invoice-button button-red">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteInvoice;
