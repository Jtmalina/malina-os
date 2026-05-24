import React, { useState, useEffect } from 'react';
import styles from './Taskbar.module.css';

interface TaskbarProps {
  windows: Array<{
    id: string;
    title: string;
    icon: string;
    isOpen: boolean;
    isMinimized: boolean;
  }>;
  activeWindowId: string | null;
  onTaskClick: (id: string) => void;
  onStartClick: () => void;
  isStartMenuOpen: boolean;
}

const Taskbar: React.FC<TaskbarProps> = ({ 
  windows, 
  activeWindowId, 
  onTaskClick, 
  onStartClick,
  isStartMenuOpen 
}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={styles.taskbar}>
      <button 
        className={`${styles.startButton} ${isStartMenuOpen ? styles.activeTask : ''}`}
        onClick={onStartClick}
      >
        <div className={styles.startIconPlaceholder}>🪟</div>
        <span>Start</span>
      </button>

      <div className={styles.tasks}>
        {windows.filter(w => w.isOpen).map(w => (
          <button 
            key={w.id} 
            className={`${styles.taskButton} ${activeWindowId === w.id ? styles.activeTask : ''}`}
            onClick={() => onTaskClick(w.id)}
          >
            <span className={styles.taskIcon}>{w.icon}</span>
            <span className={styles.taskTitle}>{w.title}</span>
          </button>
        ))}
      </div>

      <div className={styles.tray}>
        <div className={styles.time}>
          {formatTime(time)}
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
