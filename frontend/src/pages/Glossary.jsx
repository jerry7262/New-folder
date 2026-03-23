import React, { useMemo, useState } from "react"
import { motion } from "framer-motion"
import styles from "./Glossary.module.css"
import { glossary } from "../data/glossary"

const _motion = motion;

const Glossary = () => {
  const [query, setQuery] = useState("")
  const [selectedLetter, setSelectedLetter] = useState("")

  const letters = useMemo(() => {
    return Array.from({ length: 26 }, (_, i) =>
      String.fromCharCode("A".charCodeAt(0) + i),
    )
  }, [])

  const normalizedQuery = query.trim().toLowerCase()

  const hasLetter = useMemo(() => {
    const map = new Set(
      glossary.map((t) => t.term?.[0]?.toUpperCase?.()).filter(Boolean),
    )
    return map
  }, [])

  const filtered = useMemo(() => {
    const byLetter = selectedLetter
      ? glossary.filter(
          (t) => t.term?.[0]?.toUpperCase?.() === selectedLetter.toUpperCase(),
        )
      : glossary

    const list = byLetter.filter((t) => {
      if (!normalizedQuery) return true
      return t.term.toLowerCase().includes(normalizedQuery)
    })

    return [...list].sort((a, b) => a.term.localeCompare(b.term))
  }, [normalizedQuery, selectedLetter])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Christian Glossary</h1>
      <p className={styles.subtitle}>An A-Z searchable database of theological terms.</p>

      <div className={styles.searchRow}>
        <input
          className={styles.searchInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search terms (e.g. Grace, Faith)..."
        />
      </div>

      <div className={styles.letterRow}>
        <button
          type="button"
          className={selectedLetter === "" ? styles.letterBtnActive : styles.letterBtn}
          onClick={() => setSelectedLetter("")}
        >
          All
        </button>
        {letters.map((L) => {
          const disabled = !hasLetter.has(L)
          return (
            <button
              key={L}
              type="button"
              className={
                selectedLetter === L ? styles.letterBtnActive : styles.letterBtn
              }
              disabled={disabled}
              onClick={() => setSelectedLetter(L)}
              style={disabled ? { opacity: 0.35, cursor: "not-allowed" } : undefined}
            >
              {L}
            </button>
          )
        })}
      </div>

      <div className={styles.grid}>
        {filtered.length === 0 ? (
          <div className={styles.noResults}>
            No terms found. Try another letter or search.
          </div>
        ) : (
          filtered.map((item) => (
            <motion.div
              key={item.id}
              className={styles.card}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3>{item.term}</h3>
              <p>{item.meaning}</p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}

export default Glossary