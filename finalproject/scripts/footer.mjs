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

const attributionLink = document.createElement("a");
attributionLink.href = "attributions.html";
attributionLink.textContent = "Attributions";
attributionLink.classList.add("link");
const youtubeLink = document.createElement("a");
youtubeLink.href = "www.youtube.com";
youtubeLink.textContent = "Demonstration";
youtubeLink.classList.add("link");
const links = document.createElement("div");
links.classList.add("flex-links");

links.appendChild(attributionLink);
links.appendChild(youtubeLink);
flex.appendChild(links);

flex.appendChild(social);

// profile image
const profileImg = document.createElement("img");

profileImg.src = "images/profile.jpg";
profileImg.alt = "Photo of Bruno Câmara dos Santos";
profileImg.width = 64;
profileImg.height = 64;
profileImg.loading = "lazy";

profileImg.classList.add("footer-profile");

const profileContainer = document.createElement("div");
profileContainer.classList.add("footer-profile");

profileContainer.appendChild(profileImg);

flex.appendChild(profileContainer);
footer.appendChild(flex);
