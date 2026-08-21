import { createRoot } from 'react-dom/client';
import Game from './components/Game';
import { unregisterServiceWorker } from './unregisterServiceWorker';
import './index.css';

window.addEventListener('mousedown', function() {
  document.body.classList.add('mouse-navigation');
  document.body.classList.remove('kbd-navigation');
});

window.addEventListener('keydown', function(event) {
  if (event.key === 'Tab') {
    document.body.classList.add('kbd-navigation');
    document.body.classList.remove('mouse-navigation');
  }
});

window.addEventListener('click', function(event) {
  if (
    event.target instanceof HTMLAnchorElement &&
    event.target.getAttribute('href') === '#'
  ) {
    event.preventDefault();
  }
});

function appendError(text: string) {
  const errors = document.getElementById('errors');
  if (errors) {
    errors.textContent += text + '\n';
  }
}

window.onerror = function(message, source, line, col, error) {
  const text = error
    ? String(error.stack || error)
    : message + ' (at ' + source + ':' + line + ':' + col + ')';
  appendError(text);
};

console.error = (function(old) {
  return function error(...args: unknown[]) {
    appendError(args.join(' '));
    old.apply(console, args);
  };
})(console.error);

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Unable to find the application root element.');
}

const root = createRoot(rootElement);
root.render(<Game />);
unregisterServiceWorker();
