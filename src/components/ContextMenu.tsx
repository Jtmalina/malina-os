import React from 'react';
import styles from './ContextMenu.module.css';

export interface ContextMenuItem {
  id: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  isDivider?: boolean;
  shortcut?: string;
}

interface ContextMenuProps {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, items, onClose }) => {
  // Ensure menu stays within viewport
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState({ x, y });

  React.useEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const padding = 5;
      let newX = x;
      let newY = y;

      if (x + rect.width > window.innerWidth - padding) {
        newX = window.innerWidth - rect.width - padding;
      }
      if (y + rect.height > window.innerHeight - padding) {
        newY = window.innerHeight - rect.height - padding;
      }
      setPosition({ x: newX, y: newY });
    }
  }, [x, y]);

  return (
    <>
      <div className={styles.overlay} onMouseDown={onClose} onContextMenu={(e) => { e.preventDefault(); onClose(); }} />
      <div 
        ref={menuRef}
        className={styles.menu} 
        style={{ left: position.x, top: position.y }}
        onContextMenu={(e) => e.preventDefault()}
      >
        {items.map((item, index) => (
          item.isDivider ? (
            <div key={`divider-${index}`} className={styles.divider} />
          ) : (
            <div 
              key={item.id} 
              className={`${styles.menuItem} ${item.disabled ? styles.disabled : ''}`}
              onClick={() => {
                if (!item.disabled) {
                  item.onClick();
                  onClose();
                }
              }}
            >
              <span>{item.label}</span>
              {item.shortcut && <span className={styles.shortcut}>{item.shortcut}</span>}
            </div>
          )
        ))}
      </div>
    </>
  );
};

export default ContextMenu;
