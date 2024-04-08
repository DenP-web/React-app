import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../../features/api/apiSlice";

import styles from "./Category.module.css";
import Products from "../../Products/Products";

export default function Category() {
  const { id } = useParams();
  const { list } = useSelector(({ categories }) => categories);

  const defaultValues = {
    title: "",
    price_min: 1,
    price_max: 0,
    categoryId: id,
  };
  const defaultParams = {
    categoryId: id,
    limit: 5,
    offset: 0,
    ...defaultValues,
  };
  const [cat, setCat] = useState(null);
  const [isEnd, setEnd] = useState(false);
  const [items, setItems] = useState([]);
  const [values, setValue] = useState(defaultValues);
  const [params, setParams] = useState(defaultParams);

  const { data, isLoading, isSuccess } = useGetProductsQuery(params);

  useEffect(() => {
    if (!id) return;
    setItems([])
    setEnd(false)
    setValue(defaultValues)
    setParams({ ...defaultParams, categoryId: id });
  }, [id]);

  useEffect(() => {
    if (isLoading) return;
    if (!data.length ) return setEnd(true);
    setItems((_items) => [..._items, ...data]);
  }, [data, isLoading]);

  useEffect(() => {
    if (!list.length || !id) return;
    const category = list.find((item) => item.id === +id);
    setCat(category)
  }, [list, id]);

  const handleChange = ({ target: { value, name } }) => {
    setValue({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setItems([])
    setEnd(false)
    setParams({ ...defaultParams, ...values });
  };

  const handleReset =() => {
    setValue(defaultValues)
    setParams(defaultParams)
    setEnd(false)
  }

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{cat?.name}</h2>
      <form className={styles.filters} onSubmit={handleSubmit}>
        <div className={styles.filter}>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="Product Name"
            defaultValue={values.title}
          />
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_min"
            placeholder="0"
            onChange={handleChange}
            defaultValue={values.price_min}
          />
          <span>Price from</span>
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_max"
            placeholder="0"
            onChange={handleChange}
            defaultValue={values.price_max}
          />
          <span>Price to</span>
        </div>
        <button type="submit" hidden onSubmit={handleSubmit} />
      </form>
      {isLoading ? (
        <div className="preloader">Loading...</div>
      ) : !isSuccess || !items.length ? (
        <div className={styles.back}>
          <span>No results</span> <button onClick={handleReset}>Reset</button>
        </div>
      ) : (
        <Products
          title=""
          products={items}
          style={{ padding: 0 }}
          amount={items.length}
        />
      )}
      {!isEnd && (
        <div className={styles.more}>
          <button
            onClick={() =>
              setParams({ ...params, offset: params.offset + params.limit })
            }
          >
            See more
          </button>
        </div>
      )}
    </section>
  );
}
