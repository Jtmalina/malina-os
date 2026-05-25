import React from 'react';
import styles from './StartMenu.module.css';

interface StartMenuItem {
  id: string;
  label: string;
  icon: string;
  onClick?: () => void;
}

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: StartMenuItem[];
}

const StartMenu: React.FC<StartMenuProps> = ({ isOpen, onClose, items }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.startMenu}>
        <div className={styles.sidebar}>
          <div className={styles.sidebarText}>
            Malina<span>-OS</span>
          </div>
        </div>
        <div className={styles.menuItems}>
          {items.map((item) => (
            <div 
              key={item.id} 
              className={styles.menuItem}
              onClick={() => {
                item.onClick?.();
                onClose();
              }}
            >
              <span className={styles.itemIcon}>{item.icon}</span>
              <span className={styles.itemLabel}>{item.label}</span>
            </div>
          ))}
          <div className={styles.divider} />
          <div className={styles.menuItem}>
            <span className={styles.itemIcon}>🚪</span>
            <span className={styles.itemLabel}>Shut Down...</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartMenu;
