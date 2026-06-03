import React from 'react';
import styles from './ControlPanel.module.css';

interface ControlPanelProps {
  currentBgColor: string;
  onColorChange: (color: string) => void;
}

const PRESET_COLORS = [
  { name: 'Teal', color: '#008080' },
  { name: 'Blue', color: '#000080' },
  { name: 'Plum', color: '#800080' },
  { name: 'Silver', color: '#c0c0c0' },
  { name: 'Maroon', color: '#800000' },
  { name: 'Olive', color: '#808000' },
  { name: 'Gray', color: '#808080' },
  { name: 'Black', color: '#000000' },
];

const ControlPanel: React.FC<ControlPanelProps> = ({ currentBgColor, onColorChange }) => {
  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <div className={styles.tabActive}>Display</div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.section}>
          <span className={styles.sectionTitle}>Desktop Background</span>
          <div className={styles.previewBox} style={{ backgroundColor: currentBgColor }}>
            <div style={{ color: '#fff', textShadow: '1px 1px #000', fontSize: '10px' }}>Preview</div>
          </div>
          
          <div className={styles.colorGrid}>
            {PRESET_COLORS.map((c) => (
              <button 
                key={c.color} 
                className={`${styles.colorButton} outset`}
                onClick={() => onColorChange(c.color)}
                style={{ fontWeight: currentBgColor === c.color ? 'bold' : 'normal' }}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionTitle}>System Info</span>
          <div style={{ fontSize: '10px', color: '#444' }}>
            Malina-OS v1.0.4-PROD<br/>
            Kernel: React 18.3.1<br/>
            Architecture: Agentic-V2
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
