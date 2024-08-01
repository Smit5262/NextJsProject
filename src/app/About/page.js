import React from 'react';
import styles from '../cssFiles/about.module.css';

function About() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.heading}>About ShopMania</h1>
        <p className={styles.text}>
          Welcome to ShopMania, your number one source for all things shopping. We are dedicated to giving you the very best of products, with a focus on dependability, customer service, and uniqueness.
        </p>
        <p className={styles.text}>
          Founded in 2024, ShopMania has come a long way from its beginnings. When we first started out, our passion for providing the best products drove us to do tons of research, so that ShopMania can offer you top-quality items. We now serve customers all over the world and are thrilled that we are able to turn our passion into our website.
        </p>
        <p className={styles.text}>
          We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please do not hesitate to contact us.
        </p>
        <h2 className={styles.subheading}>Our Mission</h2>
        <p className={styles.text}>
          Our mission is to provide the best shopping experience possible by offering quality products and excellent customer service.
        </p>
        <h2 className={styles.subheading}>Our Team</h2>
        <p className={styles.text}>
          Our dedicated team works around the clock to bring you the best shopping experience.
        </p>
      </div>
    </div>
  );
}

export default About;
