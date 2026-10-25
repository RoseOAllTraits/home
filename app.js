const status = document.querySelector('#connection-status');
const statusWrap = status?.closest('.status');
function updateConnection() {
  if (!status || !statusWrap) return;
  const online = navigator.onLine;
  status.textContent = online ? 'Ready to explore' : 'Hub available offline';
  statusWrap.classList.toggle('offline', !online);
}
window.addEventListener('online', updateConnection);
window.addEventListener('offline', updateConnection);
updateConnection();

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').catch((error) => {
      console.warn('Offline support could not be enabled:', error);
    });
  }, { once: true });
}
