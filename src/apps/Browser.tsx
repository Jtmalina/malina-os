import React, { useState, useEffect, useCallback } from 'react';
import styles from './Browser.module.css';

interface BrowserProps {
  initialUrl?: string;
}

const Browser: React.FC<BrowserProps> = ({ initialUrl }) => {
  const [url, setUrl] = useState(initialUrl || 'malina://home');
  const [inputValue, setInputValue] = useState(initialUrl || 'malina://home');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isError, setIsError] = useState(false);

  const navigate = useCallback((newUrl: string) => {
    const formattedUrl = newUrl.startsWith('http') || newUrl.startsWith('malina://') 
      ? newUrl 
      : `https://${newUrl}`;
    
    // Most external sites block iframes (X-Frame-Options)
    const isExternal = formattedUrl.startsWith('http') && !formattedUrl.includes('localhost');
    
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
      setIsError(prevUrl.startsWith('http') && !prevUrl.includes('localhost'));
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const nextUrl = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setUrl(nextUrl);
      setInputValue(nextUrl);
      setIsError(nextUrl.startsWith('http') && !nextUrl.includes('localhost'));
    }
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
              <button>Search</button>
            </div>
            <div className={styles.linksGrid}>
              <div className={styles.linkItem} onClick={() => navigate('https://www.google.com')}>
                <span className={styles.linkIcon}>🌐</span>
                <span className={styles.linkLabel}>Google</span>
              </div>
              <div className={styles.linkItem} onClick={() => navigate('https://github.com/Jtmalina')}>
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
        <span>{url === 'malina://home' ? 'Done' : `Opening page ${url}...`}</span>
        <div style={{ marginLeft: 'auto' }}>My Computer</div>
      </div>
    </div>
  );
};

export default Browser;
