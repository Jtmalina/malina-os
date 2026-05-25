import React from 'react';
import styles from './SystemLogo.module.css';

interface SystemLogoProps {
  size?: 'small' | 'large';
}

const SystemLogo: React.FC<SystemLogoProps> = ({ size = 'small' }) => {
  return (
    <div className={`${styles.logo} ${styles[size]}`}>
      <div className={styles.diamond}>
        <div className={`${styles.quadrant} ${styles.red}`}></div>
        <div className={`${styles.quadrant} ${styles.green}`}></div>
        <div className={`${styles.quadrant} ${styles.blue}`}></div>
        <div className={`${styles.quadrant} ${styles.yellow}`}></div>
      </div>
    </div>
  );
};

export default SystemLogo;
