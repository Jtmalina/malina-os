import React, { useState } from 'react';
import styles from './Projects.module.css';

interface FileEntry {
  id?: string;
  name: string;
  type: 'Folder' | 'Application' | 'Executable';
  size: string;
  icon: string;
  url?: string;
  launchApp?: string;
}

interface Directory {
  [key: string]: FileEntry[];
}

interface ProjectsProps {
  onLaunch?: (id: string) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onLaunch }) => {
  const [currentFolder, setCurrentFolder] = useState('root');

  const filesystem: Directory = {
    root: [
      { name: 'Apps', type: 'Folder', size: '--', icon: '📂' },
      { name: 'Games', type: 'Folder', size: '--', icon: '📂' },
    ],
    Apps: [
      { 
        name: 'Malina-OS Portfolio', 
        type: 'Executable', 
        size: '2.5 MB', 
        icon: '🎨',
        launchApp: 'malina-os-portfolio'
      },
      { 
        name: 'OmniList', 
        type: 'Executable', 
        size: '1.8 MB', 
        icon: '📝', 
        url: 'https://omni-list-one.vercel.app/' 
      },
    ],
    Games: [
      { 
        name: 'Marathon', 
        type: 'Executable', 
        size: '120 MB', 
        icon: '🔫', 
        launchApp: 'marathon'
      },
      { 
        name: 'StreetBrawler', 
        type: 'Executable', 
        size: '45 MB', 
        icon: '🥊', 
        url: 'https://github.com/Jtmalina/Wolfjam-StreetBrawler' 
      },
    ],
  };

  const handleEntryClick = (entry: FileEntry) => {
    if (entry.type === 'Folder') {
      setCurrentFolder(entry.name);
    } else if (entry.type === 'Executable') {
      if (entry.url) {
        window.open(entry.url, '_blank');
      }
      if (entry.launchApp && onLaunch) {
        onLaunch(entry.launchApp);
      }
    }
  };

  const goBack = () => {
    setCurrentFolder('root');
  };

  return (
    <div className={styles.explorer}>
      <div className={styles.toolbar}>
        <button 
          onClick={goBack} 
          disabled={currentFolder === 'root'}
          className={styles.backBtn}
        >
          <span className={styles.upArrow}>↑</span> Up
        </button>
        <div className={styles.addressBar}>
          C:\Projects{currentFolder === 'root' ? '' : `\\${currentFolder}`}
        </div>
      </div>

      <div className={styles.content}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {filesystem[currentFolder].map((entry, i) => (
              <tr 
                key={i} 
                onDoubleClick={() => handleEntryClick(entry)}
                className={styles.row}
              >
                <td className={styles.nameCell}>
                  <span className={styles.icon}>{entry.icon}</span>
                  {entry.name}
                  {entry.type === 'Executable' && '.exe'}
                </td>
                <td>{entry.type}</td>
                <td>{entry.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className={styles.footer}>
        <div className={styles.footerItem}>{filesystem[currentFolder].length} object(s)</div>
        <div className={styles.footerItem}>My Computer</div>
      </div>
    </div>
  );
};

export default Projects;
