import React from 'react';

const AboutMe: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        fontSize: '11px', 
        padding: '2px 5px',
        backgroundColor: 'var(--win-gray)',
        borderBottom: '1px solid var(--win-dark-gray)'
      }}>
        <span>File</span>
        <span>Edit</span>
        <span>Search</span>
        <span>Help</span>
      </div>
      <div style={{ 
        flex: 1,
        padding: '10px', 
        whiteSpace: 'pre-wrap', 
        fontFamily: 'monospace',
        fontSize: '12px',
        outline: 'none',
        overflowY: 'auto'
      }} contentEditable defaultValue="">
        File: ABOUT_ME.TXT
        ------------------
        
        Hi! I'm a software engineer passionate about 
        retro UI and modern tech.
        
        Skills:
        - React / TypeScript
        - Node.js
        - CSS (and bevels!)
        
        Current Focus: Building this Win95 portfolio.
      </div>
    </div>
  );
};

export default AboutMe;
