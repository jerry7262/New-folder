import React from "react"
import styles from "./About.module.css"
import aboutImg from "../assets/aboutImg.jpg"

const About = () => {
  return (
    <div className={styles.container}>

      <h1 className={styles.title}>About FaithConnect</h1>

      <section className={styles.section}>
        <div className={styles.image}>
          <img src={aboutImg} alt="About Faith" />
        </div>

        <div className={styles.text}>
          <h2>Our Mission</h2>
          <p>
            FaithConnect is a platform created to help people explore Christianity,
            understand the teachings of Jesus Christ, and grow spiritually.
            Our mission is to make faith accessible, meaningful, and inspiring
            for everyone.
          </p>

          <h2>Our Vision</h2>
          <p>
            We aim to build a global community where people can learn,
            reflect, and connect through faith. Whether you are new to Christianity
            or deep in your spiritual journey, this platform offers something for you.
          </p>
        </div>
      </section>

      <section className={styles.values}>
        <h2>What We Offer</h2>

        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>📖 Bible Teachings</h3>
            <p>Learn powerful lessons from the Bible and apply them to life.</p>
          </div>

          <div className={styles.card}>
            <h3>🙏 Prayer Support</h3>
            <p>Share your prayers and find peace and encouragement.</p>
          </div>

          <div className={styles.card}>
            <h3>🌍 Global Faith</h3>
            <p>Discover how Christianity has spread across the world.</p>
          </div>
        </div>
      </section>

    </div>
  )
}

export default About