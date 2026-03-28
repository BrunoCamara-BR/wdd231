import { temples } from "../data/temples.js";
import { url } from "../data/temples.js";

const showHere = document.querySelector("#showHere");
const mydialog = document.querySelector("#mydialog");
const h2 = document.querySelector("#mydialog div h2");
const button = document.querySelector("#mydialog div button");
const p = document.querySelector("#mydialog p");

button.addEventListener("click", () => mydialog.close());

function displayItems(data) {
  data.forEach((element) => {
    const img = document.createElement("img");
    img.src = `${url}${element.path}`;
    img.alt = `${element.name}`;
    img.addEventListener("click", () => showStuff(element));

    showHere.appendChild(img);
  });
}

displayItems(temples);

function showStuff(element) {
  h2.innerHTML = element.name;
  p.innerHTML = `Dedicated ${element.dedicated} by ${element.person}.`;

  mydialog.showModal();
}
