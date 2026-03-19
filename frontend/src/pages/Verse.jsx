import React from "react"
import styles from "./Verse.module.css"

const Verse = () => {
  return (
    <div className={styles.container}>

      <h1 className={styles.title}>Daily Bible Verse</h1>

      <div className={styles.card}>
        <p className={styles.verse}>
          “For God so loved the world that He gave His one and only Son...”
        </p>

        <span className={styles.reference}>
          John 3:16
        </span>
      </div>

      <div className={styles.extra}>
        <h2>Reflection</h2>
        <p>
          This verse reminds us of God's unconditional love and sacrifice.
          It teaches us that faith, love, and belief bring eternal life.
        </p>
      </div>

    </div>
  )
}

export default Verse