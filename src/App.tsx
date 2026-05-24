import { useState, useRef } from 'react'
import './App.css'
import Taskbar from './components/Taskbar'
import Window from './components/Window'
import DesktopIcon from './components/DesktopIcon'
import AboutMe from './apps/AboutMe'
import Projects from './apps/Projects'
import Contact from './apps/Contact'
import Paint from './apps/Paint'
import MediaPlayer from './apps/MediaPlayer'
import BootScreen from './components/BootScreen'

import StartMenu from './components/StartMenu'

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
}

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [windows, setWindows] = useState<WindowInfo[]>([
    {
      id: 'about',
      title: 'About Me - Notepad',
      isOpen: false,
      isMinimized: false,
      zIndex: 100,
      content: <AboutMe />,
      icon: '📝',
      defaultSize: { width: 350, height: 400 },
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
      title: 'Contact - Address Book',
      isOpen: false,
      isMinimized: false,
      zIndex: 102,
      content: <Contact />,
      icon: '📞',
      defaultSize: { width: 400, height: 450 },
      initialPosition: { x: 200, y: 80 },
    },
    {
      id: 'paint',
      title: 'untitled - Paint',
      isOpen: false,
      isMinimized: false,
      zIndex: 103,
      content: <Paint />,
      icon: '🎨',
      defaultSize: { width: 600, height: 450 },
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
    },
  ]);

  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);

  const handleBoot = () => {
    setIsBooting(false);
    if (!audioRef.current) {
      audioRef.current = new Audio('https://archive.org/download/win95startup/win95startup.mp3');
    }
    audioRef.current.play().catch(err => console.error("Audio playback failed:", err));
  };

  const focusWindow = (id: string) => {
    setActiveWindowId(id);
    setWindows(prev => {
      const maxZ = Math.max(...prev.map(w => w.zIndex), 100);
      return prev.map(w => w.id === id ? { ...w, zIndex: maxZ + 1, isMinimized: false, isOpen: true } : w);
    });
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false } : w));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const minimizeWindow = (id: string) => {
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
    setIsStartMenuOpen(!isStartMenuOpen);
  };

  const startMenuItems = windows.map(w => ({
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
        {windows.filter(w => w.id !== 'media-player').map(w => (
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

      <Taskbar 
        windows={windows} 
        activeWindowId={activeWindowId} 
        onTaskClick={toggleWindow}
        onStartClick={toggleStartMenu}
        isStartMenuOpen={isStartMenuOpen}
      />
    </div>
  )
}

export default App
