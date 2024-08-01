// components/Footer.js
import React from "react";
import styles from "./cssFiles/footer.module.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaCreditCard, FaPaypal, FaApplePay, FaGooglePay } from 'react-icons/fa';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerColumn}>
          <h3 className={styles.footerHeading}>Shop</h3>
          <ul className={styles.linkList}>
            <li><a href="/products" className={styles.footerLink}>All Products</a></li>
            <li><a href="/new-arrivals" className={styles.footerLink}>New Arrivals</a></li>
            <li><a href="/best-sellers" className={styles.footerLink}>Best Sellers</a></li>
            <li><a href="/sale" className={styles.footerLink}>Sale</a></li>
          </ul>
        </div>
        <div className={styles.footerColumn}>
          <h3 className={styles.footerHeading}>Customer Service</h3>
          <ul className={styles.linkList}>
            <li><a href="/contact" className={styles.footerLink}>Contact Us</a></li>
            <li><a href="/faq" className={styles.footerLink}>FAQ</a></li>
            <li><a href="/shipping" className={styles.footerLink}>Shipping & Returns</a></li>
            <li><a href="/size-guide" className={styles.footerLink}>Size Guide</a></li>
          </ul>
        </div>
        <div className={styles.footerColumn}>
          <h3 className={styles.footerHeading}>About Us</h3>
          <ul className={styles.linkList}>
            <li><a href="/about" className={styles.footerLink}>Our Story</a></li>
            <li><a href="/blog" className={styles.footerLink}>Blog</a></li>
            <li><a href="/sustainability" className={styles.footerLink}>Sustainability</a></li>
            <li><a href="/careers" className={styles.footerLink}>Careers</a></li>
          </ul>
        </div>
        <div className={styles.footerColumn}>
          <h3 className={styles.footerHeading}>Stay Connected</h3>
          <p className={styles.newsletterText}>Subscribe to our newsletter for exclusive offers and updates</p>
          <form className={styles.newsletterForm}>
            <input type="email" placeholder="Enter your email" className={styles.newsletterInput} />
            <button type="submit" className={styles.newsletterButton}>Subscribe</button>
          </form>
          <div className={styles.socialIcons}>
            <a href="https://facebook.com" className={styles.socialIcon} aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" className={styles.socialIcon} aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" className={styles.socialIcon} aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" className={styles.socialIcon} aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="https://youtube.com" className={styles.socialIcon} aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.paymentMethods}>
          <FaCreditCard className={styles.paymentIcon} />
          <FaPaypal className={styles.paymentIcon} />
          <FaApplePay className={styles.paymentIcon} />
          <FaGooglePay className={styles.paymentIcon} />
        </div>
        <p className={styles.footerText}>
          © 2024 Your Shop. All rights reserved. | <a href="/privacy" className={styles.footerLink}>Privacy Policy</a> | <a href="/terms" className={styles.footerLink}>Terms of Service</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;