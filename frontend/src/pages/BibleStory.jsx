import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { bibleStories } from "../data/bibleStories"
import styles from "./BibleStory.module.css"

const BibleStory = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const story = bibleStories.find(s => s.id === id)

  if (!story) return <h2>Story not found</h2>

  return (
    <div className={styles.container}>

      <img src={story.image} alt={story.title} />

      <h1>{story.title}</h1>

      <p>{story.content}</p>

      <button onClick={() => navigate("/bible")}>
        ← Back to Stories
      </button>

    </div>
  )
}

export default BibleStory