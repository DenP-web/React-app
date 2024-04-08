import React from "react";

import styles from "../../styles/Home.module.css";

import bgImg from "../images/computer.png";

export default function Poster() {
  return (
    <section className={styles.home}>
      <div className={styles.title}>BIG SALE 20%</div>
      <div className={styles.product}>
        <div className={styles.text}>
          <div className={styles.subtitle}>the best seller of 2023</div>
          <h1 className={styles.head}>Lennon r2d2 2023 NVIDIA 4060 TI</h1>
          <button className={styles.button}>Shop Now</button>
        </div>
        <div className={styles.image}>
          <img src={bgImg} alt="Image of Computer" />
        </div>
      </div>
    </section>
  );
}
