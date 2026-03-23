import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import styles from "./BibleReader.module.css";
import { TRANSLATION_OPTIONS, fetchBibleVerse } from "../utils/bibleApi";
import { addBookmark } from "../utils/bookmarks";

const _motion = motion;

const QUICK_REFERENCES = ["John 3:16", "Psalm 23", "Romans 8:38-39"];

export default function Bible() {
  const [reference, setReference] = useState("John 3:16");
  const [translation, setTranslation] = useState("kjv");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [saved, setSaved] = useState(false);

  const canSearch = useMemo(() => reference.trim().length > 0, [reference]);

  const search = async () => {
    setError("");
    setSaved(false);
    setLoading(true);
    try {
      const data = await fetchBibleVerse(reference, translation);
      setResult(data);
    } catch (err) {
      setResult(null);
      setError(err?.message || "Could not fetch verse.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Full Bible Reader</h1>
      <p className={styles.subtitle}>Search verses by reference and choose a translation.</p>

      <div className={styles.form}>
        <input
          className={styles.input}
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          placeholder="e.g. John 3:16"
        />

        <select
          className={styles.select}
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

        <motion.button
          className={styles.btn}
          onClick={search}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          disabled={!canSearch || loading}
        >
          {loading ? "Searching..." : "Search"}
        </motion.button>
      </div>

      <div className={styles.examples} aria-label="Quick references">
        {QUICK_REFERENCES.map((r) => (
          <button
            key={r}
            className={styles.chip}
            type="button"
            onClick={() => {
              setReference(r);
              setSaved(false);
            }}
          >
            {r}
          </button>
        ))}
      </div>

      {loading && <div className={styles.loading}>Looking up verse...</div>}
      {error && <div className={styles.error}>{error}</div>}

      {result && (
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className={styles.cardHeader}>
            <div className={styles.reference}>{result.reference}</div>
            <div className={styles.translationTag}>{result.translation_name}</div>
          </div>

          <div className={styles.verseText}>"{(result.text || "").trim()}"</div>

          <div className={styles.actions}>
            <motion.button
              className={styles.bookmarkBtn}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const res = addBookmark({
                  reference: result.reference,
                  translation: result.translation_name || translation,
                  text: result.text,
                });
                setSaved(!!res?.added);
              }}
            >
              {saved ? "Bookmarked" : "Bookmark"}
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}