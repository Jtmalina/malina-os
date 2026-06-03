import React from 'react';
import styles from './DesktopIcon.module.css';

interface DesktopIconProps {
  id: string;
  label: string;
  onDoubleClick: (id: string) => void;
  onSelect?: (id: string, multi: boolean) => void;
  isSelected?: boolean;
  icon?: string;
  position?: { x: number; y: number };
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ 
  id, 
  label, 
  onDoubleClick, 
  onSelect,
  isSelected,
  icon,
  position 
}) => {
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only handle selection if it's a left click
    if (e.button !== 0) return;
    e.stopPropagation();
    onSelect?.(id, e.ctrlKey || e.metaKey || e.shiftKey);
  };

  return (
    <div 
      className={`${styles.container} ${isSelected ? styles.selected : ''}`} 
      onDoubleClick={() => onDoubleClick(id)}
      onMouseDown={handleMouseDown}
      style={position ? { position: 'absolute', left: position.x, top: position.y, margin: 0 } : {}}
    >
      <div className={styles.iconPlaceholder}>
        {icon || '📁'}
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  );
};

export default DesktopIcon;
