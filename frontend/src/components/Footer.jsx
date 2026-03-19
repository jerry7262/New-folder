import React from "react"
import styles from "./Footer.module.css"
import { Link } from "react-router-dom"

const Footer = () => {
  return (

    <footer className={styles.footer}>

      <div className={styles.container}>

        <div className={styles.section}>
          <h3>FaithConnect</h3>
          <p>
            A platform to explore the history, teachings,
            and spiritual guidance of Christianity.
          </p>
        </div>

        <div className={styles.section}>
          <h4>Quick Links</h4>

          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/history">History</Link></li>
            <li><Link to="/services">Services</Link></li>
          </ul>

        </div>

        <div className={styles.section}>
          <h4>Contact</h4>

          <p>Email: support@faithconnect.com</p>
          <p>Phone: +91 9876543210</p>

        </div>

      </div>

      <div className={styles.bottom}>
        <p>© 2026 FaithConnect | All Rights Reserved</p>
      </div>

    </footer>

  )
}

export default Footer