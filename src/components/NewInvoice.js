import React from "react";
import "../styles/sidebar.css";
import deleteIcon from "../assets/icon-delete.svg";
import plusIcon from "../assets/icon-plus.svg";
const NewInvoice = ({ openSidebar, setOpenSidebar }) => {
  const items = [];

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <form className="sidebar-form">
          <div className="form-heading">
            <h2>New Invoice</h2>
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
          <div className="form-item">
            <div className="form-label">
              <label htmlFor="">Project Description</label>
            </div>
            <div className="form-input">
              <input type="text" name="" id="" />
            </div>
          </div>
          <div className="form-heading">
            <h4>Item List</h4>
          </div>

          {items &&
            items.map((item) => (
              <div className="form-item-flex-table">
                <div className="form-item input-item-name">
                  <div className="form-label">
                    <label htmlFor="">Item Name</label>
                  </div>
                  <div className="form-input ">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder={`${item.name}`}
                    />
                  </div>
                </div>
                <div className="form-item input-quantity">
                  <div className="form-label">
                    <label htmlFor="">Qty</label>
                  </div>
                  <div className="form-input ">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder={`${item.quantity}`}
                    />
                  </div>
                </div>
                <div className="form-item input-price">
                  <div className="form-label">
                    <label htmlFor="">Price</label>
                  </div>
                  <div className="form-input ">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder={`${item.price}`}
                    />
                  </div>
                </div>
                <div className="form-item input-total">
                  <div className="form-label">
                    <label htmlFor="">Total</label>
                  </div>
                  <div className="form-input ">
                    <input type="text" placeholder={`${item.total}`} />
                  </div>
                </div>
                <div className="form-item input-icon">
                  <img src={deleteIcon} alt="" />
                </div>
              </div>
            ))}
          <div className="form-item">
            <button className="form-item-button button-light">
              <img src={plusIcon} alt="" /> Add New Item
            </button>
          </div>
          <div className="form-item">
            <div className="button-flex">
              <div>
                <button className="form-item-button button-light">
                  Discard
                </button>
              </div>
              <div className="button-flex-item">
                <button className="form-item-button button-black">
                  Save as Draft
                </button>
                <button className="form-item-button button-blue">
                  Save & Send
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="sidebar-blur" onClick={() => setOpenSidebar(false)}></div>
    </div>
  );
};

export default NewInvoice;
