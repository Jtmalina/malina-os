import React from 'react';
import styles from './DreadTide.module.css';

const DREAD_TIDE_URL = 'https://dread-tide.vercel.app/game.html';

const DreadTide: React.FC = () => {
  return (
    <div className={styles.dreadtide}>
      <div className={styles.dtHero}>
        <div className={styles.dtPoster}>🌊</div>
        <div className={styles.dtTitle}>DREAD TIDE</div>
        <div className={styles.dtSubtitle}>Raft Wave Defense</div>
      </div>
      <div className={styles.dtBody}>
        <p className={styles.dtBlurb}>
          Survive on a drifting raft. Hook floating debris, build defenses, and hold
          the line against the rising tide — all the way to the Barnacle Titan.
        </p>
        <div className={styles.dtSpecs}>
          <span>🎮 Wave Defense</span>
          <span>⚙️ Godot 4</span>
          <span>🖥️ Plays in browser</span>
        </div>
        <a className={styles.dtPlayButton} href={DREAD_TIDE_URL} target="_blank" rel="noopener noreferrer">
          ▶ Play Now
        </a>
        <div className={styles.dtNote}>Launches in a new window • Best experienced in Chrome</div>
      </div>
    </div>
  );
};

export default DreadTide;
