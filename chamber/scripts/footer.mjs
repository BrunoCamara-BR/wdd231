const footer = document.querySelector("footer");
const footerP = document.createElement("p");
const infoCopyright = document.createElement("span");
const infoLastModified = document.createElement("span");
const today = new Date();
const mainFooterInfo = document.createElement("div");

infoCopyright.textContent = `© ${today.toLocaleDateString("en-US")} | Bruno Câmara dos Santos |`;
footerP.appendChild(infoCopyright);
infoLastModified.innerHTML = ` Updated: <strong>${document.lastModified}</strong>`;
footerP.appendChild(infoLastModified);
mainFooterInfo.classList.add("infoCopyright");
mainFooterInfo.appendChild(footerP);
footer.appendChild(mainFooterInfo);
