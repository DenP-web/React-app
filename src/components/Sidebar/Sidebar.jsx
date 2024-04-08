import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./Sidebar.module.css";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const { list } = useSelector(({ categories }) => categories);
  const filteredList = list.filter((_, i) => i < 5)
  return (
    <section className={styles.sidebar}>
      <div className={styles.title}>CATEGORIES</div>

      <nav>
        <ul className={styles.menu}>
          {filteredList.map(({ id, name }) => {
            return (
              <li key={id}>
                <NavLink
                  className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.active : ""}`
                  }
                  to={`/categories/${id}`}
                >
                  {name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={styles.footer}>
        <a className={styles.link} href="/help" target="_blank">
          Help
        </a>
        <a
          className={styles.link}
          style={{ textDecoration: "underline" }}
          href="/terms"
          target="_blank"
        >
          Terms & Conditions
        </a>
      </div>
    </section>
  );
}
