import React from "react"
import styles from "./HistoryPreview.module.css"
import { Link } from "react-router-dom"

const HistoryPreview = () => {

  return (

    <section className={styles.historySection}>

      <div className={styles.content}>

        <h2>History of Christianity</h2>

        <p>
          Christianity began over 2000 years ago with the teachings of Jesus Christ.
          It grew from a small group of followers into one of the largest religions
          in the world.
        </p>

        <Link to="/history">
          <button className={styles.btn}>Read More</button>
        </Link>

      </div>

    </section>

  )

}

export default HistoryPreview