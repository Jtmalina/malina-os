import React from 'react';

const profileText = `FILE: PROFILE.TXT
==================

NAME: Julian Malina
ROLE: Software Engineer / Creative Developer
DATE: May 23, 2026

SUMMARY:
--------
Passionate Software Engineer with a focus on building interactive, 
high-performance web applications. Expert in React, TypeScript, 
and modern frontend architecture, with a secondary love for 
retro UI and nostalgic user experiences.

TECHNICAL SKILLS:
-----------------
- Frontend: React, TypeScript, Vite, CSS Modules, HTML5 Canvas
- Testing: Vitest, React Testing Library, Happy DOM
- Workflow: Git, GitHub CLI, Vercel, CI/CD
- Creative: Game Dev (Godot), Retro UI Design

EXPERIENCE:
-----------
[Full professional history loaded from JulianMalinaResume2026.pdf]
- Built custom desktop environments for portfolio projects.
- Implemented complex state management for windowing systems.
- Developed interactive web-based games and productivity tools.

PERSONAL INTERESTS:
-------------------
Beyond the terminal, I'm fueled by a mix of high-energy activities 
and creative escapes:

- 🎵 Music & Festivals: There's nothing like the energy of a live 
  set. I'm a regular at music festivals and always looking for 
  new sounds.
- 🐕 Animals: Big fan of dogs and all things furry. If I'm not 
  coding, I'm probably hanging out with a four-legged friend.
- ✈️ Travel: I love exploring new cultures and terrains. Every 
  trip is a new perspective.
- 🏋️ Fitness: Keeping the mind sharp by keeping the body active. 
  Big on working out and staying consistent.

CONTACT:
--------
Use the "Address Book" on the desktop or reach out directly at:
jmalina7897@gmail.com`;

const AboutMe: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'white' }}>
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        fontSize: '11px', 
        padding: '2px 5px',
        backgroundColor: 'var(--win-gray)',
        borderBottom: '1px solid var(--win-dark-gray)',
        color: 'black',
        userSelect: 'none'
      }}>
        <span>File</span>
        <span>Edit</span>
        <span>Search</span>
        <span>Help</span>
      </div>
      <div 
        style={{ 
          flex: 1,
          padding: '10px', 
          whiteSpace: 'pre', 
          fontFamily: '"Courier New", Courier, monospace',
          fontSize: '13px',
          outline: 'none',
          overflowY: 'auto',
          color: 'black',
          backgroundColor: 'white'
        }} 
        contentEditable 
        suppressContentEditableWarning
      >
        {profileText}
      </div>
    </div>
  );
};

export default AboutMe;
