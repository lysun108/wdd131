// temples.js
// Footer dynamic year and last modified
const yearSpan = document.getElementById('currentyear');
const lastModSpan = document.getElementById('lastModified');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();
if (lastModSpan) lastModSpan.textContent = new Date(document.lastModified).toLocaleString();

// Hamburger menu
const menuBtn = document.getElementById('menu');
const header = document.querySelector('.site-header');
const nav = document.getElementById('primary-nav');

if (menuBtn && header && nav) {
  menuBtn.addEventListener('click', () => {
    const isOpen = header.classList.toggle('nav-open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    menuBtn.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    menuBtn.textContent = isOpen ? '✕' : '☰';
  });
}

// Data set of temples (example data; replace images with real temple photos later)
const temples = [
  { name: "Salt Lake Temple", location: "Salt Lake City, Utah", dedicated: 1893, area: 253015, img: "https://placehold.co/800x600?text=Salt+Lake+Temple" },
  { name: "Laie Hawaii Temple", location: "Laie, Hawaii", dedicated: 1919, area: 42775, img: "https://placehold.co/800x600?text=Laie+Hawaii+Temple" },
  { name: "Mesa Arizona Temple", location: "Mesa, Arizona", dedicated: 1927, area: 75000, img: "https://placehold.co/800x600?text=Mesa+Arizona+Temple" },
  { name: "Los Angeles California Temple", location: "Los Angeles, California", dedicated: 1956, area: 190614, img: "https://placehold.co/800x600?text=Los+Angeles+Temple" },
  { name: "Oakland California Temple", location: "Oakland, California", dedicated: 1964, area: 80437, img: "https://placehold.co/800x600?text=Oakland+Temple" },
  { name: "Provo Utah Temple", location: "Provo, Utah", dedicated: 1972, area: 130825, img: "https://placehold.co/800x600?text=Provo+Temple" },
  { name: "Hong Kong China Temple", location: "Hong Kong, China", dedicated: 1996, area: 51980, img: "https://placehold.co/800x600?text=Hong+Kong+Temple" },
  { name: "Rome Italy Temple", location: "Rome, Italy", dedicated: 2019, area: 41010, img: "https://placehold.co/800x600?text=Rome+Temple" },
  { name: "Yigo Guam Temple", location: "Yigo, Guam", dedicated: 2020, area: 6861, img: "https://placehold.co/800x600?text=Yigo+Guam+Temple" },
];

// Render function
function renderAlbum(list) {
  const album = document.getElementById('album');
  if (!album) return;
  album.innerHTML = '';
  list.forEach(t => {
    const fig = document.createElement('figure');
    fig.className = 'card';
    fig.dataset.dedicated = t.dedicated;
    fig.dataset.area = t.area;
    fig.innerHTML = `
      <img src="${t.img}" alt="${t.name}">
      <figcaption>
        <p class="title">${t.name}</p>
        <p class="meta">${t.location} • Dedicated ${t.dedicated} • ${t.area.toLocaleString()} sq ft</p>
      </figcaption>
    `;
    album.appendChild(fig);
  });
}

renderAlbum(temples);

// Nav filtering
function setActive(link) {
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  link.classList.add('active');
}

function filterTemples(type) {
  switch (type) {
    case 'old':
      return temples.filter(t => t.dedicated < 1900);
    case 'new':
      return temples.filter(t => t.dedicated >= 2000);
    case 'large':
      return temples.filter(t => t.area >= 90000);
    case 'small':
      return temples.filter(t => t.area < 10000);
    default:
      return temples;
  }
}

document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const type = a.dataset.filter || 'home';
    setActive(a);
    renderAlbum(filterTemples(type));
    // Close mobile nav after selection
    if (header.classList.contains('nav-open')) {
      header.classList.remove('nav-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Open navigation');
      menuBtn.textContent = '☰';
    }
  });
});