import React from "react";

import { BrowserRouter, Routes as ReactRoutes, Route } from "react-router-dom";
import Create from "./pages/Create";
import Edit from "./pages/Edit";

import Home from "./pages/Home";
import { ProductsProvider } from "./providers/productsProvider";

const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/" exact element={<Home />} />
        <Route path="/edit/:id" exact element={<Edit />} />
        <Route path="/create" exact element={<Create />} />
      </ReactRoutes>
    </BrowserRouter>
  );
};

export default Routes;
