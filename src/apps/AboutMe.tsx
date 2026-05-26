import React from 'react';

const profileText = `FILE: PROFILE.TXT
==================

NAME: Julian Malina
ROLE: Software Engineer
LOCATION: Altamont, NY
CONTACT: jmalina7897@gmail.com | (518) 951-9005

SUMMARY:
--------
Software Engineer with 6 years of professional experience, including 
4.5 years building multiplayer systems, SDKs, and backend tools for 
both AAA and smaller studios. Skilled in C++, C#, Go, and cloud 
infrastructure (AWS/GCP), with a focus on matchmaking, anti-cheat, 
and networking solutions at scale.

This portfolio (Malina-OS) serves as an exploration into agentic 
solutions for coding—an experiment in human-AI collaborative 
engineering and high-fidelity UI reconstruction.

TECHNICAL SKILLS:
-----------------
- Languages: C++, C#, Go, Java, Python
- Engines/Frameworks: Unity, Unreal Engine, .NET, WPF, Qt
- Networking/Cloud: AWS, GCP, SQL, REST APIs, Multiplayer Networking
- Operating Systems: Windows, Linux

EXPERIENCE:
-----------
Wolfjaw Studios | Software Engineer I & II | 2021 - Present
- Designed and implemented matchmaking and server hosting SDKs for 
  Unity and Unreal Engine, enabling integration across multiple 
  games and internal tech demos.
- Built cross-game anti-cheat systems and analytics tools that 
  supported 300k+ concurrent players at peak load.
- Developed and customized matchmaking algorithms to client 
  specifications, including integration into Nerf VR.
- Integrated third-party voice chat SDKs into multiplayer pipelines 
  (including work on Bungie's Marathon).
- Migrated legacy internal tools to modern C#/.NET and WPF 
  applications connected to GCP, AWS, and SQL.
- Facilitated design analysis sessions and ran internal playtests 
  to validate gameplay systems and technical solutions.

Northrop Grumman | Software Engineer | 2020 - 2021
- Developed internal tools supporting field hardware used in 
  real-time battlefield simulation systems for pilot training.
- Established company-wide standards for GitHub LFS.
- Modernized legacy mission-critical tools using C++, ADA, 
  and Qt Creator/Designer.

PROJECTS & EXPERIMENTS:
-----------------------
- Agentic Coding: This Malina-OS platform is a sandbox for 
  autonomous engineering and human-AI partnership.
- Anti-Cheat Tools: Scalable detection approaches leveraging 
  cloud-hosted telemetry pipelines.
- NerfVR Ultimate Championship: Full SDK integration and QA.

PERSONAL INTERESTS:
-------------------
- 🎵 Music & Festivals: Regular at music festivals and always 
  hunting for new electronic and live sets.
- 🐕 Animals: Big fan of dogs; usually found hanging out with a 
  furry friend when not at the terminal.
- ✈️ Travel: Passionate about exploring new cultures and terrains.
- 🏋️ Fitness: Keeping the mind sharp by staying active and consistent.

EDUCATION:
----------
SUNY Buffalo | Combined BS/MS in Computer Science Engineering | 2020`;

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
