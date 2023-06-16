import React, { useEffect, useState } from "react";
import "../styles/sidebar.css";
import deleteIcon from "../assets/icon-delete.svg";
import plusIcon from "../assets/icon-plus.svg";
import iconLeft from "../assets/icon-arrow-left.svg";
import "../styles/singleInvoice.css";
import { useNavigate } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { darkMode, invoices } from "../state/state";

const EditInvoice = ({ open, setOpen, id }) => {
  const isDark = useRecoilValue(darkMode);
  const navigate = useNavigate();
  const [invoiceList, setInvoiceList] = useRecoilState(invoices);
  const singleData = invoiceList.find((elem) => elem.id === id);
  const [senderAddress, setSenderAddress] = useState(singleData.senderAddress);
  const [items, setItems] = useState([...singleData.items]);
  const [clientName, setClientName] = useState(singleData.clientName);
  const [clientEmail, setClientEmail] = useState(singleData.clientEmail);
  const [clientAddress, setClientAddress] = useState(singleData.clientAddress);
  const [createdAt, setCreatedAt] = useState(singleData.createdAt);
  const [paymentTerms, setPaymentTerms] = useState(singleData.paymentTerms);
  const [description, setDescription] = useState(singleData.description);
  const [formItems, setFormItems] = useState({
    name: "",
    quantity: "",
    price: "",
    total: 0,
  });
  const [showForm, setShowForm] = useState(false);

  const addItemHandler = (e) => {
    e.preventDefault();
    setShowForm(true);

    if (formItems.name.length && formItems.quantity.length) {
      setItems([
        ...items,
        {
          ...formItems,
          total: parseInt(formItems.quantity) * parseInt(formItems.price),
        },
      ]);

      setFormItems({
        ...formItems,
        name: "",
        quantity: "",
        price: "",
        total: 0,
      });
    }
  };

  const [validation, setValidation] = useState({
    createdAt: true,
    paymentDue: true,
    description: true,
    clientName: true,
    clientEmail: true,
    senderAddressStreet: true,
    senderAddressCity: true,
    senderAddressPostCode: true,
    senderAddressCountry: true,
    clientAddressStreet: true,
    clientAddressCity: true,
    clientAddressPostCode: true,
    clientAddressCountry: true,
  });

  const handleItemDelete = (index) => {
    setItems(items.filter((item, indx) => indx !== index));
  };

  const saveAndSubmitHandler = (e) => {
    e.preventDefault();
    let validated = true;

    setInvoiceList(invoiceList.filter((invoice) => invoice.id !== id));

    let submittedItems = [...items];

    if (formItems.name.length && formItems.quantity.length) {
      submittedItems.push({
        ...formItems,
        total: parseInt(formItems.quantity) * formItems.price,
      });
    }
    let total = 0;

    for (let item of submittedItems) {
      total += parseInt(item.total);
    }

    const EditedInvoice = {
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
      items: submittedItems,
      total: total,
    };

    for (let item in EditedInvoice) {
      if (item === "createdAt") {
        if (!createdAt.length)
          setValidation({ ...validation, createdAt: false });
        validated = false;
      }
      if (item === "description") {
        if (!description.length)
          setValidation({ ...validation, description: false });
        validated = false;
      }
      if (item === "clientName") {
        if (!clientName.length)
          setValidation({ ...validation, clientName: false });
        validated = false;
      }
      if (item === "clientEmail") {
        if (!clientEmail.length)
          setValidation({ ...validation, clientEmail: false });
        validated = false;
      }
      if (item === "senderAddress") {
        if (!senderAddress.city.length) {
          setValidation({ ...validation, senderAddressCity: false });
          validated = false;
        }
        if (!senderAddress.postCode.length) {
          setValidation({ ...validation, senderAddressPostCode: false });
          validated = false;
        }
        if (!senderAddress.country.length) {
          setValidation({ ...validation, senderAddressCountry: false });
          validated = false;
        }
        if (!senderAddress.street.length) {
          setValidation({ ...validation, senderAddressStreet: false });
          validated = false;
        }
      }

      if (item === "clientAddress") {
        if (!clientAddress.city.length) {
          setValidation({ ...validation, clientAddressCity: false });
          validated = false;
        }
        if (!clientAddress.postCode.length) {
          setValidation({ ...validation, clientAddressPostCode: false });
          validated = false;
        }
        if (!clientAddress.country.length) {
          setValidation({ ...validation, clientAddressCountry: false });
          validated = false;
        }
        if (!clientAddress.street.length) {
          setValidation({ ...validation, clientAddressStreet: false });
          validated = false;
        }
      }
    }

    if (validated) {
      if (invoiceList.length) {
        setInvoiceList((prev) => [...prev, EditedInvoice]);
      } else {
        setInvoiceList([EditedInvoice]);
      }

      setOpen(false);
    }
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
                className={`${
                  !validation.senderAddressStreet ? "validation-red" : ""
                }`}
                placeholder={senderAddress.street}
                onChange={(e) => {
                  setSenderAddress({
                    ...senderAddress,
                    street: e.target.value,
                  });
                  setValidation({ ...validation, senderAddressStreet: true });
                }}
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
                  className={`${
                    !validation.senderAddressCity ? "validation-red" : ""
                  }`}
                  placeholder={senderAddress.city}
                  onChange={(e) => {
                    setSenderAddress({
                      ...senderAddress,
                      city: e.target.value,
                    });
                    setValidation({ ...validation, senderAddressCity: true });
                  }}
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
                  className={`${
                    !validation.senderAddressPostCode ? "validation-red" : ""
                  }`}
                  onChange={(e) => {
                    setSenderAddress({
                      ...senderAddress,
                      postCode: e.target.value,
                    });
                    setValidation({
                      ...validation,
                      senderAddressPostCode: true,
                    });
                  }}
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
                  className={`${
                    !validation.senderAddressCountry ? "validation-red" : ""
                  }`}
                  onChange={(e) => {
                    setSenderAddress({
                      ...senderAddress,
                      country: e.target.value,
                    });
                    setValidation({
                      ...validation,
                      senderAddressCountry: true,
                    });
                  }}
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
                className={`${!validation.clientName ? "validation-red" : ""}`}
                placeholder={clientName}
                onChange={(e) => {
                  setClientName(e.target.value);
                  setValidation({ ...validation, clientName: true });
                }}
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
                className={`${!validation.clientEmail ? "validation-red" : ""}`}
                onChange={(e) => {
                  setClientEmail(e.target.value);
                  setValidation({ ...validation, clientEmail: true });
                }}
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
                className={`${
                  !validation.clientAddressStreet ? "validation-red" : ""
                }`}
                placeholder={clientAddress.street}
                onChange={(e) => {
                  setClientAddress({
                    ...clientAddress,
                    street: e.target.value,
                  });
                  setValidation({ ...validation, clientAddressStreet: true });
                }}
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
                  className={`${
                    !validation.clientAddressCity ? "validation-red" : ""
                  }`}
                  placeholder={clientAddress.city}
                  onChange={(e) => {
                    setClientAddress({
                      ...clientAddress,
                      city: e.target.value,
                    });
                    setValidation({ ...validation, clientAddressCity: true });
                  }}
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
                  className={`${
                    !validation.clientAddressPostCode ? "validation-red" : ""
                  }`}
                  onChange={(e) => {
                    setClientAddress({
                      ...clientAddress,
                      postCode: e.target.value,
                    });
                    setValidation({
                      ...validation,
                      clientAddressPostCode: true,
                    });
                  }}
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
                  className={`${
                    !validation.clientAddressCountry ? "validation-red" : ""
                  }`}
                  onChange={(e) => {
                    setClientAddress({
                      ...clientAddress,
                      country: e.target.value,
                    });

                    setValidation({
                      ...validation,
                      clientAddressCountry: true,
                    });
                  }}
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
                  className={`${!validation.createdAt ? "validation-red" : ""}`}
                  placeholder={createdAt}
                  onChange={(e) => {
                    setCreatedAt(e.target.value);
                    setValidation({ ...validation, createdAt: true });
                  }}
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
                className={`${!validation.description ? "validation-red" : ""}`}
                placeholder={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setValidation({ ...validation, description: true });
                }}
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
                        backgroundColor: `${
                          isDark ? "#1a1d30" : "rgb(233, 233, 233)"
                        }`,
                        color: `${isDark ? "white" : "black"}`,
                        borderColor: `${isDark ? "#252945" : "#DFE3FA"}`,
                      }}
                      type="text"
                      name="name"
                      disabled
                      placeholder={`${item.name}`}
                    />
                  </div>
                </div>
                <div className="form-item input-quantity">
                  <div className="form-input ">
                    <input
                      style={{
                        backgroundColor: `${
                          isDark ? "#1a1d30" : "rgb(233, 233, 233)"
                        }`,
                        color: `${isDark ? "white" : "black"}`,
                        borderColor: `${isDark ? "#252945" : "#DFE3FA"}`,
                      }}
                      type="text"
                      name="quantity"
                      disabled
                      id=""
                      placeholder={`${item.quantity}`}
                    />
                  </div>
                </div>
                <div className="form-item input-price">
                  <div className="form-input ">
                    <input
                      style={{
                        backgroundColor: `${
                          isDark ? "#1a1d30" : "rgb(233, 233, 233)"
                        }`,
                        color: `${isDark ? "white" : "black"}`,
                        borderColor: `${isDark ? "#252945" : "#DFE3FA"}`,
                      }}
                      type="text"
                      name="price"
                      disabled
                      id=""
                      placeholder={`${item.price}`}
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
                <div className="form-item input-icon"></div>
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
