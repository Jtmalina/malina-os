import React, { useState, useRef, useEffect } from 'react';
import styles from './Window.module.css';

interface WindowProps {
  id: string;
  title: string;
  icon?: string;
  children: React.ReactNode;
  onClose?: (id: string) => void;
  onMinimize?: (id: string) => void;
  onMaximize?: (id: string) => void;
  onFocus?: (id: string) => void;
  isActive?: boolean;
  zIndex?: number;
  initialPosition?: { x: number; y: number };
  defaultSize?: { width: number | string; height: number | string };
}

const Window: React.FC<WindowProps> = ({
  id,
  title,
  icon,
  children,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  isActive = false,
  zIndex = 100,
  initialPosition = { x: 50, y: 50 },
  defaultSize = { width: 400, height: 300 },
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (onFocus) onFocus(id);
    
    // Only drag from title bar
    if ((e.target as HTMLElement).closest(`.${styles.titleBar}`)) {
      setIsDragging(true);
      dragOffset.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.current.x,
          y: e.clientY - dragOffset.current.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const windowStyle: React.CSSProperties = {
    zIndex,
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: typeof defaultSize.width === 'number' ? `${defaultSize.width}px` : defaultSize.width,
    height: typeof defaultSize.height === 'number' ? `${defaultSize.height}px` : defaultSize.height,
  };

  return (
    <div 
      ref={windowRef}
      className={`${styles.window} ${isActive ? styles.active : ''}`}
      style={windowStyle}
      onMouseDown={handleMouseDown}
    >
      <div className={styles.titleBar}>
        <div className={styles.titleContent}>
          {icon && <span className={styles.titleIcon}>{icon}</span>}
          <div className={styles.titleText}>{title}</div>
        </div>
        <div className={styles.controls}>
          <button className={styles.controlBtn} onClick={() => onMinimize?.(id)}>_</button>
          <button className={styles.controlBtn} onClick={() => onMaximize?.(id)}>□</button>
          <button className={`${styles.controlBtn} ${styles.closeBtn}`} onClick={() => onClose?.(id)}>X</button>
        </div>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default Window;
