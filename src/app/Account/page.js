"use client";
import React, { useEffect, useState } from "react";
import styles from "../cssFiles/account.module.css";
import axios from "axios";
import { motion } from "framer-motion";
import { useAuth } from '../AuthContext';
import Cookies from "js-cookie";


function Account() {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  const fetchUserData = async () => {
    const userId = Cookies.get("userId");
    if (!userId) {
      return;
    }
    try {
      const response = await axios.get(`/api/users?userId=${userId}`);
      setUserData(response.data);
      setEditedData(response.data);
    } catch (error) {
      console.error(
        "Error fetching user data:",
        error.response ? error.response.data : error.message
      );
    }
  };


  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    try {
      await axios.put(`/api/users/${userData._id}`, editedData);
      setUserData(editedData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleChangePassword = async () => {
    alert("Change password functionality to be implemented");
  };

  const handleManageAddresses = async () => {
    alert("Manage addresses functionality to be implemented");
  };

  const handlePaymentMethods = async () => {
    alert("Payment methods functionality to be implemented");
  };

  if (!userData) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={styles.accountContainer}
    >
      <h1 className={styles.title}>My Account</h1>
      <div className={styles.accountInfo}>
        <motion.div whileHover={{ scale: 1.02 }} className={styles.infoSection}>
          <h2>Personal Information</h2>
          {isEditing ? (
            <>
              <input
                name="name"
                value={editedData.name}
                onChange={handleChange}
                className={styles.input}
              />
              <input
                name="email"
                value={editedData.email}
                onChange={handleChange}
                className={styles.input}
              />
              <input
                name="phone"
                value={editedData.phone}
                onChange={handleChange}
                className={styles.input}
              />
              <input
                name="address"
                value={editedData.address}
                onChange={handleChange}
                className={styles.input}
              />
              <button onClick={handleSave} className={styles.saveButton}>
                Save
              </button>
            </>
          ) : (
            <>
              <p>
                <strong>Name:</strong> {userData.name}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <p>
                <strong>Phone:</strong> {userData.phone}
              </p>
              <p>
                <strong>Address:</strong> {userData.address}
              </p>
              <button onClick={handleEdit} className={styles.editButton}>
                Edit Information
              </button>
            </>
          )}
        </motion.div>
      </div>
      <div className={styles.accountActions}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={styles.actionButton}
          onClick={handleChangePassword}
        >
          Change Password
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={styles.actionButton}
          onClick={handleManageAddresses}
        >
          Manage Addresses
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={styles.actionButton}
          onClick={handlePaymentMethods}
        >
          Payment Methods
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Account;