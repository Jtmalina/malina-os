import React from 'react';
import styles from './ProjectProperties.module.css';

const ProjectProperties: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <div className={styles.tabActive}>General</div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.section}>
          <div className={styles.iconLarge}>🎨</div>
          <div className={styles.info}>
            <div className={styles.title}>Malina-OS Portfolio</div>
            <div className={styles.subtitle}>Interactive Desktop Environment</div>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.details}>
          <div className={styles.detailRow}>
            <span className={styles.label}>Type:</span>
            <span className={styles.value}>React Application (Vite/TS)</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>Description:</span>
            <span className={styles.value}>A nostalgic, fully interactive Windows 95-style portfolio showcasing web engineering and design fidelity.</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>Tech Stack:</span>
            <div className={styles.stack}>
              <span>React 18</span>
              <span>TypeScript</span>
              <span>Vite</span>
              <span>CSS Modules</span>
              <span>Vitest</span>
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.aiInfo}>
          <strong>🤖 AI Engineering Experiment</strong>
          <p>This project was developed through an agentic partnership between a human engineer and **Gemini 2.0 Flash**. It serves as a demonstration of high-fidelity UI recreation and autonomous codebase management.</p>
        </div>

        <div className={styles.actions}>
          <button 
            className="outset" 
            onClick={() => window.open('https://github.com/Jtmalina/julian-malina-dev', '_blank')}
          >
            View Source
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectProperties;
