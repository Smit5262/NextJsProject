import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <Image
          src="/heroimage.jpg"
          alt="Hero Image"
          width={1920}
          height={600}
          className={styles.heroImage}
        />
        <h1 className={styles.heroTitle}>Welcome to Our Shop</h1>
        <p className={styles.heroSubtitle}>
          Find the best products at unbeatable prices
        </p>
        <button className={styles.ctaButton}>Shop Now</button>
      </section>
      <section className={styles.featured}>
        <h2 className={styles.sectionTitle}>Featured Products</h2>
        <div className={styles.productGrid}>
          {[1, 2, 3, 4, 5, 6].map((product) => (
            <div key={product} className={styles.productCard}>
              <Image
                src={`/${product}.jpg`}
                alt={`Product ${product}`}
                width={300}
                height={300}
                className={styles.productImage}
              />
              <h3 className={styles.productTitle}>Product {product}</h3>
              <p className={styles.productPrice}>$99.99</p>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.categories}>
        <h2 className={styles.sectionTitle}>Categories</h2>
        <div className={styles.categoryGrid}>
          <div className={styles.categoryCard}>
            <Image
              src="/category1.jpg"
              alt="Category 1"
              width={300}
              height={300}
              className={styles.categoryImage}
            />
            <h3 className={styles.categoryTitle}>Mobile Products</h3>
          </div>
          <div className={styles.categoryCard}>
            <Image
              src="/category2.jpg"
              alt="Category 2"
              width={300}
              height={300}
              className={styles.categoryImage}
            />
            <h3 className={styles.categoryTitle}>Beauty Products</h3>
          </div>
        </div>
      </section>
      <section className={styles.testimonials}>
        <h2 className={styles.sectionTitle}>What Our Customers Say</h2>
        <div className={styles.testimonialGrid}>
          <div className={styles.testimonialCard}>
            <p className={styles.testimonialText}>
              Amazing products and top-notch customer service!
            </p>
            <p className={styles.testimonialAuthor}>- John Doe</p>
          </div>
          <div className={styles.testimonialCard}>
            <p className={styles.testimonialText}>
              Highly recommend this shop for quality products.
            </p>
            <p className={styles.testimonialAuthor}>- Jane Smith</p>
          </div>
        </div>
      </section>
    </div>
  );
}