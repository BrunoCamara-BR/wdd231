import { social } from "./social.mjs";

const footer = document.querySelector("footer");
const footerP = document.createElement("p");
const infoCopyright = document.createElement("span");
const infoLastModified = document.createElement("span");
const mainFooterInfo = document.createElement("div");
const today = new Date();

const flex = document.createElement("div");
flex.classList.add("flex");

infoCopyright.textContent = `© ${today.toLocaleDateString("en-US")} | Bruno Câmara dos Santos | Minas Gerais, Brazil |`;
footerP.appendChild(infoCopyright);
infoLastModified.innerHTML = ` Updated: <strong>${document.lastModified}</strong>`;
footerP.appendChild(infoLastModified);
mainFooterInfo.classList.add("infoCopyright");
mainFooterInfo.appendChild(footerP);
flex.appendChild(mainFooterInfo);

flex.appendChild(social);

footer.appendChild(flex);
