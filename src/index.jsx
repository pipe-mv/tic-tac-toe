import React from 'react';
import { createRoot } from 'react-dom/client';
import Game from './components/Game';
import { unregister as unregisterServiceWorker } from './registerServiceWorker';
import './index.css';

window.addEventListener('mousedown', function(e) {
  document.body.classList.add('mouse-navigation');
  document.body.classList.remove('kbd-navigation');
});
window.addEventListener('keydown', function(e) {
  if (e.keyCode === 9) {
    document.body.classList.add('kbd-navigation');
    document.body.classList.remove('mouse-navigation');
  }
});
window.addEventListener('click', function(e) {
  if (e.target.tagName === 'A' && e.target.getAttribute('href') === '#') {
    e.preventDefault();
  }
});

function appendError(text) {
  document.getElementById('errors').textContent += text + '\n';
}

window.onerror = function(message, source, line, col, error) {
  var text = error ? error.stack || error : message + ' (at ' + source + ':' + line + ':' + col + ')';
  appendError(text);
};
console.error = (function(old) {
  return function error() {
    appendError(Array.prototype.slice.call(arguments).join(' '));
    old.apply(this, arguments);
  }
})(console.error);


const root = createRoot(document.getElementById('root'));
root.render(<Game />);
unregisterServiceWorker();
