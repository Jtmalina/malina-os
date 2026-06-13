import { useState, lazy, Suspense } from 'react'
import './App.css'
import Taskbar from './components/Taskbar'
import Window from './components/Window'
import DesktopIcon from './components/DesktopIcon'
import BootScreen from './components/BootScreen'
import ShutdownScreen from './components/ShutdownScreen'
import Dialog from './components/Dialog'
import ContextMenu, { ContextMenuItem } from './components/ContextMenu'
import { playSound } from './utils/sounds'
import StartMenu from './components/StartMenu'

// Lazy load apps
const AboutMe = lazy(() => import('./apps/AboutMe'))
const Projects = lazy(() => import('./apps/Projects'))
const Contact = lazy(() => import('./apps/Contact'))
const Paint = lazy(() => import('./apps/Paint'))
const MediaPlayer = lazy(() => import('./apps/MediaPlayer'))
const Minesweeper = lazy(() => import('./apps/Minesweeper'))
const Marathon = lazy(() => import('./apps/Marathon'))
const Browser = lazy(() => import('./apps/Browser'))
const ProjectProperties = lazy(() => import('./apps/ProjectProperties'))
const Zombies = lazy(() => import('./apps/Zombies'))
const Solitaire = lazy(() => import('./apps/Solitaire'))
const NerfVR = lazy(() => import('./apps/NerfVR'))
const ControlPanel = lazy(() => import('./apps/ControlPanel'))

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
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  const [desktopBgColor, setDesktopBgColor] = useState(() => {
    return localStorage.getItem('desktopBgColor') || '#008080';
  });

  const handleBgColorChange = (color: string) => {
    setDesktopBgColor(color);
    localStorage.setItem('desktopBgColor', color);
  };

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
      defaultSize: { width: 600, height: 480 },
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
    {
      id: 'dread-tide',
      title: 'Dread Tide',
      isOpen: false,
      isMinimized: false,
      zIndex: 113,
      content: <Browser initialUrl="malina://dreadtide" />,
      icon: '🌊',
      defaultSize: { width: 560, height: 620 },
      initialPosition: { x: 220, y: 60 },
    },
    {
      id: 'settings',
      title: 'Control Panel',
      isOpen: false,
      isMinimized: false,
      zIndex: 112,
      content: <ControlPanel currentBgColor={desktopBgColor} onColorChange={handleBgColorChange} />,
      icon: '⚙️',
      defaultSize: { width: 400, height: 450 },
      initialPosition: { x: 200, y: 150 },
      hideFromMenu: true,
    },
  ]);

  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [dialog, setDialog] = useState<{ title: string; message: string; onOk: () => void } | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; items: ContextMenuItem[] } | null>(null);

  const handleBoot = () => {
    setIsBooting(false);
    playSound('startup');
  };

  const handleDesktopContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      items: [
        { id: 'view', label: 'View', onClick: () => {}, disabled: true },
        { id: 'arrange', label: 'Arrange Icons', onClick: () => {}, disabled: true },
        { id: 'lineup', label: 'Line Up Icons', onClick: () => {}, disabled: true },
        { id: 'd1', label: '', onClick: () => {}, isDivider: true },
        { id: 'paste', label: 'Paste', onClick: () => {}, disabled: true },
        { id: 'paste-shortcut', label: 'Paste Shortcut', onClick: () => {}, disabled: true },
        { id: 'd2', label: '', onClick: () => {}, isDivider: true },
        { id: 'new', label: 'New', onClick: () => {}, disabled: true },
        { id: 'd3', label: '', onClick: () => {}, isDivider: true },
        { id: 'properties', label: 'Properties', onClick: () => focusWindow('portfolio-properties') },
      ]
    });
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

  const handleTaskbarContextMenu = (id: string, x: number, y: number) => {
    setContextMenu({
      x,
      y: y - 100, // Offset upwards since taskbar is at bottom
      items: [
        { id: 'restore', label: 'Restore', onClick: () => focusWindow(id), disabled: activeWindowId === id },
        { id: 'minimize', label: 'Minimize', onClick: () => minimizeWindow(id) },
        { id: 'maximize', label: 'Maximize', onClick: () => {}, disabled: true },
        { id: 'd1', label: '', onClick: () => {}, isDivider: true },
        { id: 'close', label: 'Close', onClick: () => closeWindow(id) },
      ]
    });
  };

  const handleShutdown = () => {
    setIsStartMenuOpen(false);
    setIsShuttingDown(true);
  };

  const startMenuItems = windows.filter(w => !w.hideFromMenu).map(w => ({
    id: w.id,
    label: w.title.split(' - ')[0],
    icon: w.icon,
    onClick: () => toggleWindow(w.id),
  }));

  if (isShuttingDown) {
    return <ShutdownScreen />;
  }

  if (isBooting) {
    return <BootScreen onBoot={handleBoot} />;
  }

  return (
    <div className="desktop" onContextMenu={handleDesktopContextMenu} style={{ backgroundColor: desktopBgColor }}>
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
            <Suspense fallback={
              <div style={{ 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                backgroundColor: 'var(--win-gray)',
                fontSize: '12px' 
              }}>
                Loading Application...
              </div>
            }>
              {w.content}
            </Suspense>
          </Window>
        ))}
      </div>

      <StartMenu 
        isOpen={isStartMenuOpen} 
        onClose={() => setIsStartMenuOpen(false)} 
        onShutdown={handleShutdown}
        items={startMenuItems}
      />

      <div className="taskbar-wrapper">
        <Taskbar 
          windows={windows.filter(w => !w.hideFromMenu || w.isOpen)} 
          activeWindowId={activeWindowId} 
          onTaskClick={toggleWindow}
          onRightClick={handleTaskbarContextMenu}
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

      {contextMenu && (
        <ContextMenu 
          x={contextMenu.x} 
          y={contextMenu.y} 
          items={contextMenu.items} 
          onClose={() => setContextMenu(null)} 
        />
      )}
    </div>
  )
}

export default App
