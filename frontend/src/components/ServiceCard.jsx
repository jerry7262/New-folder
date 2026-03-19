import React from 'react'
import styles from './ServiceCard.module.css'
import { Link } from "react-router-dom"
const ServiceCard = ({ title, description, button }) => {
  return (
    <div className={styles.card}>
      <div className={styles.overlay}>
        <h3>{title}</h3>
        <p>{description}</p>

        <Link to="/services" className={styles.btn}>
          {button}
        </Link>
      </div>
    </div>
  )
}

export default ServiceCard
