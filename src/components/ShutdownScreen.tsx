import React from 'react';
import styles from './ShutdownScreen.module.css';

const ShutdownScreen: React.FC = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className={styles.shutdownScreen} onClick={handleReload}>
      <div className={styles.message}>
        It is now safe to turn off your computer.
        <br />
        <span style={{ fontSize: '14px', color: '#666', marginTop: '20px', display: 'block' }}>
          (Click anywhere to restart Malina-OS)
        </span>
      </div>
    </div>
  );
};

export default ShutdownScreen;
