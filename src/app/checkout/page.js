"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../cssFiles/checkout.module.css";
import axios from "axios";
import Cookies from "js-cookie";

export default function Checkout() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [cartData, setCartData] = useState([]);
  const [total, setTotal] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const userId = Cookies.get("userId");
    if (userId) {
      axios
        .get(`/api/login?userId=${userId}`)
        .then((response) => {
          const data = response.data;
          setCartData(data);
          setTotal(calculateTotal(data));
        })
        .catch((error) => {
          console.error("Error fetching the cart data", error);
        });
    }
  }, []);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const calculateTotal = (data) => {
    return data
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const {
      name,
      email,
      address,
      city,
      postalCode,
      country,
      cardNumber,
      expiryDate,
      cvv,
    } = formData;
    setIsFormValid(
      name &&
        email &&
        address &&
        city &&
        postalCode &&
        country &&
        cardNumber &&
        expiryDate &&
        cvv
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log("Form Data:", formData);
      console.log("Cart Data:", cartData);
      console.log("Total:", total);
      toast.success("Order placed successfully!");

      setFormData({
        name: "",
        email: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
      });
      setCartData([]);
      setTotal(0);
    } else {
      toast.error("Please fill out all fields.");
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      <h1 className={styles.title}>Checkout</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Shipping Information</h2>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={styles.input}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.input}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="address">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className={styles.input}
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="city">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className={styles.input}
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="postalCode">
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              className={styles.input}
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="country">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              className={styles.input}
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Payment Details</h2>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="cardNumber">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              className={styles.input}
              value={formData.cardNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="expiryDate">
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              className={styles.input}
              value={formData.expiryDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="cvv">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              className={styles.input}
              value={formData.cvv}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Order Summary</h2>
          <div className={styles.summary}>
            <div className={styles.summaryItem}>
              <span>Subtotal</span>
              <span>${total}</span>
            </div>
            <div className={styles.summaryItem}>
              <span>Shipping</span>
              <span>$10.00</span>
            </div>
            <div className={styles.summaryItem}>
              <span>Total</span>
              <span>${(parseFloat(total) + 10.0).toFixed(2)}</span>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={!isFormValid}
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
