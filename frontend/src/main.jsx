import "./bootstrapp/dist/css/bootstrap.min.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./style.css";
//import "./index.css";

import OrderProvider from "./context/OrderContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>

    <OrderProvider>
      <App />
    </OrderProvider>

  </StrictMode>
);