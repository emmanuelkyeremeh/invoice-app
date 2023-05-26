import React, { useState } from "react";
import "../styles/sidebar.css";
import deleteIcon from "../assets/icon-delete.svg";
import plusIcon from "../assets/icon-plus.svg";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { darkMode, invoices } from "../state/state";
import nextId from "react-id-generator";

const NewInvoice = ({ openSidebar, setOpenSidebar }) => {
  const htmlId = nextId();
  const [items, setItems] = useState([]);
  const isDark = useRecoilValue(darkMode);
  const setinvoiceList = useSetRecoilState(invoices);
  const [senderAddress, setSenderAddress] = useState({
    street: "",
    city: "",
    postCode: "",
    country: "",
  });
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientAddress, setClientAddress] = useState({
    street: "",
    city: "",
    postCode: "",
    country: "",
  });
  const [createdAt, setCreatedAt] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("");
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formItems, setFormItems] = useState({
    name: "",
    quantity: "",
    price: "",
    total: 0,
  });

  const addItemHandler = (e) => {
    e.preventDefault();
    setShowForm(true);

    if (formItems.name.length && formItems.quantity.length) {
      setItems([...items, formItems]);

      setFormItems({
        ...formItems,
        name: "",
        quantity: "",
        price: "",
        total: 0,
      });
    }
  };

  const handleItemDelete = (index) => {
    setItems(items.filter((item, indx) => indx !== index));
  };

  const saveAndSubmitHandler = (e, status) => {
    e.preventDefault();

    let submittedItems = [...items];

    if (formItems.name.length && formItems.quantity.length) {
      submittedItems.push(formItems);
    }
    let total = 0;

    for (let item of submittedItems) {
      item.total = parseInt(item.quantity) * parseInt(item.price);
      total += parseInt(item.total);
    }

    const newInvoice = {
      id: htmlId,
      createdAt: createdAt,
      paymentDue: createdAt,
      description: description,
      paymentTerms: paymentTerms,
      clientName: clientName,
      clientEmail: clientEmail,
      status: status,
      senderAddress: senderAddress,
      clientAddress: clientAddress,
      items: submittedItems,
      total: total,
    };

    setinvoiceList((prev) => [...prev, newInvoice]);
  };
  return (
    <div className="sidebar">
      <div
        className="sidebar-content"
        style={{ backgroundColor: `${isDark ? "#141625" : "white"}` }}
      >
        <form className="sidebar-form">
          <div className="form-heading">
            <h2>New Invoice</h2>
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
                name={senderAddress.street}
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
                  name={paymentTerms}
                  onChange={(e) => setPaymentTerms(e.target.value)}
                  id=""
                  style={{
                    backgroundColor: `${isDark ? "#252945" : "white"}`,
                    color: `${isDark ? "white" : "black"}`,
                    borderColor: `${isDark ? "#252945" : "#DFE3FA"}`,
                  }}
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
                onChange={(e) => setDescription(e.target.value)}
                id=""
              />
            </div>
          </div>
          <div className="form-heading">
            <h4>Item List</h4>
          </div>

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
            </div>
            <div className="form-item input-icon"></div>
          </div>

          {items &&
            items.map((item, index) => (
              <div className="form-item-flex-table">
                <div className="form-item input-item-name">
                  <div className="form-input ">
                    <input
                      style={{
                        backgroundColor: `${isDark ? "#252945" : "white"}`,
                        color: `${isDark ? "white" : "black"}`,
                        borderColor: `${isDark ? "#252945" : "#DFE3FA"}`,
                      }}
                      type="text"
                      name="name"
                      placeholder={item.name}
                      disabled
                      id=""
                    />
                  </div>
                </div>
                <div className="form-item input-quantity">
                  <div className="form-input ">
                    <input
                      style={{
                        backgroundColor: `${isDark ? "#252945" : "white"}`,
                        color: `${isDark ? "white" : "black"}`,
                        borderColor: `${isDark ? "#252945" : "#DFE3FA"}`,
                      }}
                      type="text"
                      name="quantity"
                      disabled
                      placeholder={item.quantity}
                      id=""
                    />
                  </div>
                </div>
                <div className="form-item input-price">
                  <div className="form-input ">
                    <input
                      style={{
                        backgroundColor: `${isDark ? "#252945" : "white"}`,
                        color: `${isDark ? "white" : "black"}`,
                        borderColor: `${isDark ? "#252945" : "#DFE3FA"}`,
                      }}
                      type="text"
                      name="price"
                      disabled
                      placeholder={item.price}
                      id=""
                    />
                  </div>
                </div>
                <div className="form-item input-total">
                  <div className="form-input ">
                    <p
                      style={{
                        color: `${isDark ? "white" : "#7C5DFA"}`,
                        borderColor: `${isDark ? "#252945" : "#DFE3FA"}`,
                      }}
                    >
                      {isNaN(item.quantity) || isNaN(item.price)
                        ? 0
                        : item.quantity * item.price}
                    </p>
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
            {showForm && (
              <div className="form-item-flex-table">
                <div className="form-item input-item-name">
                  <div className="form-input ">
                    <input
                      style={{
                        backgroundColor: `${isDark ? "#252945" : "white"}`,
                        color: `${isDark ? "white" : "black"}`,
                        borderColor: `${isDark ? "#252945" : "#DFE3FA"}`,
                      }}
                      type="text"
                      // name={formItems.name}
                      onChange={(e) =>
                        setFormItems({ ...formItems, name: e.target.value })
                      }
                      placeholder="Name"
                    />
                  </div>
                </div>
                <div className="form-item input-quantity">
                  <div className="form-input ">
                    <input
                      style={{
                        backgroundColor: `${isDark ? "#252945" : "white"}`,
                        color: `${isDark ? "white" : "black"}`,
                        borderColor: `${isDark ? "#252945" : "#DFE3FA"}`,
                      }}
                      type="text"
                      // name={formItems.quantity}
                      onChange={(e) =>
                        setFormItems({ ...formItems, quantity: e.target.value })
                      }
                      placeholder="qty"
                      id=""
                    />
                  </div>
                </div>
                <div className="form-item input-price">
                  <div className="form-input ">
                    <input
                      style={{
                        backgroundColor: `${isDark ? "#252945" : "white"}`,
                        color: `${isDark ? "white" : "black"}`,
                        borderColor: `${isDark ? "#252945" : "#DFE3FA"}`,
                      }}
                      type="text"
                      onChange={(e) =>
                        setFormItems({ ...formItems, price: e.target.value })
                      }
                      placeholder="price"
                      id=""
                    />
                  </div>
                </div>
                <div className="form-item input-total">
                  <div className="form-input ">
                    <p
                      style={{
                        color: `${isDark ? "white" : "#7C5DFA"}`,
                        borderColor: `${isDark ? "#252945" : "#DFE3FA"}`,
                      }}
                    >
                      {isNaN(formItems.quantity) || isNaN(formItems.price)
                        ? 0
                        : formItems.quantity * formItems.price}
                    </p>
                  </div>
                </div>
                <div
                  className="form-item input-icon"
                  onClick={() =>
                    setFormItems({
                      name: "",
                      quantity: "",
                      price: "",
                      total: 0,
                    })
                  }
                >
                  <img src={deleteIcon} alt="" />
                </div>
              </div>
            )}
            <div className="form-item">
              <button
                style={{
                  backgroundColor: `${isDark ? "#252945" : "#DFE3FA"}`,
                  color: `${isDark ? "white" : "#7E88C3"}`,
                }}
                type="submit"
                onClick={(e) => addItemHandler(e)}
                className="form-item-button"
              >
                <img src={plusIcon} alt="" /> Add New Item
              </button>
            </div>
          </div>

          <div className="form-item">
            <div className="button-flex">
              <div>
                <button
                  className="form-item-button button-light"
                  onClick={() => setOpenSidebar(false)}
                >
                  Discard
                </button>
              </div>
              <div className="button-flex-item">
                <button
                  className="form-item-button button-black"
                  onClick={(e) => saveAndSubmitHandler(e, "draft")}
                >
                  Save as Draft
                </button>
                <button
                  className="form-item-button button-blue"
                  onClick={(e) => saveAndSubmitHandler(e, "pending")}
                >
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
