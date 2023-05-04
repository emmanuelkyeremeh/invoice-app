import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./pages/App";
import SingleInvoice from "./pages/SingleInvoice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/invoice/:id",
    element: <SingleInvoice />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
