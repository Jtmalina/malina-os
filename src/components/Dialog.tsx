import React from 'react';
import styles from './Dialog.module.css';

interface DialogProps {
  title: string;
  message: string;
  onOk: () => void;
  icon?: string;
}

const Dialog: React.FC<DialogProps> = ({ title, message, onOk, icon = '⚠️' }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <div className={styles.titleBar}>
          <div className={styles.titleText}>{title}</div>
          <button className={styles.closeBtn} onClick={onOk}>X</button>
        </div>
        <div className={styles.content}>
          <div className={styles.body}>
            <span className={styles.icon}>{icon}</span>
            <p className={styles.message}>{message}</p>
          </div>
          <div className={styles.actions}>
            <button className={styles.okBtn} onClick={onOk}>OK</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
