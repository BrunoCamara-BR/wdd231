import { places } from "./places.mjs";
const gridCards = document.querySelector("#discover-cards");

function buildGridCards() {
  places.forEach((place) => {
    const section = document.createElement("section");

    const h2 = document.createElement("h2");
    h2.textContent = `${place.placeName}`;
    section.appendChild(h2);

    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = `./images/places/${place.photoUrl}`;
    img.alt = `${place.photoUrl}'s photo`;
    // if (place.placeName == "Lagoa Paulino") {
    //   img.loading = "eager";
    //   img.fetchPriority = "high";
    // } else {
    // }
    img.loading = "lazy";
    img.width = "280";
    img.height = "186";
    figure.appendChild(img);
    section.appendChild(figure);

    const address = document.createElement("address");
    address.textContent = `${place.address}`;
    section.appendChild(address);

    const description = document.createElement("p");
    description.textContent = `${place.description}`;
    section.appendChild(description);

    const learMoreButton = document.createElement("button");
    learMoreButton.addEventListener("click", () => {
      window.open(`${place.site}`, "_blank");
    });

    learMoreButton.textContent = "Learn More";
    section.appendChild(learMoreButton);

    gridCards.appendChild(section);
  });
}

buildGridCards();
