# AGENTS.md

## Project overview

This repository contains a browser-based tic-tac-toe game built with React 16 and Create React App. The game supports alternating X/O turns, winner detection, and navigation through the complete move history.

## Project structure

- `src/index.js` is the application entry point and mounts the game.
- `src/components/Game.js` owns game state, move history, time travel, and winner calculation.
- `src/components/Board.js` renders the board and its squares.
- `src/components/Game.css` and `src/index.css` contain the application styles.
- `src/Game.test.js` contains the existing smoke test.
- `public/` contains the static application shell.
- `assets/` contains images used by the README.
- `build/` is generated deployment output; do not edit it by hand.

## Setup and commands

Use the npm version compatible with the existing lockfile and legacy dependencies.

```sh
npm install
npm start
npm test -- --runInBand
npm run build
```

- `npm start` runs the local development server.
- `npm test -- --runInBand` runs the test suite once in a non-interactive environment.
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
- Run the test suite after changing JavaScript behavior.
- Run a production build after changing application code, dependencies, or build configuration.
- For UI changes, manually verify board interaction, winner status, keyboard focus, and history navigation.
- The current smoke test imports `./Game`, while the component lives at `src/components/Game.js`; account for this existing mismatch when working on tests.

## Repository hygiene

- Do not commit `node_modules/` or its cache files.
- Do not hand-edit hashed files under `build/static/`; regenerate them with `npm run build` only when updated build artifacts are part of the requested work.
- Preserve unrelated working-tree changes.
- Never deploy, rewrite Git history, or remove user files unless explicitly requested.
