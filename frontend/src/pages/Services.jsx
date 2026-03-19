import React from "react"
import styles from "./Services.module.css"

import historyImg from "../assets/historyOfChristians.jpg"
import bibleImg from "../assets/serviceBg.png"
import prayerImg from "../assets/global.webp"
import verseImg from "../assets/spreadRoman.avif"
import { useNavigate } from "react-router-dom"

const Services = () => {
    const navigate = useNavigate()
    const services = [
        {
            title: "Christian History",
            image: historyImg,
            description: "Explore the journey of Christianity from its origin to modern times.",
            story: "Christianity began over 2000 years ago with Jesus Christ. From a small group of followers, it spread across empires and continents, shaping cultures and civilizations."
        },
        {
            title: "Bible Stories",
            image: bibleImg,
            description: "Dive into powerful and meaningful Bible stories.",
            story: "From the story of creation to the life of Jesus, Bible stories teach lessons about faith, love, sacrifice, and hope."
        },
        {
            title: "Prayer Requests",
            image: prayerImg,
            description: "Share your prayers and connect spiritually.",
            story: "Prayer brings peace and strength. Share your thoughts and connect with God during both joyful and difficult times."
        },
        {
            title: "Daily Verse",
            image: verseImg,
            description: "Read a new inspiring Bible verse every day.",
            story: "Daily verses provide guidance, encouragement, and wisdom to help you stay connected with faith in everyday life."
        }
    ]

    return (
        <div className={styles.container}>

            <h1 className={styles.title}>Our Services</h1>

            {services.map((service, index) => (
                <div key={index} className={styles.card} onClick={() => {
                    if (service.title === "Christian History") navigate("/history")
                    if (service.title === "Bible Stories") navigate("/bible")
                    if (service.title === "Prayer Requests") navigate("/prayer")
                    if (service.title === "Daily Verse") navigate("/verse")
                }}>

                    <div className={styles.image}>
                        <img src={service.image} alt={service.title} />
                    </div>

                    <div className={styles.content}>
                        <h2>{service.title}</h2>
                        <p className={styles.desc}>{service.description}</p>
                        <p className={styles.story}>{service.story}</p>
                    </div>

                </div>
            ))}

        </div>
    )
}

export default Services