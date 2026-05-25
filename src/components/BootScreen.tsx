import React, { useState, useEffect } from 'react';
import styles from './BootScreen.module.css';
import SystemLogo from './SystemLogo';

interface BootScreenProps {
  onBoot: () => void;
}

type BootStage = 'BIOS' | 'STARTING' | 'SPLASH';

const BootScreen: React.FC<BootScreenProps> = ({ onBoot }) => {
  const [stage, setStage] = useState<BootStage>('BIOS');

  useEffect(() => {
    let timer: number;
    if (stage === 'BIOS') {
      timer = window.setTimeout(() => setStage('STARTING'), 2500);
    } else if (stage === 'STARTING') {
      timer = window.setTimeout(() => setStage('SPLASH'), 2000);
    }
    return () => window.clearTimeout(timer);
  }, [stage]);

  const handleSkip = () => {
    if (stage === 'BIOS' || stage === 'STARTING') {
      setStage('SPLASH');
    } else {
      onBoot();
    }
  };

  if (stage === 'BIOS') {
    return (
      <div className={styles.biosContainer} onClick={handleSkip}>
        <div className={styles.biosText}>
          AMIBIOS (C) 1992 American Megatrends Inc.<br />
          640KB OK<br />
          16384KB Extended OK<br />
          <br />
          Wait...<br />
          <br />
          Detecting IDE Primary Drive... [Found]<br />
          Detecting IDE Secondary Drive... [None]<br />
          <br />
          Press DEL to run Setup<br />
          <br />
          <span className={styles.skipHint}>(Click to skip)</span>
        </div>
      </div>
    );
  }

  if (stage === 'STARTING') {
    return (
      <div className={styles.startingContainer} onClick={handleSkip}>
        <div className={styles.startingText}>
          Initializing Malina-OS...<br />
          <br />
          <span className={styles.skipHint}>(Click to skip)</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.splashContainer} onClick={handleSkip}>
      <div className={styles.logoContainer}>
        <SystemLogo size="large" />
        <div className={styles.text}>
          Creative<br />
          <span>Malina-OS</span>
        </div>
      </div>
      
      <div className={styles.footer}>
        <div className={styles.loadingBarContainer}>
          <div className={styles.loadingBar}></div>
        </div>
        <p>Click anywhere to start</p>
      </div>
    </div>
  );
};

export default BootScreen;
