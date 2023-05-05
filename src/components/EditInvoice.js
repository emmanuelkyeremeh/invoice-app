import React from "react";
import "../styles/sidebar.css";

const EditInvoice = ({ open, setOpen, singleData }) => {
  const {
    id,
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
    <div className="sidebar">
      <div className="sidebar-content">
        <form className="sidebar-form">
          <div className="form-heading">
            <h2>Edit #{id}</h2>
          </div>
          <div className="form-item">
            <div className="form-heading">
              <h4>Bill From</h4>
            </div>
          </div>
          <div className="form-item">
            <div className="form-label">
              <label htmlFor="">Street Address</label>
            </div>
            <div className="form-input">
              <input type="text" name="" id="" />
            </div>
          </div>
          <div className="form-item-flex">
            <div className="form-item">
              <div className="form-label">
                <label htmlFor="">City</label>
              </div>
              <div className="form-input">
                <input type="text" name="" id="" />
              </div>
            </div>
            <div className="form-item">
              <div className="form-label">
                <label htmlFor="">Post Code</label>
              </div>
              <div className="form-input">
                <input type="text" name="" id="" />
              </div>
            </div>
            <div className="form-item">
              <div className="form-label">
                <label htmlFor="">Country</label>
              </div>
              <div className="form-input">
                <input type="text" name="" id="" />
              </div>
            </div>
          </div>
          <div className="form-heading">
            <h4>Bill To</h4>
          </div>
          <div className="form-item">
            <div className="form-label">
              <label htmlFor="">Client's Name</label>
            </div>
            <div className="form-input">
              <input type="text" name="" id="" />
            </div>
          </div>
          <div className="form-item">
            <div className="form-label">
              <label htmlFor="">Client's Email</label>
            </div>
            <div className="form-input">
              <input type="email" name="" id="" />
            </div>
          </div>
          <div className="form-item">
            <div className="form-label">
              <label htmlFor="">Street Address</label>
            </div>
            <div className="form-input">
              <input type="text" name="" id="" />
            </div>
          </div>
          <div className="form-item-flex">
            <div className="form-item">
              <div className="form-label">
                <label htmlFor="">City</label>
              </div>
              <div className="form-input">
                <input type="text" name="" id="" />
              </div>
            </div>
            <div className="form-item">
              <div className="form-label">
                <label htmlFor="">Post Code</label>
              </div>
              <div className="form-input">
                <input type="text" name="" id="" />
              </div>
            </div>
            <div className="form-item">
              <div className="form-label">
                <label htmlFor="">Country</label>
              </div>
              <div className="form-input">
                <input type="text" name="" id="" />
              </div>
            </div>
          </div>
          <div className="form-item-flex">
            <div className="form-item">
              <div className="form-label">
                <label htmlFor="">Invoice Date</label>
              </div>
              <div className="form-input">
                <input type="date" name="" id="" />
              </div>
            </div>
            <div className="form-item">
              <div className="form-label">
                <label htmlFor="">Payment Terms</label>
              </div>
              <div className="form-input">
                <select name="" id="">
                  <option value="">Net 1 day</option>
                  <option value="">Net 7 days</option>
                  <option value="">Net 14 days</option>
                  <option value="">Net 30 days</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="sidebar-blur" onClick={() => setOpen(false)}></div>
    </div>
  );
};

export default EditInvoice;
