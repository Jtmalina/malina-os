import React, { useState, useEffect } from 'react';
import styles from './Zombies.module.css';

interface ZombiesProps {
  onLaunch?: (id: string) => void;
  onClose?: () => void;
  skipLoading?: boolean;
}

const Zombies: React.FC<ZombiesProps> = ({ onLaunch, onClose, skipLoading }) => {
  const [loading, setLoading] = useState(!skipLoading);
  const [progress, setProgress] = useState(0);
  const [view, setView] = useState<'menu' | 'screenshots' | 'settings'>('menu');

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setLoading(false), 100);
            return 100;
          }
          const step = window.IS_VITEST ? 25 : Math.random() * 15;
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
          <div className={styles.zombiesLogo}>
            CALL OF DUTY<br/>
            <span style={{ fontSize: '56px' }}>ZOMBIES</span>
          </div>
          <div className={styles.subLogo}>CITY STREETS - CUSTOM MAP</div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'screenshots') {
    return (
      <div className={styles.container}>
        <div className={styles.gallery}>
          <div className={styles.screenshotWrapper}>
            <img src="/pics/CityStreets.png" alt="City Streets" className={styles.screenshot} />
            <div className={styles.screenshotLabel}>The Main Thoroughfare</div>
          </div>
          <div className={styles.screenshotWrapper}>
            <img src="/pics/CityStreetsBank.png" alt="City Streets Bank" className={styles.screenshot} />
            <div className={styles.screenshotLabel}>The First National Bank</div>
          </div>
          <div className={styles.screenshotWrapper}>
            <img src="/pics/CityStreetsIndoors.png" alt="City Streets Indoors" className={styles.screenshot} />
            <div className={styles.screenshotLabel}>Interior - Close Quarters</div>
          </div>
          <div className={styles.backButton} onClick={() => setView('menu')}>
            &lt; BACK TO MAIN MENU
          </div>
        </div>
      </div>
    );
  }

  if (view === 'settings') {
    return (
      <div className={styles.container}>
        <div className={styles.options}>
          <h2 style={{ color: '#8b0000', textTransform: 'uppercase' }}>Zombies Settings</h2>
          <div className={styles.optionField}>
            <label className={styles.optionLabel}>GORE LEVEL</label>
            <input type="range" className={styles.optionInput} min="0" max="100" defaultValue="100" />
          </div>
          <div className={styles.optionField}>
            <label className={styles.optionLabel}>FOG DENSITY</label>
            <input type="range" className={styles.optionInput} min="0" max="100" defaultValue="60" />
          </div>
          <div className={styles.optionField}>
            <label className={styles.optionLabel}>ZOMBIE SPEED</label>
            <select defaultValue="SPRINT" style={{ background: '#111', color: '#fff', border: '1px solid #333', padding: '5px' }}>
              <option>WALK</option>
              <option>RUN</option>
              <option>SPRINT</option>
              <option>NIGHTMARE</option>
            </select>
          </div>
          <div className={styles.backButton} onClick={() => setView('menu')}>
            &lt; BACK TO MAIN MENU
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <div className={styles.zombiesLogo} style={{ marginBottom: '40px', textAlign: 'left' }}>
          CITY STREETS
        </div>
        <div 
          className={styles.menuItem} 
          onClick={() => onLaunch?.('media-player', {
            videoUrl: 'https://www.youtube.com/embed/6m6S_G8E898?autoplay=1',
            title: 'Black Ops 3 Zombies Trailer'
          })}
        >
          PLAY TRAILER
        </div>
        <div className={styles.menuItem} onClick={() => setView('screenshots')}>SCREENSHOTS</div>
        <div className={styles.menuItem} onClick={() => setView('settings')}>SETTINGS</div>
        <div className={styles.menuItem} onClick={() => window.open('https://github.com/Jtmalina/zm_streets', '_blank')}>
          VIEW SOURCE
        </div>
        <div className={styles.menuItem} onClick={onClose} style={{ marginTop: '20px', color: '#444' }}>QUIT</div>
      </div>
      <div className={styles.footer}>
        REVISION 1.0.4 - T7 ENGINE
      </div>
    </div>
  );
};

export default Zombies;
