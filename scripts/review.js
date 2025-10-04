// Review confirmation page: show submitted values and increment counter
const products = [
  { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
  { id: "fc-2050", name: "power laces", averagerating: 4.7 },
  { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
  { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
  { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
];

function idToName(id){
  const p = products.find(p => p.id === id);
  return p ? p.name : id;
}

function getAllParams(){
  const usp = new URLSearchParams(window.location.search);
  const all = Object.fromEntries(usp.entries());

  // 'features' (checkboxes) may appear multiple times; collect them
  const features = [];
  usp.forEach((value, key) => {
    if (key === 'features') features.push(value);
  });
  if (features.length) all.features = features;

  return all;
}

function renderDetails(){
  const details = document.querySelector('#reviewDetails');
  const p = getAllParams();

  const rows = [
    ['Product', idToName(p.product)],
    ['Rating', p.rating || '—'],
    ['Install Date', p.installDate || '—'],
    ['Features', Array.isArray(p.features) ? p.features.join(', ') : (p.features || '—')],
    ['Written Review', p.writtenReview || '—'],
    ['Your Name', p.userName || '—'],
  ];

  rows.forEach(([dt, dd]) => {
    const dtEl = document.createElement('dt');
    dtEl.textContent = dt;
    const ddEl = document.createElement('dd');
    ddEl.textContent = dd;
    details.append(dtEl, ddEl);
  });
}

function incrementCounter(){
  const key = 'reviewCount';
  const current = Number(localStorage.getItem(key) || 0) + 1;
  localStorage.setItem(key, String(current));
  const ct = document.querySelector('#counterText strong');
  if (ct) ct.textContent = current;
}

function setYear(){
  const y = document.querySelectorAll('#year');
  y.forEach(el => el.textContent = new Date().getFullYear());
}

document.addEventListener('DOMContentLoaded', () => {
  renderDetails();
  incrementCounter();
  setYear();
  setLastModified();
});

function setLastModified(){
  const el = document.querySelector('#lastmod');
  if (el) el.textContent = document.lastModified;
}

