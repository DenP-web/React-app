import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getCategories } from "../../features/categories/categoriesSlice";
import { getProducts } from "../../features/products/productsSlice";

import Header from "../layouts/Header/Header";
import AppRoutes from "../Routes/Routes";
import Footer from "../layouts/Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import UserForm from "../User/UserForm";

export default function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getProducts())
  }, [dispatch])

  return (
    <div className="app">
      <Header />

      <UserForm />

      <div className="container">
        <Sidebar />
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
}
