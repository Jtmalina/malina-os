import { useState } from 'react'
import './App.css'
import Taskbar from './components/Taskbar'
import Window from './components/Window'
import DesktopIcon from './components/DesktopIcon'
import AboutMe from './apps/AboutMe'
import Projects from './apps/Projects'
import Contact from './apps/Contact'
import Paint from './apps/Paint'
import MediaPlayer from './apps/MediaPlayer'
import Minesweeper from './apps/Minesweeper'
import Marathon from './apps/Marathon'
import Browser from './apps/Browser'
import ProjectProperties from './apps/ProjectProperties'
import Zombies from './apps/Zombies'
import Solitaire from './apps/Solitaire'
import NerfVR from './apps/NerfVR'
import BootScreen from './components/BootScreen'
import Dialog from './components/Dialog'
import { playSound } from './utils/sounds'

import StartMenu from './components/StartMenu'

interface LaunchData {
  videoUrl?: string;
  title?: string;
}

interface WindowInfo {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  content: React.ReactNode;
  icon: string;
  defaultSize?: { width: number; height: number };
  initialPosition?: { x: number; y: number };
  hideFromMenu?: boolean;
}

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  const [windows, setWindows] = useState<WindowInfo[]>([
    {
      id: 'about',
      title: 'About Me - Notepad',
      isOpen: false,
      isMinimized: false,
      zIndex: 100,
      content: <AboutMe />,
      icon: '📝',
      defaultSize: { width: 650, height: 600 },
      initialPosition: { x: 100, y: 50 },
    },
    {
      id: 'projects',
      title: 'Projects - Explorer',
      isOpen: false,
      isMinimized: false,
      zIndex: 101,
      content: <Projects onLaunch={(id) => focusWindow(id)} />,
      icon: '📂',
      defaultSize: { width: 500, height: 350 },
      initialPosition: { x: 150, y: 100 },
    },
    {
      id: 'contact',
      title: 'Contact',
      isOpen: false,
      isMinimized: false,
      zIndex: 102,
      content: <Contact />,
      icon: '✉️',
      defaultSize: { width: 550, height: 400 },
      initialPosition: { x: 200, y: 80 },
    },
    {
      id: 'paint',
      title: 'MalinaPaint',
      isOpen: false,
      isMinimized: false,
      zIndex: 103,
      content: <Paint />,
      icon: '🎨',
      defaultSize: { width: 700, height: 550 },
      initialPosition: { x: 80, y: 120 },
    },
    {
      id: 'media-player',
      title: 'Media Player',
      isOpen: false,
      isMinimized: false,
      zIndex: 104,
      content: <MediaPlayer />,
      icon: '🎬',
      defaultSize: { width: 480, height: 360 },
      initialPosition: { x: 250, y: 150 },
      hideFromMenu: true,
    },
    {
      id: 'minesweeper',
      title: 'Minesweeper',
      isOpen: false,
      isMinimized: false,
      zIndex: 105,
      content: <Minesweeper onRequestResize={(w, h) => requestResize('minesweeper', w, h)} />,
      icon: '💣',
      defaultSize: { width: 280, height: 380 },
      initialPosition: { x: 300, y: 50 },
    },
    {
      id: 'marathon',
      title: 'Marathon',
      isOpen: false,
      isMinimized: false,
      zIndex: 106,
      content: <Marathon onLaunch={(id, data) => focusWindow(id, data)} onClose={() => closeWindow('marathon')} />,
      icon: '🔫',
      defaultSize: { width: 600, height: 400 },
      initialPosition: { x: 50, y: 50 },
    },
    {
      id: 'browser',
      title: 'World Wide Web Browser',
      isOpen: false,
      isMinimized: false,
      zIndex: 107,
      content: <Browser />,
      icon: '🌐',
      defaultSize: { width: 700, height: 500 },
      initialPosition: { x: 120, y: 120 },
    },
    {
      id: 'portfolio-properties',
      title: 'Malina-OS Properties',
      isOpen: false,
      isMinimized: false,
      zIndex: 108,
      content: <ProjectProperties />,
      icon: '🎨',
      defaultSize: { width: 400, height: 450 },
      initialPosition: { x: 300, y: 100 },
      hideFromMenu: true,
    },
    {
      id: 'zombies',
      title: 'Call of Duty: Zombies',
      isOpen: false,
      isMinimized: false,
      zIndex: 109,
      content: <Zombies onLaunch={(id, data) => focusWindow(id, data)} onClose={() => closeWindow('zombies')} />,
      icon: '🧟',
      defaultSize: { width: 650, height: 450 },
      initialPosition: { x: 80, y: 80 },
    },
    {
      id: 'solitaire',
      title: 'Solitaire',
      isOpen: false,
      isMinimized: false,
      zIndex: 110,
      content: <Solitaire />,
      icon: '🃏',
      defaultSize: { width: 600, height: 450 },
      initialPosition: { x: 150, y: 150 },
    },
    {
      id: 'nerf-vr',
      title: 'Nerf VR: Ultimate Championship',
      isOpen: false,
      isMinimized: false,
      zIndex: 111,
      content: <NerfVR onLaunch={(id, data) => focusWindow(id, data)} onClose={() => closeWindow('nerf-vr')} />,
      icon: '🎯',
      defaultSize: { width: 600, height: 450 },
      initialPosition: { x: 100, y: 100 },
    },
  ]);

  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [dialog, setDialog] = useState<{ title: string; message: string; onOk: () => void } | null>(null);

  const handleBoot = () => {
    setIsBooting(false);
    playSound('startup');
  };

  const showDialog = (title: string, message: string, onOk: () => void) => {
    playSound('chord');
    setDialog({ title, message, onOk });
  };

  const focusWindow = (id: string, data?: LaunchData) => {
    if (id === 'malina-os-portfolio') {
      showDialog('System Message', "You're already inside it", () => {
        setDialog(null);
        focusWindow('portfolio-properties');
      });
      return;
    }
    
    // Play sound when opening a closed window
    const win = windows.find(w => w.id === id);
    if (win && (!win.isOpen || win.isMinimized)) {
      playSound('ding');
    }

    setActiveWindowId(id);
    setWindows(prev => {
      const maxZ = Math.max(...prev.map(w => w.zIndex), 100);
      return prev.map(w => {
        if (w.id === id) {
          const updated = { ...w, zIndex: maxZ + 1, isMinimized: false, isOpen: true };
          if (id === 'media-player' && data) {
            updated.content = <MediaPlayer videoUrl={data.videoUrl} title={data.title} />;
          }
          return updated;
        }
        return w;
      });
    });
  };

  const closeWindow = (id: string) => {
    playSound('ding');
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false } : w));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const requestResize = (id: string, width: number, height: number) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, defaultSize: { width, height } } : w));
  };

  const minimizeWindow = (id: string) => {
    playSound('ding');
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
    setActiveWindowId(null);
  };

  const toggleWindow = (id: string) => {
    const win = windows.find(w => w.id === id);
    if (!win) return;

    if (!win.isOpen || win.isMinimized) {
      focusWindow(id);
    } else if (activeWindowId === id) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };

  const toggleStartMenu = () => {
    if (!isStartMenuOpen) {
      playSound('ding');
    }
    setIsStartMenuOpen(!isStartMenuOpen);
  };

  const startMenuItems = windows.filter(w => !w.hideFromMenu).map(w => ({
    id: w.id,
    label: w.title.split(' - ')[0],
    icon: w.icon,
    onClick: () => toggleWindow(w.id),
  }));

  if (isBooting) {
    return <BootScreen onBoot={handleBoot} />;
  }

  return (
    <div className="desktop">
      <div className="icons-container">
        {windows.filter(w => !w.hideFromMenu).map(w => (
          <DesktopIcon 
            key={w.id}
            id={w.id} 
            label={w.title.split(' - ')[0]} 
            onDoubleClick={toggleWindow} 
            icon={w.icon} 
          />
        ))}
      </div>
      
      <div className="windows-container">
        {windows.filter(w => w.isOpen && !w.isMinimized).map(w => (
          <Window
            key={w.id}
            id={w.id}
            title={w.title}
            icon={w.icon}
            isActive={activeWindowId === w.id}
            zIndex={w.zIndex}
            onFocus={focusWindow}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            defaultSize={w.defaultSize}
            initialPosition={w.initialPosition}
          >
            {w.content}
          </Window>
        ))}
      </div>

      <StartMenu 
        isOpen={isStartMenuOpen} 
        onClose={() => setIsStartMenuOpen(false)} 
        items={startMenuItems}
      />

      <div className="taskbar-wrapper">
        <Taskbar 
          windows={windows.filter(w => !w.hideFromMenu || w.isOpen)} 
          activeWindowId={activeWindowId} 
          onTaskClick={toggleWindow}
          onStartClick={toggleStartMenu}
          isStartMenuOpen={isStartMenuOpen}
        />
      </div>

      {dialog && (
        <Dialog 
          title={dialog.title} 
          message={dialog.message} 
          onOk={dialog.onOk} 
        />
      )}
    </div>
  )
}

export default App
