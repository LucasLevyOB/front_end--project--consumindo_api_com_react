import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ProductsProvider from "./providers/productsProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProductsProvider>
      <App />
    </ProductsProvider>
  </React.StrictMode>
);
