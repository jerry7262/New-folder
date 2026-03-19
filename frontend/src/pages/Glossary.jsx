import React from "react"
import styles from "./Glossary.module.css"
import { glossary } from "../data/glossary"

const Glossary = () => {
  return (
    <div className={styles.container}>

      <h1 className={styles.title}>Christian Glossary</h1>

      <p className={styles.subtitle}>
        Learn important theological terms and their meanings.
      </p>

      <div className={styles.grid}>

        {glossary.map((item) => (
          <div key={item.id} className={styles.card}>

            <h3>{item.term}</h3>

            <p>{item.meaning}</p>

          </div>
        ))}

      </div>

    </div>
  )
}

export default Glossary