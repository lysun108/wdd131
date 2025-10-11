// scripts/last-updated.js
// Updates a <time id="last-updated"> element with the current date
// Adds machine-readable datetime via the datetime attribute.
// Usage in HTML (place before closing </body>):
//   <script src="scripts/last-updated.js" defer></script>
(function(){
  function updateLastUpdated(){
    var el = document.getElementById('last-updated');
    if(!el) return;
    var now = new Date();
    el.setAttribute('datetime', now.toISOString());
    // e.g., "Oct 10, 2025" (uses browser locale)
    el.textContent = now.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateLastUpdated);
  } else {
    updateLastUpdated();
  }
})();
