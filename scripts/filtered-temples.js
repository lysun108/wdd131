// ===== scripts/filtered-temples.js =====
/* Temple data: at least 10 items (includes + additions). Absolute CDN image URLs. */
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  // Added
  {
    templeName: "Salt Lake",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-1090.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-3547.jpg"
  },
  {
    templeName: "Hong Kong China",
    location: "Hong Kong, China",
    dedicated: "1996, May, 26",
    area: 51980,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/hong-kong-china-temple/hong-kong-china-temple-28222.jpg"
  },
  {
    templeName: "Laie Hawaii",
    location: "Laie, Hawaii, United States",
    dedicated: "1919, November, 27",
    area: 42775,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/laie-hawaii-temple/laie-hawaii-temple-35267.jpg"
  },
  {
    templeName: "Provo Utah",
    location: "Provo, Utah, United States",
    dedicated: "1972, February, 9",
    area: 130825,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/provo-utah-rock-canyon-temple/provo-utah-rock-canyon-temple-45342.jpg"
  }
];

// Utilities
const getYear = (dedicatedStr) => {
  const y = Number(String(dedicatedStr).trim().slice(0,4));
  return Number.isFinite(y) ? y : NaN;
};

// DOM refs
const album = document.querySelector('#album');
const nav = document.querySelector('#primary-nav');
const menuBtn = document.querySelector('#menu');
const currentYearSpan = document.querySelector('#currentyear');
const lastModifiedSpan = document.querySelector('#lastModified');

// Render
function cardTemplate(t) {
  const year = getYear(t.dedicated);
  const fig = document.createElement('figure');
  fig.className = 'card';
  fig.innerHTML = `
    <img src="${t.imageUrl}" alt="${t.templeName}" loading="lazy" width="800" height="500">
    <figcaption>
      <p class="title">${t.templeName}</p>
      <p class="meta">${t.location} • Dedicated ${year} • ${t.area.toLocaleString()} sq ft</p>
    </figcaption>
  `;
  return fig;
}

function render(list) {
  album.innerHTML = '';
  const fragment = document.createDocumentFragment();
  list.forEach(t => fragment.appendChild(cardTemplate(t)));
  album.appendChild(fragment);
}

// Filters
const filters = {
  home: () => temples,
  old: () => temples.filter(t => getYear(t.dedicated) < 1900),
  new: () => temples.filter(t => getYear(t.dedicated) > 2000),
  large: () => temples.filter(t => t.area > 90000),
  small: () => temples.filter(t => t.area < 10000),
};

// Nav interactions
nav.addEventListener('click', (e) => {
  const a = e.target.closest('a[data-filter]');
  if (!a) return;
  e.preventDefault();
  // active state
  nav.querySelectorAll('a').forEach(el => el.classList.toggle('active', el === a));
  const key = a.dataset.filter;
  const list = (filters[key] || filters.home)();
  render(list);
  // close mobile menu after selection
  document.body.classList.remove('nav-open');
  menuBtn.setAttribute('aria-expanded', 'false');
});

// Hamburger
menuBtn.addEventListener('click', () => {
  const open = document.body.classList.toggle('nav-open');
  menuBtn.setAttribute('aria-expanded', String(open));
});

// Footer info
currentYearSpan.textContent = new Date().getFullYear();
lastModifiedSpan.textContent = document.lastModified;

// Initial render
render(temples);
