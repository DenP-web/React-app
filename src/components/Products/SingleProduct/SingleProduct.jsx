import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useGetProductQuery } from "../../../features/api/apiSlice";
import { getRelatedProducts } from "../../../features/products/productsSlice";

import { ROUTES } from "../../../utils/routes";

import Products from "../Products";
import Product from "../Product/Product";

export default function SingleProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, related } = useSelector(({ products }) => products);
  const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });

  useEffect(() => {
    if (!isFetching && !isLoading && !isSuccess) {
      navigate(ROUTES.HOME);
    }
  }, [isLoading, isSuccess, isFetching, navigate]);

  useEffect(() => {
    if(!data || !list.length) return
    if (data) {
      dispatch(getRelatedProducts(data.category.id));
    }
  }, [data, list.length,  dispatch]);

  return !data ? (
    <section className="preloader">Loading</section>
  ) : (
    <>
      <Product {...data}></Product>
      <Products products={related} amount={10} title="Related Products" />
    </>
  );
}
