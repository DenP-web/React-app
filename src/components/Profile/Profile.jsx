import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateUser } from "../../features/user/userSlice";

import styles from "./Profile.module.css";

export default function Profile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(({ user }) => user);
  const [values, setValues] = useState({
    email: "",
    name: "",
    password: "",
    avatar: "",
  });

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isNotEmpty = Object.values(values).some((val) => !val);
    if (isNotEmpty) return;

    dispatch(updateUser(values));
  };
  useEffect(() => {
    if (!currentUser) return;
    setValues(currentUser);
  }, [currentUser]);

  return (
    <section className={styles.profile}>
      {!currentUser ? (
        <span>You need to login</span>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.group}>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={values.email}
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.group}>
            <input
              type="name"
              name="name"
              placeholder="Your name"
              value={values.name}
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.group}>
            <input
              type="password"
              name="password"
              placeholder="Your password"
              value={values.password}
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.group}>
            <input
              type="avatar"
              name="avatar"
              placeholder="Your avatar"
              value={values.avatar}
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </div>
          <button className={styles.submit} type="submit">
            Update
          </button>
        </form>
      )}
    </section>
  );
}
