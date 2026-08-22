import { createRoot } from 'react-dom/client';
import Game from './components/Game';
import { unregisterServiceWorker } from './unregisterServiceWorker';
import './index.css';

window.addEventListener('mousedown', () => {
  document.body.classList.add('mouse-navigation');
  document.body.classList.remove('kbd-navigation');
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Tab') {
    document.body.classList.add('kbd-navigation');
    document.body.classList.remove('mouse-navigation');
  }
});

window.addEventListener('click', (event) => {
  if (
    event.target instanceof HTMLAnchorElement &&
    event.target.getAttribute('href') === '#'
  ) {
    event.preventDefault();
  }
});

const appendError = (text: string) => {
  const errors = document.getElementById('errors');
  if (errors) {
    errors.textContent += text + '\n';
  }
};

window.onerror = (message, source, line, col, error) => {
  const text = error
    ? String(error.stack || error)
    : `${message} (at ${source}:${line}:${col})`;
  appendError(text);
};

const originalConsoleError = console.error;
console.error = (...args: unknown[]) => {
  appendError(args.join(' '));
  originalConsoleError.apply(console, args);
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Unable to find the application root element.');
}

const root = createRoot(rootElement);
root.render(<Game />);
unregisterServiceWorker();
