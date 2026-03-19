import React from "react";
import styles from "./Bible.module.css";

import { bibleStories } from "../data/bibleStories"
import { useNavigate } from "react-router-dom"

const Bible = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.bibleContainer}>

      <h1 className={styles.title}>Bible Stories</h1>

      <p className={styles.intro}>
        Explore some of the most important and inspiring stories from the Bible
        that have guided millions of people for centuries.
      </p>

      <div className={styles.grid}>

        {bibleStories.map((story) => (

          <div
            className={styles.card}
            key={story.id}
            onClick={() => navigate(`/bible/${story.id}`)}
          >

            <img src={story.image} alt={story.title} />

            <div className={styles.cardContent}>
              <h3>{story.title}</h3>
              <p>{story.content.slice(0, 80)}...</p>
            </div>

          </div>

        ))}

      </div>
      <button
        className={styles.readMoreBtn}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Back to top
      </button>
    </div>
  );
};

export default Bible;