"use client";

import React, { useState } from "react";
import styles from "../cssFiles/login.module.css";
import Link from "next/link";
import { FaEnvelope, FaLock, FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "../AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `/api/login?email=${email}&password=${password}`
      );
      if (response.data.ok) {
        login(response.data.userId);
        router.push("/");
      } else {
        setError(response.data.error || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError("Failed to login. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.logoContainer}>
          <FaShoppingCart className={styles.logo} />
          <h1>ShopEase</h1>
        </div>
        <h2>Welcome Back!</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <FaEnvelope className={styles.inputIcon} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <FaLock className={styles.inputIcon} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Log In
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        <p className={styles.switchPrompt}>
          Do not have an account? <Link href="/Signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
