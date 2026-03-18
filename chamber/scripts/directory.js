const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");
const memberContainer = document.querySelector("#member-container");
const titleMode = document.querySelector("#current-mode");
let data = [];
let level = "";

const memberList = async (type) => {
  try {
    const src = "./data/members.json";
    const membersfetch = await fetch(src);
    const jsonData = await membersfetch.json();
    data = await jsonData.members;
    if (type == "grid") {
      gridCardBuilder();
    } else {
      ListCardBuilder();
    }
  } catch (error) {
    console.log(error);
  }
};

// show Grid
gridButton.addEventListener("click", (e) => {
  e.preventDefault();
  titleMode.textContent = "GRID";
  memberContainer.classList.add("grid");
  memberList("grid");
});

// show List
listButton.addEventListener("click", (e) => {
  e.preventDefault();
  titleMode.textContent = "LIST";
  memberContainer.classList.remove("grid");
  memberList("list");
});

function gridCardBuilder() {
  memberContainer.innerHTML = "";
  data.forEach((member) => {
    const section = document.createElement("section");
    section.setAttribute("class", "card");

    const figure = document.createElement("figure");

    // building div
    const div = document.createElement("div");
    div.classList.add("class", "trapeze");

    // building img level
    const imgLevel = document.createElement("img");

    if (member.level == 3) {
      level = "gold";
      div.classList.add("class", "gold");
    } else if (member.level == 2) {
      level = "silver";
      div.classList.add("class", "silver");
    } else {
      level = "member";
      div.classList.add("class", "member");
    }
    imgLevel.setAttribute("src", `images/${level}.svg`);
    imgLevel.setAttribute("alt", `${level}`);
    imgLevel.setAttribute("aria-label", `level ${level}`);
    imgLevel.setAttribute("width", "22");
    imgLevel.setAttribute("height", "22");
    div.appendChild(imgLevel);

    // building span
    const span = document.createElement("span");
    span.textContent = level.toUpperCase();
    div.appendChild(span);
    figure.appendChild(div);

    // building img business
    const imgBusiness = document.createElement("img");
    imgBusiness.setAttribute("src", member.imageURL);
    imgBusiness.setAttribute("alt", `${member.name} main photo`);
    imgBusiness.setAttribute("loading", "lazy");
    imgBusiness.setAttribute("width", "200");
    imgBusiness.setAttribute("height", "160");
    figure.appendChild(imgBusiness);

    // building figcaption
    const figcaption = document.createElement("figcaption");
    figcaption.innerHTML = `<strong>${member.name}</strong><br />`;
    figure.appendChild(figcaption);
    section.appendChild(figure);

    // buildind descriptions
    const descriptionList = document.createElement("dl");
    descriptionList.innerHTML = `
    <dt>Phone</dt>
    <dd> ${member.phone}</dd>
     <dt>Address</dt>
    <dd> ${member.address}</dd>
    <dt>Website</dt>
    <dd><a href="${member.website}" target="_blank">${member.website}</a></dd>
    <dt>Description</dt>
    <dd>${member.description}</dd>`;

    section.appendChild(descriptionList);

    memberContainer.appendChild(section);
  });
}

function ListCardBuilder() {
  memberContainer.innerHTML = "";
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  const tbody = document.createElement("tbody");

  tr.innerHTML = `
  <th class="businessName">Business Name</th>
  <th class="phone">Phone</th>
  <th class="address">Address</th>
  <th class="website">Website</th>`;
  thead.appendChild(tr);
  table.appendChild(thead);
  table.appendChild(tbody);

  data.forEach((member) => {
    let cardInfoRow = document.createElement("tr");
    cardInfoRow.setAttribute("class", "main-row");
    let descriptionRow = document.createElement("tr");
    if (member.level == 3) {
      level = "gold";
    } else if (member.level == 2) {
      level = "silver";
    } else {
      level = "member";
    }

    // building div
    const div = document.createElement("div");
    div.setAttribute("class", "trapeze");

    // building img level
    const imgLevel = document.createElement("img");

    if (member.level == 3) {
      level = "gold";
      div.classList.add("class", "gold");
    } else if (member.level == 2) {
      level = "silver";
      div.classList.add("class", "silver");
    } else {
      level = "member";
      div.classList.add("class", "member");
    }
    imgLevel.setAttribute("src", `images/${level}.svg`);
    imgLevel.setAttribute("alt", `${level}`);
    imgLevel.setAttribute("aria-label", `level ${level}`);
    imgLevel.setAttribute("width", "22");
    imgLevel.setAttribute("height", "22");
    div.appendChild(imgLevel);

    // building span
    const span = document.createElement("span");
    span.textContent = level.toUpperCase();
    div.appendChild(span);

    cardInfoRow.innerHTML = `
                  </td>
                <td>${div.outerHTML}<p>${member.name}</p></td>
                <td>${member.phone}</td>
                <td>${member.address}</td>
                <td>
                  <a href="${member.website}" target="_blank"
                    ><img src="images/link.svg" alt="" width="20" height="20"
                  /></a>
                </td>`;

    descriptionRow.innerHTML = `
                <td colspan="5" class="description-row">
                  ${member.description}
                </td>
              `;
    tbody.appendChild(cardInfoRow);
    tbody.appendChild(descriptionRow);
  });

  memberContainer.appendChild(table);
}

memberList("grid");
