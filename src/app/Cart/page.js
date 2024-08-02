"use client";

import React, { useEffect, useState } from "react";
import styles from "../cssFiles/cart.module.css";
import { FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
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
    }
  }, [isLoggedIn]);

  const calculateTotal = () => {
    return data
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleRemove = async (id) => {
    setLoading(true);

    try {
      const itemToRemove = data.find((item) => item._id === id);

      const deleteResponse = await axios.delete(`/api/users/${id}`);
      if (deleteResponse.status !== 200) {
        throw new Error("Failed to delete product from cart");
      }

      const productResponse = await axios.get(
        `/api/products/${itemToRemove.productId}`
      );
      if (productResponse.status !== 200) {
        throw new Error("Failed to fetch product data");
      }

      const product = productResponse.data;

      const updateResponse = await axios.patch(
        `/api/products/${itemToRemove.productId}`,
        {
          quantity: product.quantity + itemToRemove.quantity,
        }
      );
      if (updateResponse.status !== 200) {
        throw new Error("Failed to update product quantity");
      }

      setData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting product", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (id, increment) => {
    setLoading(true);

    try {
      const itemToUpdate = data.find((item) => item._id === id);

      const newQuantity = itemToUpdate.quantity + increment;
      if (newQuantity <= 0) return;

      const productResponse = await axios.get(
        `/api/products/${itemToUpdate.productId}`
      );
      if (productResponse.status !== 200) {
        throw new Error("Failed to fetch product data");
      }

      const product = productResponse.data;

      if (product.quantity < increment) {
        throw new Error("Not enough product in stock");
      }

      const updateCartResponse = await axios.patch(`/api/updateCartQuantity`, {
        id: id,
        quantity: newQuantity,
      });
      if (updateCartResponse.status !== 200) {
        throw new Error("Failed to update cart quantity");
      }

      const updateProductResponse = await axios.patch(
        `/api/products/${itemToUpdate.productId}`,
        {
          quantity: product.quantity - increment,
        }
      );
      if (updateProductResponse.status !== 200) {
        throw new Error("Failed to update product quantity");
      }

      setData((prevData) =>
        prevData.map((item) =>
          item._id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating product quantity", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {error ? (
        <h1 className={styles.heading1}>{error}</h1>
      ) : data.length === 0 ? (
        <h1 className={styles.heading1}>Your cart is empty</h1>
      ) : (
        <div className={styles.container}>
          <h1 className={styles.heading}>Your Shopping Cart</h1>
          <div className={styles.cartItems}>
            {data.map((item) => (
              <div key={item._id} className={styles.cartItem}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.cartItemImage}
                />
                <div className={styles.cartItemDetails}>
                  <h2 className={styles.cartItemName}>{item.name}</h2>
                  <p className={styles.cartItemPrice}>${item.price}</p>
                  <div className={styles.quantityControl}>
                    <button
                      className={styles.quantityButton}
                      onClick={() => handleUpdateQuantity(item._id, -1)}
                    >
                      <FaMinus />
                    </button>
                    <p className={styles.cartItemQuantity}>
                      Quantity: {item.quantity}
                    </p>
                    <button
                      className={styles.quantityButton}
                      onClick={() => handleUpdateQuantity(item._id, 1)}
                    >
                      <FaPlus />
                    </button>
                  </div>
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
            <Link href={`/checkout?total=${calculateTotal()}`}>
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
