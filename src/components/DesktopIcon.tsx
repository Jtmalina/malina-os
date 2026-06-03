import React from 'react';
import styles from './DesktopIcon.module.css';

interface DesktopIconProps {
  id: string;
  label: string;
  onDoubleClick: (id: string) => void;
  icon?: string;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ id, label, onDoubleClick, icon }) => {
  return (
    <div 
      className={styles.container} 
      onDoubleClick={() => onDoubleClick(id)}
    >
      <div className={styles.iconPlaceholder}>
        {icon || '📁'}
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  );
};

export default DesktopIcon;
