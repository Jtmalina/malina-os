import React from 'react';

const profileText = `FILE: PROFILE.TXT
==================

NAME: Julian Malina
ROLE: Software Engineer
LOCATION: Altamont, NY

SUMMARY:
--------
Software Engineer with 6 years of experience specializing in 
multiplayer systems, SDKs, and backend architecture. Expert in 
C++, C#, Go, and cloud infrastructure (AWS/GCP), with a focus on 
scale, matchmaking, and networking.

This platform (Malina-OS) is an exploration into agentic 
coding—an experiment in human-AI collaborative engineering 
and high-fidelity UI reconstruction.

TECHNICAL SKILLS:
-----------------
- Languages: C++, C#, Go, Java, Python
- Tech: Unity, Unreal Engine, .NET, AWS, GCP, SQL
- Expertise: Multiplayer Networking, SDK Design, Anti-Cheat

EXPERIENCE:
-----------
Wolfjaw Studios | Software Engineer II | 2021 - Present
- Built matchmaking and server hosting SDKs for AAA studios.
- Developed anti-cheat systems supporting 300k+ concurrent users.
- Integrated multiplayer networking pipelines (e.g., Marathon).
- Migrated legacy tools to modern C#/.NET & cloud backends.

Northrop Grumman | Software Engineer | 2020 - 2021
- Developed real-time battlefield simulation tools.
- Modernized mission-critical systems using C++, ADA, and Qt.

PROJECTS & EXPERIMENTS:
-----------------------
- Agentic Coding: Sandbox for autonomous engineering.
- Anti-Cheat Tools: Scalable cloud telemetry pipelines.

PERSONAL INTERESTS:
-------------------
- 🎵 Music & Festivals: There's nothing like the energy of a live 
  set. Regular at music festivals and always hunting for new sounds.
- 🐕 Animals: Big fan of dogs and all things furry. Usually found 
  hanging out with a four-legged friend when not at the terminal.
- ✈️ Travel: Passionate about exploring new cultures and terrains. 
  Every trip is a new perspective.
- 🏋️ Fitness: Keeping the mind sharp by keeping the body active. 
  Consistent workouts and staying active.

EDUCATION:
----------
SUNY Buffalo | Combined BS/MS Computer Science Engineering | 2020`;

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
