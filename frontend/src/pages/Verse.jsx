import React, { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import styles from "./Verse.module.css"
import { TRANSLATION_OPTIONS, fetchBibleVerse } from "../utils/bibleApi"
import { dailyDevotionals } from "../data/dailyDevotionals"
import { addBookmark } from "../utils/bookmarks"

const _motion = motion;

const MS_PER_DAY = 1000 * 60 * 60 * 24

function getDayIndex() {
  return Math.floor(Date.now() / MS_PER_DAY)
}

export default function Verse() {
  const [translation, setTranslation] = useState("kjv")
  const [loading, setLoading] = useState(false)
  const [verseText, setVerseText] = useState("")
  const [error, setError] = useState("")
  const [saved, setSaved] = useState(false)

  const devotional = useMemo(() => {
    const idx = getDayIndex() % dailyDevotionals.length
    return dailyDevotionals[idx]
  }, [])

  useEffect(() => {
    let mounted = true
    const run = async () => {
      setLoading(true)
      setError("")
      setSaved(false)
      try {
        const data = await fetchBibleVerse(devotional.reference, translation)
        if (!mounted) return
        setVerseText(data.text || "")
      } catch (err) {
        if (!mounted) return
        setVerseText("")
        setError(err?.message || "Could not fetch daily verse.")
      } finally {
        if (mounted) setLoading(false)
      }
    }
    run()
    return () => {
      mounted = false
    }
  }, [devotional.reference, translation])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Daily Devotional</h1>

      <div className={styles.topRow}>
        <div className={styles.dailyCard}>
          <div className={styles.dailyHeader}>
            <div className={styles.dailyReference}>{devotional.reference}</div>
            <select
              className={styles.translationSelect}
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
              aria-label="Bible translation"
            >
              {TRANSLATION_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className={styles.loading}>Loading today’s verse...</div>
          ) : error ? (
            <div className={styles.error}>{error}</div>
          ) : (
            <motion.p
              className={styles.verse}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              “{(verseText || "").trim()}”
            </motion.p>
          )}

          <div className={styles.actions}>
            <motion.button
              className={styles.bookmarkBtn}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              disabled={!verseText || loading}
              onClick={() => {
                const res = addBookmark({
                  reference: devotional.reference,
                  translation,
                  text: verseText,
                })
                setSaved(!!res?.added)
              }}
            >
              {saved ? "Bookmarked" : "Bookmark"}
            </motion.button>
          </div>
        </div>
      </div>

      <div className={styles.extra}>
        <h2>Deep Dive</h2>
        <p className={styles.reflectionTitle}>{devotional.title}</p>
        <p className={styles.reflectionBody}>{devotional.reflection}</p>
      </div>
    </div>
  )
}