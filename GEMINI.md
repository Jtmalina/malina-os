# Project Instructions: Windows 95 Portfolio (Malina-OS)

This document serves as the foundational mandate for all development work on the Windows 95-themed portfolio project.

## Project Overview
A nostalgic, interactive portfolio website that mimics the Windows 95 desktop environment. Built with React 18, TypeScript, and Vite.

## Core Mandates
- **Visual Fidelity:** Strictly adhere to the Windows 95 aesthetic (beveled borders, specific grey #c0c0c0, MS Sans Serif or similar typography).
- **Interactive Authenticity:** Mimic OS behaviors (double-click to open, window focus via z-index, taskbar persistence).
- **State Management:** Currently managed in `App.tsx`. Maintain the centralized window state to ensure consistency across the taskbar and desktop.

## Architectural Patterns
- **Component Structure:**
  - `src/components`: UI shell components (Taskbar, Window, StartMenu).
  - `src/apps`: Content-specific applications (Paint, Minesweeper, etc.).
- **Styling:** Use **CSS Modules** (`*.module.css`) to prevent style leakage and maintain component isolation.
- **Windowing:** Use `react-draggable` for window movement. Every "app" should be wrapped in the `Window` component when active.

## Development Workflow
1. **Research:** Map existing components and CSS variables before adding new features.
2. **Strategy:** Propose changes that respect the retro-aesthetic.
3. **Execution:**
   - Use `replace` for surgical edits.
   - Always run `npm run lint` and `npm test` after changes.
   - For new apps, create a `.tsx` and a `.module.css` file in `src/apps`.

## Tech Stack
- **Framework:** React 18 (TypeScript)
- **Build Tool:** Vite
- **Styling:** Vanilla CSS / CSS Modules
- **Testing:** Vitest + React Testing Library
- **Libraries:** `react-draggable`
