# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Malina-OS** — an interactive portfolio site themed as a Windows 95 desktop. The desktop, taskbar, Start menu, and windows are real UI; each "application" (Paint, Minesweeper, Solitaire, project showcases, etc.) is a React component rendered inside a draggable window. React 18 + TypeScript + Vite, styled with CSS Modules, tested with Vitest, deployed on Vercel.

Design docs: `GDD_Win95_Portfolio.pdf`, `TDD_Win95_Portfolio.pdf`. There is also a `GEMINI.md` with overlapping guidance (note: it states windows use `react-draggable`, which is outdated — see Windowing below).

## Commands

```bash
npm run dev          # Vite dev server
npm run build        # tsc -b (typecheck) then vite build
npm run lint         # eslint over the repo
npm test             # Vitest in watch mode
npm test -- --run    # single non-watch run (what CI uses)
npm run test:ui      # Vitest UI
npm run preview      # serve the production build
```

Run a single test file: `npm test -- --run src/apps/Minesweeper.test.tsx`
Run tests matching a name: `npm test -- --run -t "Expert"`

CI (`.github/workflows/ci.yml`) runs lint → `npm test -- --run` → build on every push/PR to `main`. Match it locally before pushing.

## Architecture

**`src/App.tsx` is the single source of truth.** It owns a `windows: WindowInfo[]` array where each entry declares an app's `id`, `title`, `icon` (emoji), pre-instantiated `content` (a React node), `defaultSize`, `initialPosition`, and `hideFromMenu`. The desktop icons, taskbar buttons, and Start menu items are all **derived** from this one array — there is no separate registry. Window lifecycle (`focusWindow`, `closeWindow`, `minimizeWindow`, `toggleWindow`) and z-index stacking (focused window gets `max(zIndex)+1`) live here too.

**Two component layers** (mirrors the Win95 metaphor):
- `src/components/` — the OS shell/chrome: `Window`, `Taskbar`, `StartMenu`, `DesktopIcon`, `BootScreen`, `ShutdownScreen`, `Dialog`, `ContextMenu`.
- `src/apps/` — the "installed applications" whose content fills a window.

**Apps are lazy-loaded.** Every app is a `React.lazy(() => import(...))` in `App.tsx`, rendered inside `<Suspense>`. Adding an app means adding both a lazy import and a `windows` array entry.

**Cross-app launching** goes through callbacks, not global state. Apps that open other windows receive `onLaunch={(id, data) => focusWindow(id, data)}` (e.g. `Projects` and the game showcases launch other apps; `Marathon`/`Zombies`/`NerfVR` also get `onClose`). `MediaPlayer` is special: `focusWindow('media-player', { videoUrl, title })` re-injects fresh `content` with that data so the same window can play different videos.

**`hideFromMenu` windows** (`media-player`, `portfolio-properties`, `settings`/Control Panel) are intentionally absent from the desktop and Start menu — they're only reachable programmatically (a right-click "Properties", a launch from another app). Don't "fix" their absence.

**Windowing is custom, not `react-draggable`.** `Window.tsx` implements its own drag/resize/maximize via manual mouse **and** touch handlers (`mousedown`/`touchstart` + window-level move/end listeners). `react-draggable` is used only for **desktop icons** in `App.tsx` (with marquee multi-select and Ctrl/Shift toggling).

**Persistence** is `localStorage` only: `desktopBgColor` (Control Panel) and `iconPositions` (dragged icon layout). No backend.

**System sounds** (`src/utils/sounds.ts`): `playSound(name)` plays remote-hosted Win95 audio clips (catbox.moe URLs) by constructing `new Audio()`. Autoplay-blocked failures are swallowed with a warning. Called on boot, window open/close/minimize, dialogs, etc.

## Styling conventions

- **CSS Modules per component** (`Foo.module.css` next to `Foo.tsx`) for isolation. Global styles and the design tokens live in `src/index.css`.
- Win95 palette is defined as CSS variables in `:root` — use them, don't hardcode: `--win-gray` (#c0c0c0), `--win-white`, `--win-dark-gray` (#808080), `--win-black`, `--win-teal` (#008080), `--win-blue`, `--win-blue-light`. Global `.bevel-out` / `.bevel-in` classes provide the classic raised/sunken border look.
- Maintain the retro fidelity (beveled borders, MS-Sans-style type, teal desktop). This is a hard requirement of the project, not a preference.

## Tests

Colocated as `*.test.tsx` beside the component. Vitest with `globals: true`, `happy-dom` environment, `src/setupTests.ts` (adds `@testing-library/jest-dom` and sets `window.IS_VITEST = true` as a test-env flag). Use React Testing Library + `fireEvent`/`user-event`.

## Workflow (from GEMINI.md)

- Work on a **feature branch**; never commit directly to `main`. Commit only after the user explicitly approves.
- Run `npm run lint` and `npm test` after changes.
- A new app = a `.tsx` + a `.module.css` in `src/apps`, plus its lazy import and `windows` entry in `App.tsx`.

## Deployment

Vercel SPA: `vercel.json` rewrites all routes to `/index.html`. Static images served from `public/pics/`.
