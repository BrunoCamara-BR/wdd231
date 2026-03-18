const footer = document.querySelector("footer");
const footerP = document.createElement("p");
const infoCopyright = document.createElement("span");
const infoLastModified = document.createElement("span");
const today = new Date();

infoCopyright.textContent = `© ${today.toLocaleDateString("en-US")} | Bruno Câmara dos Santos |`;
footerP.appendChild(infoCopyright);
infoLastModified.innerHTML = `Updated: <strong>${document.lastModified}</strong>`;
footerP.appendChild(infoLastModified);
footer.appendChild(footerP);
