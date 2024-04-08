import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { ROUTES } from "../../../utils/routes";

import styles from "./Product.module.css";
import { addItemToCart, addItemToFavourite } from "../../../features/user/userSlice";

const SIZES = [4, 4.5, 5];

export default function Product(item) {
  const { images, title, price, description } = item;

  const dispatch = useDispatch();

  const [currentImage, setCurrentImage] = useState();
  const [currentSize, setCurrentSize] = useState();
  useEffect(() => {
    if (!images.length) return;
    setCurrentImage(images[0]);
  }, [images]);

  const addToCard = () => {
    dispatch(addItemToCart(item));
  };
  const addToFavourite = () => {
    dispatch(addItemToFavourite(item))
  }

  return (
    <section className={styles.product}>
      <div className={styles.images}>
        <div
          className={styles.current}
          style={{ backgroundImage: `url(${currentImage})` }}
        />
        <div className={styles["images-list"]}>
          {images.map((image, i) => {
            return (
              <div
                key={i}
                className={styles.image}
                style={{ backgroundImage: `url(${image})` }}
                onClick={() => {
                  setCurrentImage(image);
                }}
              />
            );
          })}
        </div>
      </div>

      <div className={styles.info}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.price}>${price}</div>
        <div className={styles.color}>
          <span>Color: </span> Green
        </div>
        <div className={styles.sizes}>
          <span>Sizes: </span>
          <div className={styles.list}>
            {SIZES.map((size) => {
              return (
                <div
                  className={`${styles.size} ${
                    currentSize === size ? styles.active : ""
                  }`}
                  onClick={() => {
                    setCurrentSize(size);
                  }}
                  key={size}
                >
                  {size}
                </div>
              );
            })}
          </div>
        </div>
        <p className={styles.description}>{description}</p>
        <div className={styles.actions}>
          <button
            onClick={() => {
              addToCard();
            }}
            className={styles.add}
            disabled={!currentSize}
          >
            Add to card
          </button>
          <button
            className={styles.favourite}
            disabled={!currentSize}
            onClick={() => {
              addToFavourite();
            }}
          >
            Add to favourite
          </button>
        </div>
        <div className={styles.bottom}>
          <div className={styles.purchase}>19 people purchased</div>
          <Link to={ROUTES.HOME}>Return to store</Link>
        </div>
      </div>
    </section>
  );
}
