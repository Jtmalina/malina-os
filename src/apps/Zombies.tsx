import React, { useState, useEffect } from 'react';
import styles from './Zombies.module.css';

interface ZombiesProps {
  onLaunch?: (id: string, data?: { videoUrl?: string; title?: string }) => void;
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
            <span style={{ fontSize: '48px' }}>ZOMBIES</span>
          </div>
          <div className={styles.subLogo}>AUTHENTICATING WITH CENTRAL SERVER...</div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (view) {
      case 'screenshots':
        return (
          <div className={styles.gallery}>
            <div className={styles.screenshotWrapper}>
              <img src="/pics/CityStreets.png" alt="City Streets" className={styles.screenshot} />
              <div className={styles.screenshotLabel}>
                <span>Location: The Main Thoroughfare</span>
                <span>[01/03]</span>
              </div>
            </div>
            <div className={styles.screenshotWrapper}>
              <img src="/pics/CityStreetsBank.png" alt="City Streets Bank" className={styles.screenshot} />
              <div className={styles.screenshotLabel}>
                <span>Location: The First National Bank</span>
                <span>[02/03]</span>
              </div>
            </div>
            <div className={styles.screenshotWrapper}>
              <img src="/pics/CityStreetsIndoors.png" alt="City Streets Indoors" className={styles.screenshot} />
              <div className={styles.screenshotLabel}>
                <span>Location: Interior - Close Quarters</span>
                <span>[03/03]</span>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className={styles.options}>
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
              <select defaultValue="SPRINT" className={styles.zombiesSelect}>
                <option>WALK</option>
                <option>RUN</option>
                <option>SPRINT</option>
                <option>NIGHTMARE</option>
              </select>
            </div>
            <div className={styles.optionField}>
              <label className={styles.optionLabel}>VOICE CHAT INTEGRATION</label>
              <div style={{ fontSize: '11px', color: '#52525b' }}>VIVOX SDK STATUS: ACTIVE</div>
            </div>
          </div>
        );
      default:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '20px' }}>
            <div className={styles.zombiesLogo}>CITY STREETS</div>
            <div style={{ fontSize: '11px', color: '#52525b', maxWidth: '300px', textAlign: 'center' }}>
              CUSTOM MAP FOR BLACK OPS 3 (T7 ENGINE)
              <br />
              DEVELOPED BY JULIAN MALINA
            </div>
          </div>
        );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.vignette} />
      <div className={styles.mainLayout}>
        <div className={styles.sidebar}>
          <div className={styles.menuHeader}>Main Protocol</div>
          
          <div 
            className={`${styles.menuItem} ${view === 'menu' ? styles.activeItem : ''}`}
            onClick={() => setView('menu')}
          >
            OVERVIEW
          </div>

          <div 
            className={styles.menuItem} 
            onClick={() => onLaunch?.('media-player', {
              videoUrl: 'https://www.youtube.com/embed/efJd6TNYxdc?autoplay=1',
              title: 'Black Ops 3 Zombies Trailer'
            })}
          >
            PLAY TRAILER
          </div>

          <div 
            className={`${styles.menuItem} ${view === 'screenshots' ? styles.activeItem : ''}`}
            onClick={() => setView('screenshots')}
          >
            SCREENSHOTS
          </div>

          <div 
            className={`${styles.menuItem} ${view === 'settings' ? styles.activeItem : ''}`}
            onClick={() => setView('settings')}
          >
            SETTINGS
          </div>

          <div 
            className={styles.menuItem} 
            onClick={() => window.open('https://github.com/Jtmalina/zm_streets', '_blank')}
          >
            VIEW SOURCE
          </div>

          <div 
            className={styles.menuItem} 
            onClick={onClose} 
            style={{ marginTop: 'auto', borderLeft: 'none', color: '#3f3f46' }}
          >
            [ DISCONNECT ]
          </div>
        </div>

        <div className={styles.contentArea}>
          {renderContent()}
        </div>
      </div>
      <div className={styles.footer}>
        T7.OS_REVISION: 1.0.4 // MATCHMAKING: ESTABLISHED
      </div>
    </div>
  );
};

export default Zombies;
