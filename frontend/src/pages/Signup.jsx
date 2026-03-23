import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Auth.module.css";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup(displayName, email, password);
      navigate("/bookmarks");
    } catch (err) {
      setError(err?.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create Account</h1>

      <form className={styles.form} onSubmit={onSubmit}>
        <label className={styles.label}>
          Name (optional)
          <input
            value={displayName}
            type="text"
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>

        <label className={styles.label}>
          Email
          <input
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className={styles.label}>
          Password
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {error && <div className={styles.error}>{error}</div>}

        <button className={styles.primaryBtn} disabled={loading} type="submit">
          {loading ? "Creating..." : "Sign up"}
        </button>
      </form>

      <div className={styles.links}>
        <Link to="/login">I already have an account</Link>
      </div>
    </div>
  );
}

