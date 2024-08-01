"use client";
import React, { useState } from "react";
import styles from "../cssFiles/signup.module.css";
import Link from "next/link";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaHome,
  FaShoppingCart,
} from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [role, setRole] = useState("customer");
  const { login } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/users", { ...user, role })
      .then((response) => {
        setUser({ name: "", email: "", password: "", phone: "", address: "" });
        setRole("customer");
        login(response.data.userId);
        router.push("/Login");
      })
      .catch((error) => {
        console.error("There was an error signing up the user!", error);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.logoContainer}>
          <FaShoppingCart className={styles.logo} />
          <h1>ShopEase</h1>
        </div>
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <FaUser className={styles.inputIcon} />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <FaEnvelope className={styles.inputIcon} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <FaLock className={styles.inputIcon} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <FaPhone className={styles.inputIcon} />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={user.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <FaHome className={styles.inputIcon} />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={user.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
            </select>
          </div>
          <button type="submit" className={styles.submitButton}>
            Sign Up
          </button>
        </form>
        <p className={styles.switchPrompt}>
          Already have an account? <Link href="/Login">Log In</Link>
        </p>
      </div>
      {/* <div className={styles.imageContainer}>
        <img src="/shopping.jpg" alt="Shopping" className={styles.image} />
      </div> */}
    </div>
  );
}
