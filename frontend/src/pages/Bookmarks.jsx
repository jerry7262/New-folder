import React, { useMemo, useState } from "react";
import styles from "./Bookmarks.module.css";
import { motion } from "framer-motion";
import { STORAGE_KEYS, getJSON, setJSON } from "../utils/storage";

const _motion = motion;

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState(() =>
    getJSON(STORAGE_KEYS.bookmarks, []).filter(Boolean),
  );

  const sorted = useMemo(() => {
    return [...bookmarks].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  }, [bookmarks]);

  const remove = (id) => {
    const next = bookmarks.filter((b) => b.id !== id);
    setBookmarks(next);
    setJSON(STORAGE_KEYS.bookmarks, next);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Saved Verses</h1>
      <p className={styles.subtitle}>Your personal bookmarks are stored in this browser.</p>

      {sorted.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyTitle}>No saved verses yet</div>
          <div className={styles.emptyBody}>Use the search modal or the Bible reader to bookmark verses.</div>
        </div>
      ) : (
        <div className={styles.list}>
          {sorted.map((b) => (
            <motion.div
              key={b.id}
              className={styles.card}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.reference}>{b.reference}</div>
                <div className={styles.translation}>{b.translation || "KJV"}</div>
              </div>

              <div className={styles.text}>"{(b.text || "").trim()}"</div>

              <div className={styles.footer}>
                <button className={styles.removeBtn} onClick={() => remove(b.id)}>
                  Remove
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

