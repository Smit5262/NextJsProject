import React from 'react';
import styles from '../cssFiles/contact.module.css';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

function Contact() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Contact Us</h1>
        <p className={styles.text}>
          We would love to hear from you! Please reach out to us using any of the methods below.
        </p>
        <div className={styles.contactInfo}>
          <div className={styles.infoItem}>
            <FaEnvelope className={styles.icon} />
            <p>contact@shopmania.com</p>
          </div>
          <div className={styles.infoItem}>
            <FaPhone className={styles.icon} />
            <p>+1 234 567 890</p>
          </div>
          <div className={styles.infoItem}>
            <FaMapMarkerAlt className={styles.icon} />
            <p>123 Shopmaina St, E-commerce City, EC 12345</p>
          </div>
        </div>
        <form className={styles.form}>
          <h2 className={styles.subheading}>Send us a Message</h2>
          <input type="text" placeholder="Your Name" className={styles.input} required />
          <input type="email" placeholder="Your Email" className={styles.input} required />
          <textarea placeholder="Your Message" className={styles.textarea} required></textarea>
          <button type="submit" className={styles.submitButton}>Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;