const url =
  "https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json";
const cards = document.querySelector("#cards");

const getPhophetData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.table(data.prophets);
    displayProphets(data.prophets);
  } catch (error) {
    console.log(error);
  }
};

const displayProphets = (prophets) => {
  // building
  prophets.forEach((prophet) => {
    let card = document.createElement("section");
    let fullName = document.createElement("h2");
    let portrait = document.createElement("img");
    let birthInfo = document.createElement("p");

    fullName.textContent = prophet.name;
    portrait.setAttribute("src", prophet.imageurl);
    portrait.setAttribute("alt", `${prophet.name} photo`);
    portrait.setAttribute("loading", "lazy");
    portrait.setAttribute("width", "340");
    portrait.setAttribute("height", "440");
    birthInfo.innerHTML = `Date of the birth: ${prophet.birthdate} <br> place of birth: ${prophet.birthplace} `;

    card.appendChild(fullName);
    card.appendChild(birthInfo);
    card.appendChild(portrait);

    cards.appendChild(card);
  });
};

getPhophetData();
