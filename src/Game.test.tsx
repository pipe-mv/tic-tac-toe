import React, { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import Game from './components/Game';

declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean;
}

let container: HTMLDivElement;
let root: Root;

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  act(() => {
    root.render(<Game />);
  });
});

afterEach(() => {
  act(() => {
    root.unmount();
  });
  document.body.removeChild(container);
});

function squares(): NodeListOf<HTMLButtonElement> {
  return container.querySelectorAll<HTMLButtonElement>('.square');
}

function status(): string {
  const statusElement = container.querySelector<HTMLElement>('.game-info > div');
  if (!statusElement) {
    throw new Error('Unable to find the game status.');
  }
  return statusElement.textContent || '';
}

function clickSquare(index: number): void {
  act(() => {
    squares()[index].click();
  });
}

it('renders the initial game state', () => {
  expect(squares().length).toBe(9);
  expect(status()).toBe('Next player: X');
});

it('alternates turns and ignores occupied squares', () => {
  clickSquare(0);
  expect(squares()[0].textContent).toBe('X');
  expect(status()).toBe('Next player: O');

  clickSquare(0);
  expect(squares()[0].textContent).toBe('X');
  expect(status()).toBe('Next player: O');

  clickSquare(1);
  expect(squares()[1].textContent).toBe('O');
  expect(status()).toBe('Next player: X');
});

it('detects a winner and prevents further moves', () => {
  [0, 3, 1, 4, 2].forEach(clickSquare);

  expect(status()).toBe('Winner: X');
  clickSquare(8);
  expect(squares()[8].textContent).toBe('');
  expect(status()).toBe('Winner: X');
});

it('replaces future history after jumping back and playing again', () => {
  clickSquare(0);
  clickSquare(1);
  clickSquare(2);

  const moveOne = container.querySelectorAll<HTMLAnchorElement>('.move')[1];
  act(() => {
    moveOne.click();
  });
  expect(status()).toBe('Next player: O');

  clickSquare(4);

  expect(squares()[0].textContent).toBe('X');
  expect(squares()[1].textContent).toBe('');
  expect(squares()[2].textContent).toBe('');
  expect(squares()[4].textContent).toBe('O');
  expect(container.querySelectorAll('.move').length).toBe(3);
});
