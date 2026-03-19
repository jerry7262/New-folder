import React, { useState } from "react"
import styles from "./Prayer.module.css"

const Prayer = () => {

  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [prayers, setPrayers] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()

    const newPrayer = {
      name,
      message
    }

    setPrayers([newPrayer, ...prayers])

    setName("")
    setMessage("")
  }

  return (
    <div className={styles.container}>

      <h1 className={styles.title}>Prayer Requests</h1>

      <p className={styles.subtitle}>
        Share your prayer with us. You are not alone.
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <textarea
          placeholder="Write your prayer..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <button type="submit">Submit Prayer</button>

      </form>
      <div className={styles.extra}>
        <h2>Why Prayer Matters?</h2>
        <p>
          Prayer is a powerful way to connect with God. It brings peace,
          guidance, and strength during difficult times. Through prayer,
          we open our hearts and seek divine help.
        </p>
      </div>
      <div className={styles.prayerList}>
        <h2>Community Prayers</h2>

        {prayers.map((p, index) => (
          <div key={index} className={styles.prayerCard}>
            <h4>{p.name}</h4>
            <p>{p.message}</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Prayer