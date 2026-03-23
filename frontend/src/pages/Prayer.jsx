/* eslint-disable react-hooks/purity */
import React, { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { useAuth } from "../contexts/AuthContext"
import { getJSON, setJSON, STORAGE_KEYS } from "../utils/storage"
import styles from "./Prayer.module.css"

const _motion = motion;

const Prayer = () => {
  const { user, identityId } = useAuth()

  const [name, setName] = useState(user?.displayName || "")
  const [message, setMessage] = useState("")
  const [prayers, setPrayers] = useState(() => getJSON(STORAGE_KEYS.prayers, []))

  const channel = useMemo(() => {
    if (typeof BroadcastChannel === "undefined") return null
    return new BroadcastChannel("fc_prayers")
  }, [])

  useEffect(() => {
    // Cross-tab sync (best-effort).
    if (!channel) return
    const onMessage = () => {
      setPrayers(getJSON(STORAGE_KEYS.prayers, []))
    }
    channel.addEventListener("message", onMessage)
    return () => channel.removeEventListener("message", onMessage)
  }, [channel])

  useEffect(() => {
    // Storage event sync (fallback).
    const onStorage = (e) => {
      if (e.key !== STORAGE_KEYS.prayers) return
      setPrayers(getJSON(STORAGE_KEYS.prayers, []))
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const persist = (next) => {
    setJSON(STORAGE_KEYS.prayers, next)
    setPrayers(next)
    channel?.postMessage({ type: "updated", at: Date.now() })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmedName = (name || "").trim() || "Anonymous"
    const trimmedMessage = (message || "").trim()
    if (!trimmedMessage) return

    const newPrayer = {
      id:
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `p_${Math.random().toString(16).slice(2)}_${Date.now()}`,
      name: trimmedName,
      message: trimmedMessage,
      createdAt: Date.now(),
      amenBy: [],
    }

    persist([newPrayer, ...(Array.isArray(prayers) ? prayers : [])])
    setName(user?.displayName || "")
    setMessage("")
  }

  const toggleAmen = (prayerId) => {
    const next = (Array.isArray(prayers) ? prayers : []).map((p) => {
      if (p.id !== prayerId) return p
      const amenBy = Array.isArray(p.amenBy) ? [...p.amenBy] : []
      const hasAmened = amenBy.includes(identityId)
      const updated = hasAmened
        ? amenBy.filter((id) => id !== identityId)
        : [...amenBy, identityId]
      return { ...p, amenBy: updated }
    })
    persist(next)
  }

  return (
    <div className={styles.container}>

      <h1 className={styles.title}>Prayer Requests</h1>

      <p className={styles.subtitle}>
        Share your prayer with us. You are not alone.
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <textarea
          placeholder="Write your prayer..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <motion.button
          type="submit"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Submit Prayer
        </motion.button>

      </form>
      <div className={styles.extra}>
        <h2>Why Prayer Matters?</h2>
        <p>
          Prayer is a powerful way to connect with God. It brings peace,
          guidance, and strength during difficult times. Through prayer,
          we open our hearts and seek divine help.
        </p>
      </div>
      <div className={styles.prayerList}>
        <h2>Community Prayers</h2>

        {prayers.map((p) => {
          const amenBy = Array.isArray(p.amenBy) ? p.amenBy : []
          const hasAmened = amenBy.includes(identityId)
          return (
            <motion.div
              key={p.id}
              className={styles.prayerCard}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className={styles.prayerTop}>
                <h4 className={styles.prayerName}>{p.name}</h4>
                <button
                  type="button"
                  className={hasAmened ? styles.amenBtnActive : styles.amenBtn}
                  onClick={() => toggleAmen(p.id)}
                >
                  Amen {amenBy.length > 0 ? `(${amenBy.length})` : ""}
                </button>
              </div>
              <p className={styles.prayerMessage}>{p.message}</p>
            </motion.div>
          )
        })}
      </div>

    </div>
  )
}

export default Prayer