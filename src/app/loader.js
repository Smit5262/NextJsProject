import React from 'react';
import styles from './cssFiles/loader.module.css';

const Loader = () => (
  <div className={styles.loader}>
    <div className={styles.spinner}></div>
  </div>
);

export default Loader;
