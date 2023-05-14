import React, { useState } from "react";
import "../styles/sidebar.css";
import deleteIcon from "../assets/icon-delete.svg";
import plusIcon from "../assets/icon-plus.svg";
import iconLeft from "../assets/icon-arrow-left.svg";
import "../styles/singleInvoice.css";
import { useNavigate } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { darkMode, invoices } from "../state/state";

const EditInvoice = ({ open, setOpen, singleData, index, id }) => {
  const isDark = useRecoilValue(darkMode);
  const navigate = useNavigate();
  const [items, setItems] = useState(singleData.items);
  const [invoiceList, setinvoiceList] = useRecoilState(invoices);
  const [senderAddress, setSenderAddress] = useState(singleData.senderAddress);
  const [clientName, setClientName] = useState(singleData.clientName);
  const [clientEmail, setClientEmail] = useState(singleData.clientEmail);
  const [clientAddress, setClientAddress] = useState(singleData.clientAddress);
  const [createdAt, setCreatedAt] = useState(singleData.createdAt);
  const [paymentTerms, setPaymentTerms] = useState(singleData.paymentTerms);
  const [description, setDescription] = useState(singleData.description);

  const addItemHandler = (e) => {
    e.preventDefault();
    setItems([...items, { name: "", quantity: "", price: "", total: 0 }]);
  };

  const handleItemDelete = (index) => {
    setItems(items.filter((item, indx) => indx !== index));
  };

  const saveAndSubmitHandler = (e) => {
    e.preventDefault();
    let total = 0;

    for (let item of items) {
      item.total = parseInt(item.quantity) * parseInt(item.price);
      total += parseInt(item.total);
    }

    const newInvoice = {
      id: id,
      createdAt: createdAt,
      paymentDue: createdAt,
      description: description,
      paymentTerms: paymentTerms,
      clientName: clientName,
      clientEmail: clientEmail,
      status: singleData.status,
      senderAddress: senderAddress,
      clientAddress: clientAddress,
      items: items,
      total: total,
    };

    setinvoiceList((prev) => ({
      ...prev,
      [index]: newInvoice,
    }));
  };

  return (
    <div className="sidebar">
      <div
        className="sidebar-content"
        style={{ backgroundColor: `${isDark ? "#141625" : "white"}` }}
      >
        <div
          className="single-invoice-container-back container-back-display-none"
          onClick={() => navigate("/")}
        >
          <img src={iconLeft} alt="" /> Go back
        </div>
        <form className="sidebar-form">
          <div className="form-heading">
            <h2>Edit #{id}</h2>
          </div>
          <div className="form-item">
            <div className="form-heading">
              <h4 style={{ color: `${isDark ? "white" : "#7C5DFA"}` }}>
                Bill From
              </h4>
            </div>
          </div>
          <div className="form-item">
            <div className="form-label">
              <label
                style={{ color: `${isDark ? "white" : "#7C5DFA"}` }}
                htmlFor=""
              >
                Street Address
              </label>
            </div>
            <div className="form-input">
              <input
                style={{
                  backgroundColor: `${isDark ? "#252945" : "white"}`,
                  color: `${isDark ? "white" : "black"}`,
                  borderColor: `${isDark ? "#252945" : "#DFE3FA"}`,
                }}
                type="text"
                name={senderAddress.street}
                placeholder={senderAddress.street}
                onChange={(e) =>
                  setSenderAddress({ ...senderAddress, street: e.target.value })
                }
                id=""
              />
            </div>
          </div>
          <div className="form-item-flex">
            <div className="form-item">
              <div className="form-label">
                <label
                  htmlFor=""
                  style={{ color: `${isDark ? "white" : "#7C5DFA"}` }}
                >
                  City
                </label>
              </div>
              <div className="form-input">
                <input
                  style={{
                    backgroundColor: `${isDark ? "#252945" : "white"}`,
                    color: `${isDark ? "white" : "black"}`,
                    borderColor: `${isDark ? "#252945" : "#DFE3FA"}`,
                  }}
                  type="text"
                  name={senderAddress.city}
                  placeholder={senderAddress.city}
                  onChange={(e) =>
                    setSenderAddress({ ...senderAddress, city: e.target.value })
                  }
                  id=""
                />
              </div>
            </div>
            <div className="form-item">
              <div className="form-label">
                <label
                  htmlFor=""
                  style={{ color: `${isDark ? "white" : "#7C5DFA"}` }}
                >
                  Post Code
                </label>
              </div>
              <div className="form-input">
                <input
                  style={{
                    backgroundColor: `${isDark ? "#252945" : "white"}`,
                    color: `${isDark ? "white" : "black"}`,
                    borderColor: `${isDark ? "#252945" : "#DFE3FA"}`,
                  }}
                  type="text"
                  name={senderAddress.postCode}
                  placeholder={senderAddress.postCode}
                  onChange={(e) =>
                    setSenderAddress({
                      ...senderAddress,
                      postCode: e.target.value,
                    })
                  }
                  id=""
                />
              </div>
            </div>
            <div className="form-item">
              <div className="form-label">
                <label
                  htmlFor=""
                  style={{ color: `${isDark ? "white" : "#7C5DFA"}` }}
                >
                  Country
                </label>
              </div>
              <div className="form-input">
                <input
                  style={{
                    backgroundColor: `${isDark ? "#252945" : "white"}`,
                    color: `${isDark ? "white" : "black"}`,
                    borderColor: `${isDark ? "#252945" : "#DFE3FA"}`,
                  }}
                  type="text"
                  name={senderAddress.country}
                  placeholder={senderAddress.country}
                  onChange={(e) =>
                    setSenderAddress({
                      ...senderAddress,
                      country: e.target.value,
                    })
                  }
                  id=""
                />
              </div>
            </div>
          </div>
          <div className="form-heading">
            <h4 style={{ color: `${isDark ? "white" : "#7C5DFA"}` }}>
              Bill To
            </h4>
          </div>
          <div className="form-item">
            <div className="form-label">
              <label
                htmlFor=""
                style={{ color: `${isDark ? "white" : "#7C5DFA"}` }}
              >
                Client's Name
              </label>
            </div>
            <div className="form-input">
              <input
                style={{
                  backgroundColor: `${isDark ? "#252945" : "white"}`,
                  color: `${isDark ? "white" : "black"}`,
                  borderColor: `${isDark ? "#252945" : "#DFE3FA"}`,
                }}
                type="text"
                name={clientName}
                placeholder={clientName}
                onChange={(e) => setClientName(e.target.value)}
                id=""
              />
            </div>
          </div>
          <div className="form-item">
            <div className="form-label">
              <label
                htmlFor=""
                style={{ color: `${isDark ? "white" : "#7C5DFA"}` }}
              >
                Client's Email
              </label>
            </div>
            <div className="form-input">
              <input
                style={{
                  backgroundColor: `${isDark ? "#252945" : "white"}`,
                  color: `${isDark ? "white" : "black"}`,
                  borderColor: `${isDark ? "#252945" : "#DFE3FA"}`,
                }}
                type="email"
                name={clientEmail}
                placeholder={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                id=""
              />
            </div>
          </div>
          <div className="form-item">
            <div className="form-label">
              <label
                htmlFor=""
                style={{ color: `${isDark ? "white" : "#7C5DFA"}` }}
              >
                Street Address
              </label>
            </div>
            <div className="form-input">
              <input
                style={{
                  backgroundColor: `${isDark ? "#252945" : "white"}`,
                  color: `${isDark ? "white" : "black"}`,
                  borderColor: `${isDark ? "#252945" : "#DFE3FA"}`,
                }}
                type="text"
                name={clientAddress.street}
                placeholder={clientAddress.street}
                onChange={(e) =>
                  setClientAddress({ ...clientAddress, street: e.target.value })
                }
                id=""
              />
            </div>
          </div>
          <div className="form-item-flex">
            <div className="form-item">
              <div className="form-label">
                <label
                  htmlFor=""
                  style={{ color: `${isDark ? "white" : "#7C5DFA"}` }}
                >
                  City
                </label>
              </div>
              <div className="form-input">
                <input
                  style={{
                    backgroundColor: `${isDark ? "#252945" : "white"}`,
                    color: `${isDark ? "white" : "black"}`,
                    borderColor: `${isDark ? "#252945" : "#DFE3FA"}`,
                  }}
                  type="text"
                  name={clientAddress.city}
                  placeholder={clientAddress.city}
                  onChange={(e) =>
                    setClientAddress({ ...clientAddress, city: e.target.value })
                  }
                  id=""
                />
              </div>
            </div>
            <div className="form-item">
              <div className="form-label">
                <label
                  htmlFor=""
                  style={{ color: `${isDark ? "white" : "#7C5DFA"}` }}
                >
                  Post Code
                </label>
              </div>
              <div className="form-input">
                <input
                  style={{
                    backgroundColor: `${isDark ? "#252945" : "white"}`,
                    color: `${isDark ? "white" : "black"}`,
                    borderColor: `${isDark ? "#252945" : "#DFE3FA"}`,
                  }}
                  type="text"
                  name={clientAddress.postCode}
                  placeholder={clientAddress.postCode}
                  onChange={(e) =>
                    setClientAddress({
                      ...clientAddress,
                      postCode: e.target.value,
                    })
                  }
                  id=""
                />
              </div>
            </div>
            <div className="form-item">
              <div className="form-label">
                <label
                  htmlFor=""
                  style={{ color: `${isDark ? "white" : "#7C5DFA"}` }}
                >
                  Country
                </label>
              </div>
              <div className="form-input">
                <input
                  style={{
                    backgroundColor: `${isDark ? "#252945" : "white"}`,
                    color: `${isDark ? "white" : "black"}`,
                    borderColor: `${isDark ? "#252945" : "#DFE3FA"}`,
                  }}
                  type="text"
                  name={clientAddress.country}
                  placeholder={clientAddress.country}
                  onChange={(e) =>
                    setClientAddress({
                      ...clientAddress,
                      country: e.target.value,
                    })
                  }
                  id=""
                />
              </div>
            </div>
          </div>
          <div className="form-item-flex">
            <div className="form-item">
              <div className="form-label">
                <label
                  htmlFor=""
                  style={{ color: `${isDark ? "white" : "#7C5DFA"}` }}
                >
                  Invoice Date
                </label>
              </div>
              <div className="form-input">
                <input
                  style={{
                    backgroundColor: `${isDark ? "#252945" : "white"}`,
                    color: `${isDark ? "white" : "black"}`,
                    borderColor: `${isDark ? "#252945" : "#DFE3FA"}`,
                  }}
                  type="date"
                  name={createdAt}
                  placeholder={createdAt}
                  onChange={(e) => setCreatedAt(e.target.value)}
                  id=""
                />
              </div>
            </div>
            <div className="form-item">
              <div className="form-label">
                <label
                  htmlFor=""
                  style={{ color: `${isDark ? "white" : "#7C5DFA"}` }}
                >
                  Payment Terms
                </label>
              </div>
              <div className="form-input">
                <select
                  style={{
                    backgroundColor: `${isDark ? "#252945" : "white"}`,
                    color: `${isDark ? "white" : "black"}`,
                    borderColor: `${isDark ? "#252945" : "#DFE3FA"}`,
                  }}
                  name={paymentTerms}
                  value={paymentTerms}
                  onChange={(e) => setPaymentTerms(e.target.value)}
                  id=""
                >
                  <option value="1">Net 1 day</option>
                  <option value="7">Net 7 days</option>
                  <option value="14">Net 14 days</option>
                  <option value="30">Net 30 days</option>
                </select>
              </div>
            </div>
          </div>
          <div className="form-item">
            <div className="form-label">
              <label
                htmlFor=""
                style={{ color: `${isDark ? "white" : "#7C5DFA"}` }}
              >
                Project Description
              </label>
            </div>
            <div className="form-input">
              <input
                style={{
                  backgroundColor: `${isDark ? "#252945" : "white"}`,
                  color: `${isDark ? "white" : "black"}`,
                  borderColor: `${isDark ? "#252945" : "#DFE3FA"}`,
                }}
                type="text"
                name={description}
                placeholder={description}
                onChange={(e) => setDescription(e.target.value)}
                id=""
              />
            </div>
          </div>
          <div className="form-heading">
            <h4
              style={{
                color: `${isDark ? "white" : "#7C5DFA"}`,
              }}
            >
              Item List
            </h4>
          </div>

          {items &&
            items.map((item, index) => (
              <div className="form-item-flex-table">
                <div className="form-item input-item-name">
                  <div className="form-label">
                    <label
                      htmlFor=""
                      style={{ color: `${isDark ? "white" : "#7C5DFA"}` }}
                    >
                      Item Name
                    </label>
                  </div>
                  <div className="form-input ">
                    <input
                      style={{
                        backgroundColor: `${isDark ? "#252945" : "white"}`,
                        color: `${isDark ? "white" : "black"}`,
                        borderColor: `${isDark ? "#252945" : "#DFE3FA"}`,
                      }}
                      type="text"
                      name="name"
                      onChange={(e) => (item.name = e.target.value)}
                      id=""
                      placeholder={`${item.name}`}
                    />
                  </div>
                </div>
                <div className="form-item input-quantity">
                  <div className="form-label">
                    <label
                      htmlFor=""
                      style={{ color: `${isDark ? "white" : "#7C5DFA"}` }}
                    >
                      Qty
                    </label>
                  </div>
                  <div className="form-input ">
                    <input
                      style={{
                        backgroundColor: `${isDark ? "#252945" : "white"}`,
                        color: `${isDark ? "white" : "black"}`,
                        borderColor: `${isDark ? "#252945" : "#DFE3FA"}`,
                      }}
                      type="text"
                      name="quantity"
                      onChange={(e) => (item.quantity = e.target.value)}
                      id=""
                      placeholder={`${item.quantity}`}
                    />
                  </div>
                </div>
                <div className="form-item input-price">
                  <div className="form-label">
                    <label
                      htmlFor=""
                      style={{ color: `${isDark ? "white" : "#7C5DFA"}` }}
                    >
                      Price
                    </label>
                  </div>
                  <div className="form-input ">
                    <input
                      style={{
                        backgroundColor: `${isDark ? "#252945" : "white"}`,
                        color: `${isDark ? "white" : "black"}`,
                        borderColor: `${isDark ? "#252945" : "#DFE3FA"}`,
                      }}
                      type="text"
                      name="price"
                      onChange={(e) => (item.price = e.target.value)}
                      id=""
                      placeholder={`${item.price}`}
                    />
                  </div>
                </div>
                <div className="form-item input-total">
                  <div className="form-label">
                    <label
                      htmlFor=""
                      style={{ color: `${isDark ? "white" : "#7C5DFA"}` }}
                    >
                      Total
                    </label>
                  </div>
                  <div className="form-input ">
                    <input
                      type="text"
                      placeholder={`${
                        isNaN(item.quantity) || isNaN(item.price)
                          ? 0
                          : item.quantity * item.price
                      }`}
                      value={`${
                        isNaN(item.quantity) || isNaN(item.price)
                          ? 0
                          : item.quantity * item.price
                      }`}
                      onChange={`${
                        isNaN(item.quantity) || isNaN(item.price)
                          ? 0
                          : item.quantity * item.price
                      }`}
                      style={{
                        color: `${isDark ? "white" : "#7C5DFA"}`,
                        backgroundColor: `${isDark ? "#252945" : "white"}`,
                        borderColor: `${isDark ? "#252945" : "#DFE3FA"}`,
                      }}
                    />
                  </div>
                </div>
                <div
                  className="form-item input-icon"
                  onClick={() => handleItemDelete(index)}
                >
                  <img src={deleteIcon} alt="" />
                </div>
              </div>
            ))}
          <div className="form-item">
            <button
              style={{
                backgroundColor: `${isDark ? "#252945" : "#DFE3FA"}`,
                color: `${isDark ? "white" : "#7E88C3"}`,
              }}
              className="form-item-button"
              onClick={(e) => addItemHandler(e)}
            >
              <img src={plusIcon} alt="" /> Add New Item
            </button>
          </div>
          <div className="form-item">
            <div className="button-flex">
              <div></div>
              <div className="button-flex-item">
                <button
                  className="form-item-button button-light"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="form-item-button button-blue"
                  onClick={(e) => saveAndSubmitHandler(e)}
                >
                  Save Changes
                </button>
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
