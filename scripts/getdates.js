// Copyright year
const y = document.getElementById("currentyear");
if (y) y.textContent = new Date().getFullYear();

// Last modified
const lm = document.getElementById("lastModified");
if (lm) lm.textContent = `Last Modification: ${document.lastModified}`;
