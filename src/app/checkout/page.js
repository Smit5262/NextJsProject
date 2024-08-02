"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../cssFiles/checkout.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const [cartData, setCartData] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const userId = Cookies.get("userId");
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      fetchCartData();
    } else {
      setIsLoading(false);
      toast.error("User ID not found. Please log in.");
    }
  }, [userId]);

  const fetchCartData = async () => {
    try {
      const response = await axios.get(`/api/login?userId=${userId}`);
      const data = response.data;
      setCartData(data);
      setTotal(calculateTotal(data));
    } catch (error) {
      console.error("Error fetching the cart data", error);
      toast.error("Failed to load cart data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotal = (data) => {
    return data
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.delete(`/api/cart?userId=${userId}`);
      toast.success("Cart cleared successfully!");
      // console.log("Cart cleared successfully");
      alert("Your order place sucessfully");
      router.push("/Cart");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.info("No items found in the cart");
      } else {
        console.error("Error clearing the cart", error);
        toast.error("Failed to clear the cart. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (cartData.length === 0) {
    return <h1 className={styles.heading1}>Cart is empty</h1>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Checkout</h1>
      <form className={styles.form} onSubmit={placeOrder}>
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
          disabled={isLoading || cartData.length === 0}
        >
          {isLoading ? "Processing..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}
