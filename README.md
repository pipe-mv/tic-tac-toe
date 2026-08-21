# Tic-Tac-Toe

This repository contains a tic-tac-toe game built with React, TypeScript, and Vite. You can see it running [here](https://pipe-mv.github.io/tic-tac-toe/).


* Lets you play tic-tac-toe.
* Indicates when one player has won the game.
* Stores the history of moves made throughout the game.

### Setting Up

* Fork or clone this repository.

* Install the locked dependencies with `npm ci`.

* Run the development server with `npm start`.

* Check the TypeScript types with `npm run typecheck`.

* Run the tests with `npm test` and create a production build with `npm run build`.

Note that the moves past the one you jump to do not need to disappear off the list. That is to say, from a board that looks like this:

![board](assets/board.png)

Clicking on `Move #1` causes the board to jump back in time to Move #1, but the move list has not changed.

![board 2](assets/board2.png)

However, from there, the game can be played and new moves can then be overwritten in its history.

![board 3](assets/board3.png)

Try it yourself in the solution link above.


### Hints

- In the code, a "move" is also referred to as a "step."
