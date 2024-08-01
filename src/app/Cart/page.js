"use client";

import React, { useEffect, useState } from "react";
import styles from "../cssFiles/cart.module.css";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import Link from "next/link";
import Loader from "../loader";
import { useAuth } from "../AuthContext";
import Cookies from "js-cookie";

function Cart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      const userId = Cookies.get("userId");
      axios
        .get(`/api/login?userId=${userId}`)
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching the cart data", error);
          setError("Failed to load cart data.");
          setLoading(false);
        });
    } else {
      setLoading(false);
      setError("User not logged in.");
    }
  }, [isLoggedIn]);

  const calculateTotal = () => {
    return data
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleRemove = (id) => {
    setLoading(true);
    axios
      .delete(`/api/users/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setData(data.filter((item) => item._id !== id));
        }
      })
      .catch((error) => {
        console.error("Error removing the item", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {data.length === 0 ? (
        <h1 className={styles.heading1}>Your cart is empty</h1>
      ) : (
        <div className={styles.container}>
          <h1 className={styles.heading}>Your Shopping Cart</h1>
          <div className={styles.cartItems}>
            {data.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.cartItemImage}
                />
                <div className={styles.cartItemDetails}>
                  <h2 className={styles.cartItemName}>{item.name}</h2>
                  <p className={styles.cartItemPrice}>${item.price}</p>
                  <p className={styles.cartItemQuantity}>
                    Quantity: {item.quantity}
                  </p>
                  <button
                    className={styles.removeButton}
                    onClick={() => handleRemove(item._id)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.cartSummary}>
            <h2>Total: ${calculateTotal()}</h2>
            <Link
              href={`/checkout?total=${calculateTotal()}`} // Pass total as a query parameter
            >
              <button className={styles.checkoutButton}>
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
