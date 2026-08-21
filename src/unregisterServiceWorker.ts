export function unregisterServiceWorker(): void {
  if ('serviceWorker' in navigator) {
    void navigator.serviceWorker.ready.then((registration) => {
      void registration.unregister();
    });
  }
}
