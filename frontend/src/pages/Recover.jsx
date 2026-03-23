import React, { useState } from "react";
import styles from "./Auth.module.css";
import { createPasswordResetToken, resetPassword } from "../utils/auth";

export default function Recover() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [phase, setPhase] = useState("request"); // request | reset
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [generatedToken, setGeneratedToken] = useState("");

  const onRequest = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setGeneratedToken("");
    try {
      const res = await createPasswordResetToken({ email });
      if (!res) {
        setSuccess("If an account exists, a reset token would be generated in this local demo.");
        return;
      }
      setGeneratedToken(res.tokenPlaintext);
      setPhase("reset");
    } catch (err) {
      setError(err?.message || "Could not create reset token.");
    }
  };

  const onReset = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await resetPassword({ email, tokenPlaintext: token, newPassword });
      setSuccess("Password updated. You can now log in.");
      setPhase("request");
      setToken("");
      setNewPassword("");
      setGeneratedToken("");
    } catch (err) {
      setError(err?.message || "Reset failed.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Password Recovery</h1>

      {phase === "request" && (
        <form className={styles.form} onSubmit={onRequest}>
          <label className={styles.label}>
            Email
            <input
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          {error && <div className={styles.error}>{error}</div>}
          {success && <div className={styles.success}>{success}</div>}

          <button className={styles.primaryBtn} type="submit">
            Generate reset token
          </button>

          {generatedToken && (
            <div className={styles.notice}>
              Your local demo reset token:
              <div className={styles.tokenBox}>{generatedToken}</div>
              <div className={styles.muted}>Use this token to set a new password.</div>
            </div>
          )}
        </form>
      )}

      {phase === "reset" && (
        <form className={styles.form} onSubmit={onReset}>
          <label className={styles.label}>
            Reset Token
            <input
              value={token}
              type="text"
              onChange={(e) => setToken(e.target.value)}
              required
            />
          </label>

          <label className={styles.label}>
            New Password
            <input
              value={newPassword}
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </label>

          {error && <div className={styles.error}>{error}</div>}
          {success && <div className={styles.success}>{success}</div>}

          <button className={styles.primaryBtn} type="submit">
            Update password
          </button>
          <button
            className={styles.secondaryBtn}
            type="button"
            onClick={() => {
              setPhase("request");
              setToken("");
              setNewPassword("");
              setGeneratedToken("");
            }}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

