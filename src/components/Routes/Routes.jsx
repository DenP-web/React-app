import React from "react";
import { Routes, Route } from "react-router-dom";

import { ROUTES } from "../../utils/routes";

import Home from "../Home/Home";
import SingleProduct from "../Products/SingleProduct/SingleProduct";
import Profile from "../Profile/Profile";
import SingleCategory from "../Categories/SingleCategory";
import Cart from "../Cart/Cart";

export default function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path={ROUTES.PRODUCTS} element={<SingleProduct />} />
      <Route path={ROUTES.PROFILE} element={<Profile />} />
      <Route path={ROUTES.CATEGORY} element={<SingleCategory />} />
      <Route path={ROUTES.CART} element={<Cart />} />
    </Routes>
  );
}
