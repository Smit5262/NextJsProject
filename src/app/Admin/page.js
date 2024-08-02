"use client";
import React, { useState } from "react";
import styles from "../cssFiles/admin.module.css";
import axios from "axios";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([
    "Beauty",
    "Health",
    "Books",
    "Mobile",
    "T-shirts",
    "Toys",
  ]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    image: "",
    category: "",
  });

  const handleInputChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/products", newProduct)
      .then((response) => {
        setProducts([...products, response.data]);
        setNewProduct({
          name: "",
          description: "",
          price: "",
          quantity: "",
          image: "",
          category: "",
        });
      })
      .catch((error) => {
        console.error("There was an error adding the product!", error);
      });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Admin Dashboard</h1>

      <div className={styles.dashboard}>
        <div className={styles.addProduct}>
          <h2 className={styles.sectionTitle}>Add New Product</h2>
          <form onSubmit={handleAddProduct} className={styles.productForm}>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={handleInputChange}
              required
              className={styles.input}
            />
            <textarea
              name="description"
              placeholder="Product Description"
              value={newProduct.description}
              onChange={handleInputChange}
              required
              className={styles.textarea}
            />
            <input
              type="number"
              name="price"
              placeholder="Product Price"
              value={newProduct.price}
              onChange={handleInputChange}
              required
              className={styles.input}
            />
            <input
              type="number"
              name="quantity"
              placeholder="Product Quantity"
              value={newProduct.quantity}
              onChange={handleInputChange}
              required
              className={styles.input}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className={styles.fileInput}
            />
            <select
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              required
              className={styles.fileInput}
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button type="submit" className={styles.submitButton}>
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
