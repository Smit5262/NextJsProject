"use client";

import React, { useEffect, useState } from "react";
import styles from "../cssFiles/products.module.css";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Loader from "../loader";
import { useAuth } from "../AuthContext";
import Cookies from "js-cookie";

function ProductPage({ initialCategory }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || initialCategory || "Beauty";
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/products?category=${category}`);
        setData(response.data);
        setError(null);

        if (isLoggedIn) {
          const storedUserId = Cookies.get("userId");
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, isLoggedIn]);

  const handleAddToCart = async (product) => {
    if (!isLoggedIn) {
      alert("Please login to add items to cart");
      return;
    }
    try {
      const response = await axios.post("/api/login", {
        userId,
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      });
      if (response.data.ok) {
        alert("Product added to cart successfully");
      } else {
        alert("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart");
    }
  };
  const formatPrice = (price) => {
    if (typeof price === "number") {
      return price.toFixed(2);
    } else if (typeof price === "string") {
      const numPrice = parseFloat(price);
      return isNaN(numPrice) ? price : numPrice.toFixed(2);
    }
    return price;
  };

  if (loading) {
    return <Loader />;
  }
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>{category} Products</h1>
      <div className={styles.productsGrid}>
        {data.map((product) => (
          <div key={product._id} className={styles.product}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.productImage}
            />
            <div className={styles.productDetails}>
              <h2 className={styles.productName}>{product.name}</h2>
              <p className={styles.productDescription}>
                {product.description.slice(0, 40)}
              </p>
              <p className={styles.productPrice}>
                ${formatPrice(product.price)}
              </p>
              <button
                className={styles.buyButton}
                onClick={() => handleAddToCart(product)}
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
