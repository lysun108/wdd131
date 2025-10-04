// WDD 131 · Week 05 · Product Review Form
// Populate the product <select> and set footer year.
// Also ensure date input can't pick future dates (max set in HTML).

const products = [
  { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
  { id: "fc-2050", name: "power laces", averagerating: 4.7 },
  { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
  { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
  { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
];

function populateProducts(){
  const select = document.querySelector('#productName');
  products.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;           // value uses the product id (per Step 4 spec)
    opt.textContent = p.name;   // visible text is the product name
    select.appendChild(opt);
  });
}

function setYear(){
  const y = document.querySelectorAll('#year');
  y.forEach(el => el.textContent = new Date().getFullYear());
}

document.addEventListener('DOMContentLoaded', () => {
  populateProducts();
  setYear();
  setLastModified();
});

function setLastModified(){
  const el = document.querySelector('#lastmod');
  if (el) el.textContent = document.lastModified;
}

