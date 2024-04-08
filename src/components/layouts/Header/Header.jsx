import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ROUTES } from "../../../utils/routes";

import styles from "./Header.module.css";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.jpg";

import { toggleForm } from "../../../features/user/userSlice";
import { useGetProductsQuery } from "../../../features/api/apiSlice";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, cart } = useSelector(({ user }) => user);
  const [values, setValues] = useState({ name: "Guest", avatar });
  const [searchValue, setSearchValue] = useState("");

  const { data, isLoading } = useGetProductsQuery({ title: searchValue });

  useEffect(() => {
    if (!currentUser) return;
    setValues(currentUser);
  }, [currentUser]);

  const handleClick = () => {
    if (!currentUser) {
      dispatch(toggleForm(true));
    } else {
      navigate(ROUTES.PROFILE);
    }
  };

  const searchHandle = ({ target: { value } }) => {
    setSearchValue(value);
  };

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Link to={ROUTES.HOME}>
            <img src={logo} alt="Logotype" />
          </Link>
        </div>
        <div className={styles.info}>
          <div className={styles.user} onClick={handleClick}>
            <div
              className={styles.avatar}
              style={{ backgroundImage: `url(${values.avatar})` }}
            />
            <div className={styles.username}>{values.name}</div>
          </div>

          <form className={styles.form}>
            <div className={styles.icon}>
              <svg className="icon">
                <use
                  xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`}
                />
              </svg>
            </div>
            <div className={styles.input}>
              <input
                type="search"
                name="search"
                placeholder="Search for anything... "
                autoComplete="off"
                onChange={searchHandle}
                value={searchValue}
              />
            </div>
            {searchValue && (
              <div className={styles.box}>
                {isLoading
                  ? "Loading"
                  : !data.length
                  ? "No results"
                  : data.map(({ title, images, id }) => {
                      return (
                        <Link
                          key={id}
                          onClick={() => setSearchValue("")}
                          className={styles.item}
                          to={`/products/${id}`}
                        >
                          <div
                            className={styles.image}
                            style={{ backgroundImage: `url(${images[0]})` }}
                          />
                          <div className={styles.title}>{title}</div>
                        </Link>
                      );
                    })}
              </div>
            )}
          </form>
          <div className={styles.account}>
            <Link className={styles.favourites} to={ROUTES.HOME}>
              <svg className={styles["icon-fav"]}>
                <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
              </svg>
            </Link>
            <Link className={styles.cart} to={ROUTES.CART}>
              <svg className={styles["icon-fav"]}>
                <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
              </svg>
              {!!cart.length && <span className={styles.count}>{cart.length}</span>}
              
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
