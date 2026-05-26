import React, { useState, useEffect } from 'react';
import styles from './NerfVR.module.css';

interface NerfVRProps {
  onLaunch?: (id: string) => void;
  onClose?: () => void;
  skipLoading?: boolean;
}

const NerfVR: React.FC<NerfVRProps> = ({ onLaunch, onClose, skipLoading }) => {
  const [loading, setLoading] = useState(!skipLoading);
  const [progress, setProgress] = useState(0);
  const [view, setView] = useState<'menu' | 'about'>('menu');

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setLoading(false), 100);
            return 100;
          }
          const step = window.IS_VITEST ? 25 : Math.random() * 20;
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
          <div className={styles.nerfLogo}>NERF VR</div>
          <div className={styles.subLogo}>Ultimate Championship</div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
          </div>
          <div style={{ fontSize: '10px', color: '#666' }}>CALIBRATING BLASTERS...</div>
        </div>
      </div>
    );
  }

  if (view === 'about') {
    return (
      <div className={styles.container}>
        <div className={styles.about}>
          <div className={styles.aboutTitle}>MISSION BRIEFING</div>
          <div className={styles.aboutText}>
            <p><strong>Nerf VR: Ultimate Championship</strong> was a high-octane competitive VR shooter released in 2022. It brought the classic Nerf arena experience to life with immersive motion controls and intense multiplayer battles.</p>
            <p>Though the official servers were shut down in 2023, this project remains a key highlight of my professional career.</p>
            <p style={{ marginTop: '10px', color: '#ff6600', fontWeight: 'bold' }}>MY CONTRIBUTION:</p>
            <p>I worked as a Software Engineer on the multiplayer infrastructure. My primary focus was the end-to-end integration of the <strong>Matchmaking Service</strong>. I collaborated closely with my lead (who handled server hosting integration) and the QA team to design, implement, and tune client-specified matchmaking algorithms, ensuring balanced and stable matches for the global player base.</p>
          </div>
          <div className={styles.backButton} onClick={() => setView('menu')}>
            RETURN TO BASE
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <div className={styles.nerfLogo} style={{ marginBottom: '20px' }}>NERF VR</div>
        <div 
          className={styles.menuItem} 
          onClick={() => onLaunch?.('media-player')}
        >
          PLAY TRAILER
        </div>
        <div className={styles.menuItem} onClick={() => setView('about')}>
          ABOUT PROJECT
        </div>
        <div className={styles.menuItem} onClick={onClose} style={{ backgroundColor: '#444' }}>
          QUIT
        </div>
      </div>
      <div className={styles.footer}>
        DECOMMISSIONED 2023 - [LEGACY_ACCESS]
      </div>
    </div>
  );
};

export default NerfVR;
