import React from "react";
import styles from "./History.module.css";
import { historyData } from "../data/historyData";

const History = () => {
  return (
    <div className={styles.container}>

      <h1 className={styles.title}>History of Christianity</h1>

      {historyData.map((item, index) => (
        <section
          key={index}
          className={`${styles.section} ${
            index % 2 !== 0 ? styles.reverse : ""
          }`}
        >
          <div className={styles.imageWrapper}>
            <img src={item.image} alt={item.title} />
          </div>

          <div className={styles.content}>
            <h2>{item.title}</h2>
            <p>{item.content}</p>
          </div>
        </section>
      ))}

      <button
        className={styles.btn}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Back to top ↑
      </button>

    </div>
  );
};

export default History;