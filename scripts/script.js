// WDD131 Guangxi page — Yang Liao
const yearEl = document.querySelector('#year');
const lmEl = document.querySelector('#last-modified');
yearEl.textContent = new Date().getFullYear();
lmEl.textContent = document.lastModified;

// Wind chill (°F, mph), using static numbers from the DOM
const tempF = parseFloat(document.querySelector('#temp').textContent);
const windMph = parseFloat(document.querySelector('#wind').textContent);
const out = document.querySelector('#windchill');

function calculateWindChill(T, V) {
  return Math.round((35.74 + 0.6215 * T - 35.75 * Math.pow(V, 0.16) + 0.4275 * T * Math.pow(V, 0.16)) * 10) / 10;
}

if (tempF <= 50 && windMph > 3) {
  out.textContent = calculateWindChill(tempF, windMph) + ' °F';
} else {
  out.textContent = 'N/A';
}
