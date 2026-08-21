# AGENTS.md

## Project overview

This repository contains a browser-based tic-tac-toe game built with React 19, TypeScript, and Vite. The game supports alternating X/O turns, winner detection, and navigation through the complete move history.

## Project structure

- `index.html` is the Vite application shell.
- `src/index.tsx` is the application entry point and mounts the game.
- `src/components/Game.tsx` owns game state, move history, time travel, and winner calculation.
- `src/components/Board.tsx` renders the board and its squares.
- `src/gameTypes.ts` contains shared game-state types.
- `src/components/Game.css` and `src/index.css` contain the application styles.
- `src/Game.test.tsx` contains the behavior tests.
- `public/` contains static assets copied into the production build.
- `public/service-worker.js` retires the service worker and cache from the previous Create React App deployment.
- `assets/` contains images used by the README.
- `build/` is generated deployment output; do not edit it by hand.

## Setup and commands

Use Node.js 24 when possible and install the locked dependencies with npm.

```sh
npm ci
npm start
npm run typecheck
npm test
npm run build
```

- `npm start` runs the local development server.
- `npm run typecheck` checks the TypeScript project without emitting files.
- `npm test` runs the Vitest suite once.
- `npm run test:watch` runs Vitest in watch mode.
- `npm run build` creates the production bundle in `build/`.
- `npm run deploy` publishes `build/` to GitHub Pages; run it only when explicitly requested.

## Implementation guidelines

- Preserve the existing React class-component style unless a task explicitly calls for modernization.
- Keep game state in `Game`; keep `Board` and squares focused on rendering and click handling.
- Treat state as immutable. Copy `history` and `squares` before modifying them.
- Keep board positions represented as a nine-element array containing `"X"`, `"O"`, or `null`.
- Do not allow a move on an occupied square or after a winner has been found.
- When a player jumps to an earlier move and then plays, replace the future branch by slicing history through the selected step before appending the new move.
- Keep `stepNumber` and `xIsNext` synchronized when moving through history.
- Prefer small, targeted changes and avoid unrelated dependency upgrades or broad formatting rewrites.
- Follow the formatting conventions of the file being edited; this legacy codebase currently contains mixed quote styles.

## Testing and verification

- Add or update tests for behavior changes, especially winner detection, invalid moves, turn order, and history branching.
- Run the type-checker and test suite after changing TypeScript behavior.
- Run a production build after changing application code, dependencies, or build configuration.
- For UI changes, manually verify board interaction, winner status, keyboard focus, and history navigation.

## Repository hygiene

- Do not commit `node_modules/` or its cache files.
- Do not hand-edit hashed files under `build/assets/`; regenerate them with `npm run build` only when updated build artifacts are part of the requested work.
- Preserve unrelated working-tree changes.
- Never deploy, rewrite Git history, or remove user files unless explicitly requested.
