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
  const [size, setSize] = useState({
    width: typeof defaultSize.width === 'number' ? defaultSize.width : 400,
    height: typeof defaultSize.height === 'number' ? defaultSize.height : 300,
  });
  const [isMaximized, setIsMaximized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  
  const dragOffset = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (onFocus) onFocus(id);
    
    // Maximize button
    if ((e.target as HTMLElement).closest(`.${styles.maximizeBtn}`)) {
      return;
    }

    // Only drag from title bar if not maximized
    if (!isMaximized && (e.target as HTMLElement).closest(`.${styles.titleBar}`)) {
      setIsDragging(true);
      dragOffset.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
    }
  };

  const startResizing = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMaximized) return;
    
    setIsResizing(true);
    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
      w: size.width,
      h: size.height,
    };
  };

  const toggleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMaximized(!isMaximized);
    if (onMaximize) onMaximize(id);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.current.x,
          y: e.clientY - dragOffset.current.y,
        });
      } else if (isResizing) {
        const deltaX = e.clientX - resizeStart.current.x;
        const deltaY = e.clientY - resizeStart.current.y;
        setSize({
          width: Math.max(200, resizeStart.current.w + deltaX),
          height: Math.max(100, resizeStart.current.h + deltaY),
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing]);

  const windowStyle: React.CSSProperties = isMaximized 
    ? {
        zIndex,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        position: 'absolute',
      }
    : {
        zIndex,
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
      };

  return (
    <div 
      ref={windowRef}
      className={`${styles.window} ${isActive ? styles.active : ''} ${isMaximized ? styles.maximized : ''}`}
      style={windowStyle}
      onMouseDown={handleMouseDown}
    >
      <div className={styles.titleBar} onDoubleClick={toggleMaximize}>
        <div className={styles.titleContent}>
          {icon && <span className={styles.titleIcon}>{icon}</span>}
          <div className={styles.titleText}>{title}</div>
        </div>
        <div className={styles.controls}>
          <button className={styles.controlBtn} onClick={() => onMinimize?.(id)}>_</button>
          <button className={`${styles.controlBtn} ${styles.maximizeBtn}`} onClick={toggleMaximize}>
            {isMaximized ? '❐' : '□'}
          </button>
          <button className={`${styles.controlBtn} ${styles.closeBtn}`} onClick={() => onClose?.(id)}>X</button>
        </div>
      </div>
      <div className={styles.content}>
        {children}
      </div>
      {!isMaximized && (
        <div className={styles.resizer} onMouseDown={startResizing}></div>
      )}
    </div>
  );
};

export default Window;
