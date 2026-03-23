import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, X, Book, Sparkles, ArrowRight } from 'lucide-react';
import styles from './Search.module.css';
import { Link } from 'react-router-dom';
import { TRANSLATION_OPTIONS, fetchBibleVerse } from '../utils/bibleApi';
import { addBookmark } from '../utils/bookmarks';

const _motion = motion;

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [bibleResult, setBibleResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [translation, setTranslation] = useState(TRANSLATION_OPTIONS[0]?.value || 'kjv');
  const [savedState, setSavedState] = useState(false);

  // Debounced API Call to Bible API
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length > 2) {
        setLoading(true);
        try {
          // Supports formats like "John 3:16" or "Genesis 1:1"
          const data = await fetchBibleVerse(query, translation);
          setBibleResult(data?.text ? data : null);
          setSavedState(false);
        } catch {
          setBibleResult(null);
        } finally {
          setLoading(false);
        }
      } else {
        setBibleResult(null);
      }
    }, 500); // Wait 500ms after user stops typing to API call

    return () => clearTimeout(delayDebounceFn);
  }, [query, translation]);

  if (!isOpen) return null;

  return (
    <motion.div className={styles.overlay} onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.div 
        className={styles.modal} 
        onClick={(e) => e.stopPropagation()}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className={styles.searchHeader}>
          <Search className={styles.searchIcon} size={22} />
          <input 
            autoFocus 
            placeholder="Try 'John 3:16' or 'Psalm 23'..." 
            className={styles.input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
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
          {loading && <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className={styles.loader} />}
          <button onClick={onClose} className={styles.closeBtn}><X size={20}/></button>
        </div>

        <div className={styles.resultsArea}>
          {bibleResult ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={styles.bibleCard}>
              <div className={styles.cardHeader}>
                <Book size={18} className="text-yellow-600" />
                <span>{bibleResult.reference}</span>
                <span className={styles.translationTag}>{bibleResult.translation_name}</span>
              </div>
              <p className={styles.verseText}>"{bibleResult.text.trim()}"</p>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={styles.actionBtn}
                onClick={() => {
                  addBookmark({
                    reference: bibleResult.reference,
                    translation: bibleResult.translation_name || translation,
                    text: bibleResult.text,
                  });
                  setSavedState(true);
                }}
              >
                {savedState ? "Bookmarked" : "Bookmark"} <ArrowRight size={14} />
              </motion.button>
            </motion.div>
          ) : query.length > 2 && !loading ? (
            <div className={styles.emptyState}>
              <Sparkles size={24} className="mb-2 opacity-20" />
              <p>No verse found. Try a specific reference.</p>
            </div>
          ) : (
            <div className={styles.hintText}>
              <p className="font-bold uppercase text-[10px] tracking-widest text-gray-400 mb-3">Quick Navigation</p>
              <div className={styles.navGrid}>
                <Link to={"/history"} onClick={onClose}>
                  <button className={styles.navItem}>History</button>
                </Link>
                <Link to={"/prayer"} onClick={onClose}>
                  <button className={styles.navItem}>Prayer Wall</button>
                </Link>
                <Link to={"/glossary"} onClick={onClose}>
                  <button className={styles.navItem}>Glossary</button>
                </Link>
                <Link to={"/bookmarks"} onClick={onClose}>
                  <button className={styles.navItem}>Saved</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SearchModal;