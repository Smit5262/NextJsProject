import React from "react";
import Image from "next/image";
import styles from "../cssFiles/product.module.css";

const product = {
  id: 1,
  name: "Luxury Watch",
  description: "This is a detailed description of a luxury watch.",
  price: "$499.99",
  colors: ["Black", "Silver", "Gold"],
  sizes: ["S", "M", "L"],
  imageUrl: "/1.jpg",
};

export default function ProductDetail() {
  return (
    <div className={styles.container}>
      <div className={styles.product}>
        <div className={styles.imageWrapper}>
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={500}
            height={500}
            className={styles.productImage}
          />
        </div>
        <div className={styles.details}>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.productDescription}>{product.description}</p>
          <p className={styles.productPrice}>{product.price}</p>
          <div className={styles.productOptions}>
            <div className={styles.colors}>
              <h3>Colors</h3>
              <ul>
                {product.colors.map((color) => (
                  <li key={color} className={styles.color}>
                    {color}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.sizes}>
              <h3>Sizes</h3>
              <ul>
                {product.sizes.map((size) => (
                  <li key={size} className={styles.size}>
                    {size}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button className={styles.addToCartButton}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
