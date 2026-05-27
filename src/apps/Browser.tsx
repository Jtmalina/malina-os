import React, { useState, useEffect, useCallback } from 'react';
import styles from './Browser.module.css';

interface BrowserProps {
  initialUrl?: string;
}

const VIDEOS = [
  { 
    id: 'marathon', 
    title: 'Marathon Trailer', 
    channel: 'Bungie', 
    views: '2.4M views', 
    time: '1 year ago',
    url: 'https://www.youtube.com/embed/MXhQbF7TlbA?autoplay=1'
  },
  { 
    id: 'nerf-vr', 
    title: 'Nerf VR: Ultimate Championship', 
    channel: 'Wolfjaw Studios', 
    views: '850K views', 
    time: '2 years ago',
    url: 'https://www.youtube.com/embed/iDs9Y2TguWg?autoplay=1'
  },
  { 
    id: 'zombies', 
    title: 'City Streets - BO3 Zombies', 
    channel: 'Jtmalina', 
    views: '12K views', 
    time: '3 months ago',
    url: 'https://www.youtube.com/embed/6m6S_G8E898?autoplay=1'
  }
];

const Browser: React.FC<BrowserProps> = ({ initialUrl }) => {
  const [url, setUrl] = useState(initialUrl || 'malina://home');
  const [inputValue, setInputValue] = useState(initialUrl || 'malina://home');
  const [history, setHistory] = useState<string[]>([initialUrl || 'malina://home']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isError, setIsError] = useState(false);

  const navigate = useCallback((newUrl: string) => {
    const formattedUrl = newUrl.startsWith('http') || newUrl.startsWith('malina://') 
      ? newUrl 
      : `https://${newUrl}`;
    
    // Internal routing check
    const isInternal = formattedUrl.startsWith('malina://');
    const isExternal = !isInternal && formattedUrl.startsWith('http') && !formattedUrl.includes('localhost');
    
    setUrl(formattedUrl);
    setInputValue(formattedUrl);
    setIsError(isExternal); 

    // Update history
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(formattedUrl);
      return newHistory;
    });
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  useEffect(() => {
    if (initialUrl) {
      navigate(initialUrl);
    }
  }, [initialUrl, navigate]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      navigate(inputValue);
    }
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const prevUrl = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setUrl(prevUrl);
      setInputValue(prevUrl);
      setIsError(!prevUrl.startsWith('malina://') && prevUrl.startsWith('http') && !prevUrl.includes('localhost'));
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const nextUrl = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setUrl(nextUrl);
      setInputValue(nextUrl);
      setIsError(!nextUrl.startsWith('malina://') && nextUrl.startsWith('http') && !nextUrl.includes('localhost'));
    }
  };

  const renderJulianTube = () => {
    const isWatchPage = url.includes('/watch?v=');
    const videoId = isWatchPage ? url.split('v=')[1] : null;
    const video = VIDEOS.find(v => v.id === videoId);

    return (
      <div className={styles.juliantube}>
        <div className={styles.jtHeader}>
          <div className={styles.jtLogo} onClick={() => navigate('malina://juliantube')}>
            <span style={{ fontSize: '24px' }}>▶️</span> JulianTube
          </div>
          <div className={styles.jtSearch}>
            <input type="text" placeholder="Search" />
            <button>🔍</button>
          </div>
        </div>
        <div className={styles.jtContent}>
          <div className={styles.jtSidebar}>
            <div className={`${styles.jtSidebarItem} ${!isWatchPage ? styles.jtSidebarItemActive : ''}`} onClick={() => navigate('malina://juliantube')}>🏠 Home</div>
            <div className={styles.jtSidebarItem}>🎞️ Shorts</div>
            <div className={styles.jtSidebarItem}>📺 Subscriptions</div>
            <div style={{ borderBottom: '1px solid #ddd', margin: '10px 0' }}></div>
            <div className={styles.jtSidebarItem}>📚 Library</div>
            <div className={styles.jtSidebarItem}>🕒 History</div>
          </div>
          <div className={styles.jtMain}>
            {isWatchPage && video ? (
              <div className={styles.jtWatchView}>
                <div className={styles.jtPlayer}>
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={video.url} 
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className={styles.jtWatchTitle}>{video.title}</div>
                <div className={styles.jtWatchMeta}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className={styles.jtAvatar}></div>
                    <div>
                      <div style={{ fontWeight: 'bold' }}>{video.channel}</div>
                      <div style={{ fontSize: '12px', color: '#606060' }}>1.2M subscribers</div>
                    </div>
                    <button style={{ backgroundColor: '#0f0f0f', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '18px', fontWeight: 'bold', marginLeft: '10px' }}>Subscribe</button>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ background: '#f2f2f2', border: 'none', padding: '8px 16px', borderRadius: '18px' }}>👍 45K</button>
                    <button style={{ background: '#f2f2f2', border: 'none', padding: '8px 16px', borderRadius: '18px' }}>↪️ Share</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.jtGrid}>
                {VIDEOS.map(v => (
                  <div key={v.id} className={styles.jtVideoCard} onClick={() => navigate(`malina://juliantube/watch?v=${v.id}`)}>
                    <div className={styles.jtThumbnail}>
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)' }}></div>
                      {v.id === 'nerf-vr' ? '🎯' : v.id === 'marathon' ? '🔫' : '🧟'}
                    </div>
                    <div className={styles.jtVideoInfo}>
                      <div className={styles.jtAvatar}></div>
                      <div className={styles.jtText}>
                        <div className={styles.jtTitle}>{v.title}</div>
                        <div className={styles.jtMeta}>{v.channel}</div>
                        <div className={styles.jtMeta}>{v.views} • {v.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.browser}>
      <div className={styles.toolbar}>
        <div className={styles.navBar}>
          <button className={styles.toolButton} onClick={goBack} disabled={historyIndex <= 0}>
            <span className={styles.toolIcon}>⬅️</span>
            <span className={styles.toolLabel}>Back</span>
          </button>
          <button className={styles.toolButton} onClick={goForward} disabled={historyIndex >= history.length - 1}>
            <span className={styles.toolIcon}>➡️</span>
            <span className={styles.toolLabel}>Forward</span>
          </button>
          <button className={styles.toolButton} onClick={() => navigate(url)}>
            <span className={styles.toolIcon}>🔄</span>
            <span className={styles.toolLabel}>Refresh</span>
          </button>
          <button className={styles.toolButton} onClick={() => navigate('malina://home')}>
            <span className={styles.toolIcon}>🏠</span>
            <span className={styles.toolLabel}>Home</span>
          </button>
          <div style={{ width: '1px', background: '#808080', margin: '2px 4px', boxShadow: '1px 0 #fff' }}></div>
          <button className={styles.toolButton} disabled>
            <span className={styles.toolIcon}>🔍</span>
            <span className={styles.toolLabel}>Search</span>
          </button>
          <button className={styles.toolButton} disabled>
            <span className={styles.toolIcon}>⭐</span>
            <span className={styles.toolLabel}>Favorites</span>
          </button>
        </div>
        <div className={styles.addressBarRow}>
          <span>Address:</span>
          <input 
            type="text" 
            className={styles.addressInput} 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button style={{ height: '20px', fontSize: '10px' }} onClick={() => navigate(inputValue)}>Go</button>
        </div>
      </div>

      <div className={styles.content}>
        {url === 'malina://home' ? (
          <div className={styles.homePage}>
            <div className={styles.homeLogo}>Malina Search</div>
            <div className={styles.searchBox}>
              <input type="text" placeholder="Search the web..." />
              <button onClick={() => navigate('malina://juliantube')}>Search</button>
            </div>
            <div className={styles.linksGrid}>
              <div className={styles.linkItem} onClick={() => navigate('malina://juliantube')}>
                <span className={styles.linkIcon}>▶️</span>
                <span className={styles.linkLabel}>JulianTube</span>
              </div>
              <div className={styles.linkItem} onClick={() => navigate('https://github.com/Jtmalina/malina-os')}>
                <span className={styles.linkIcon}>🐙</span>
                <span className={styles.linkLabel}>GitHub</span>
              </div>
              <div className={styles.linkItem} onClick={() => window.open('https://www.bungie.net/7/en/Marathon/Credits', '_blank')}>
                <span className={styles.linkIcon}>🔫</span>
                <span className={styles.linkLabel}>Marathon Credits</span>
              </div>
              <div className={styles.linkItem} onClick={() => navigate('malina://portfolio')}>
                <span className={styles.linkIcon}>💼</span>
                <span className={styles.linkLabel}>My Portfolio</span>
              </div>
            </div>
          </div>
        ) : url.startsWith('malina://juliantube') ? (
          renderJulianTube()
        ) : isError ? (
          <div className={styles.errorView}>
            <div className={styles.errorIcon}>🚫</div>
            <div className={styles.errorTitle}>Navigation Blocked</div>
            <div className={styles.errorText}>
              Security policy prevents embedding <strong>{url}</strong> directly in this window.
            </div>
            <button 
              className="outset" 
              style={{ padding: '5px 20px' }}
              onClick={() => window.open(url, '_blank')}
            >
              Open in New Tab
            </button>
            <div style={{ marginTop: '20px', fontSize: '12px', color: '#888' }}>
              Error Code: SEC_FRAME_DENY_XFO
            </div>
          </div>
        ) : (
          <iframe 
            src={url} 
            className={styles.iframe} 
            title="Browser Content"
            onError={() => setIsError(true)}
          />
        )}
      </div>

      <div className={styles.statusBar}>
        <span>{url.startsWith('malina://') ? 'Done' : `Opening page ${url}...`}</span>
        <div style={{ marginLeft: 'auto' }}>My Computer</div>
      </div>
    </div>
  );
};

export default Browser;
