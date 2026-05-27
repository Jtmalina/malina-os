import React, { useState, useEffect } from 'react';
import styles from './Marathon.module.css';

interface MarathonProps {
  onLaunch?: (id: string, data?: { videoUrl?: string; title?: string }) => void;
  onClose?: () => void;
  skipLoading?: boolean;
}

const Marathon: React.FC<MarathonProps> = ({ onLaunch, onClose, skipLoading }) => {
  const [loading, setLoading] = useState(!skipLoading);
  const [progress, setProgress] = useState(0);
  const [view, setView] = useState<'menu' | 'options' | 'credits'>('menu');

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setLoading(false), 100);
            return 100;
          }
          const step = window.IS_VITEST ? 25 : Math.random() * 10;
          return prev + step;
        });
      }, 10);
      return () => clearInterval(interval);
    }
  }, [loading]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingScreen}>
          <div className={styles.logo}>MARATHON</div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
          </div>
          <div style={{ fontSize: '12px' }}>LOADING ASSETS... {Math.round(progress)}%</div>
        </div>
      </div>
    );
  }

  if (view === 'options') {
    return (
      <div className={styles.container}>
        <div className={styles.options}>
          <h2 style={{ color: '#ff0000' }}>GAME OPTIONS</h2>
          <div className={styles.optionField}>
            <label className={styles.optionLabel}>ALIEN DIFFICULTY</label>
            <input type="range" className={styles.optionInput} min="0" max="100" defaultValue="75" />
          </div>
          <div className={styles.optionField}>
            <label className={styles.optionLabel}>EXISTENTIAL DREAD</label>
            <input type="range" className={styles.optionInput} min="0" max="100" defaultValue="100" />
          </div>
          <div className={styles.optionField}>
            <label className={styles.optionLabel}>AUDIO FIDELITY</label>
            <select defaultValue="32-BIT SURROUND" style={{ background: '#000', color: '#fff', border: '1px solid #fff' }}>
              <option>8-BIT MONO</option>
              <option>32-BIT SURROUND</option>
              <option>VACUUM SILENCE</option>
            </select>
          </div>
          <div className={styles.backButton} onClick={() => setView('menu')}>
            [ ESC ] RETURN TO MAIN MENU
          </div>
        </div>
      </div>
    );
  }

  if (view === 'credits') {
    window.open('https://www.bungie.net/7/en/Marathon/Credits', '_blank');
    setView('menu');
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <div className={styles.logo} style={{ marginBottom: '40px' }}>MARATHON</div>
        <div 
          className={styles.menuItem} 
          onClick={() => onLaunch?.('media-player', { 
            videoUrl: 'https://www.youtube.com/embed/MXhQbF7TlbA?autoplay=1',
            title: 'Marathon Trailer'
          })}
        >
          PLAY
        </div>
        <div className={styles.menuItem} onClick={() => setView('options')}>OPTIONS</div>
        <div className={styles.menuItem} onClick={() => setView('credits')}>CREDITS</div>
        <div className={styles.menuItem} onClick={onClose}>QUIT</div>
      </div>
      <div style={{ position: 'absolute', bottom: '10px', right: '10px', fontSize: '10px', color: '#444' }}>
        BUILD 0.95.ALPHA
      </div>
    </div>
  );
};

export default Marathon;
