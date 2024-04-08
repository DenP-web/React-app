import React from "react";
import { Link } from "react-router-dom";

import styles from "./Footer.module.css";

import { ROUTES } from "../../../utils/routes";

import logo from "../../images/logo.svg";

export default function Footer() {
  return (
    <section className={styles.footer}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={logo} alt="Logotype" />
        </Link>
      </div>
      <div className={styles.rights}>
        Developed by{" "}
        <a href="https://www.google.com" target="_blank" rel="noreferrer">
          ME
        </a>
      </div>

      <div className={styles.socials}>
        <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
          <svg className={styles.icon}>
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#instagram`} />
          </svg>
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
          <svg className={styles.icon}>
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#facebook`} />
          </svg>
        </a>
        <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
          <svg className={styles.icon}>
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#youtube`} />
          </svg>
        </a>
      </div>
    </section>
  );
}
