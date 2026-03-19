import React from 'react'
import styles from "./VerseCard.module.css"
const VerseCard = () => {
    const verse = "For God so loved the world that he gaves his one and only son."
    const reference = "Marco 3:16"
    return (
        <section className={styles.verseSection}>
            <h2 className={styles.title}>Daily Bible Verse</h2>
            <div className={styles.card}>
                <p className={styles.verse}>
                    {verse}
                </p>
                <span className={styles.reference}>
                    {reference}
                </span>
            </div>
        </section>
    )
}

export default VerseCard
