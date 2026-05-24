import React from 'react';

const MediaPlayer: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#000', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, position: 'relative' }}>
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/MXhQbF7TlbA?autoplay=1"
          title="Marathon Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div style={{ 
        height: '40px', 
        backgroundColor: 'var(--win-gray)', 
        borderTop: '2px solid var(--win-white)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
        gap: '10px'
      }}>
        <button style={{ width: '30px', height: '20px' }}>▶</button>
        <button style={{ width: '30px', height: '20px' }}>⏸</button>
        <div className="inset" style={{ flex: 1, height: '15px', backgroundColor: '#000' }}></div>
      </div>
    </div>
  );
};

export default MediaPlayer;
