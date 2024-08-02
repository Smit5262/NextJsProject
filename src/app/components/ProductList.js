import React, { useEffect, useState } from "react";
import styles from "../cssFiles/products.module.css";
import axios from "axios";
import Loader from "../loader";

function ProductList({ category, isLoggedIn, userId }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/products?category=${category}`);
        setData(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  const handleAddToCart = async (product) => {
    if (!isLoggedIn) {
      alert("Please login to add items to cart");
      return;
    }

    if (product.quantity <= 0) {
      alert("Product is out of stock");
      return;
    }

    setIsAdding(product._id);

    try {
      const response = await axios.get(`/api/login?userId=${userId}`);
      const cartItems = response.data;

      const existingCartItem = cartItems.find(
        (item) => item.productId === product._id
      );

      if (existingCartItem) {
        const newQuantity = existingCartItem.quantity + 1;

        const updateCartResponse = await axios.patch(
          `/api/updateCartQuantity`,
          {
            id: existingCartItem._id,
            quantity: newQuantity,
          }
        );

        if (updateCartResponse.status === 200) {
          const updateProductResponse = await axios.patch(
            `/api/products/${product._id}`,
            {
              quantity: product.quantity - 1,
            }
          );

          if (updateProductResponse.status === 200) {
            alert("Product added successfully");
            setData((prevData) =>
              prevData.map((item) =>
                item._id === product._id
                  ? { ...item, quantity: product.quantity - 1 }
                  : item
              )
            );
          } else {
            alert("Failed to add product");
          }
        } else {
          alert("Failed to update cart");
        }
      } else {
        const addToCartResponse = await axios.post("/api/login", {
          userId,
          productId: product._id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
        });

        if (addToCartResponse.data.ok) {
          const updateQuantity = await axios.patch(
            `/api/products/${product._id}`,
            {
              quantity: product.quantity - 1,
            }
          );

          if (updateQuantity.data.ok) {
            alert("Product added to cart successfully");
            setData((prevData) =>
              prevData.map((item) =>
                item._id === product._id
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              )
            );
          } else {
            alert("Failed to update product quantity");
          }
        } else {
          alert("Failed to add product to cart");
        }
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart");
    } finally {
      setIsAdding(null);
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

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
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
              {product.description.slice(0, 40)}...
            </p>
            <p className={styles.productPrice}>
              Price: ${formatPrice(product.price)}
            </p>
            <p className={styles.productQuantity}>
              {product.quantity > 0 ? (
                <>Quantity: {product.quantity}</>
              ) : (
                <>Product is out of stock</>
              )}
            </p>
            <button
              className={styles.buyButton}
              onClick={() => handleAddToCart(product)}
              disabled={isAdding === product._id}
            >
              {isAdding === product._id ? "Adding..." : "Add To Cart"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
