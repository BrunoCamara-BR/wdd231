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
    div.classList.add("trapeze");

    if (member.level == 3) {
      level = "gold";
      div.classList.add("gold");
      div.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"/></svg>`;
    } else if (member.level == 2) {
      level = "silver";
      div.classList.add("silver");
      div.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"/></svg>`;
    } else {
      level = "member";
      div.classList.add("member");
      div.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM304 384L336 384C362.5 384 384 405.5 384 432L384 528L256 528L256 432C256 405.5 277.5 384 304 384z"/></svg>`;
    }

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
    imgBusiness.setAttribute("height", "200");
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

    // building div
    const div = document.createElement("div");
    div.setAttribute("class", "trapeze");

    if (member.level == 3) {
      level = "gold";
      div.classList.add("gold");
      div.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"/></svg>`;
    } else if (member.level == 2) {
      level = "silver";
      div.classList.add("silver");
      div.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"/></svg>`;
    } else {
      level = "member";
      div.classList.add("member");
      div.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM304 384L336 384C362.5 384 384 405.5 384 432L384 528L256 528L256 432C256 405.5 277.5 384 304 384z"/></svg>`;
    }

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
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path opacity=".4" fill="currentColor" d="M64 240C64 195.8 99.8 160 144 160L224 160C241.7 160 256 174.3 256 192C256 209.7 241.7 224 224 224L144 224C135.2 224 128 231.2 128 240L128 496C128 504.8 135.2 512 144 512L400 512C408.8 512 416 504.8 416 496L416 416C416 398.3 430.3 384 448 384C465.7 384 480 398.3 480 416L480 496C480 540.2 444.2 576 400 576L144 576C99.8 576 64 540.2 64 496L64 240z"/><path fill="currentColor" d="M352 96C352 78.3 366.3 64 384 64L544 64C561.7 64 576 78.3 576 96L576 256C576 273.7 561.7 288 544 288C526.3 288 512 273.7 512 256L512 173.3L310.6 374.7C298.1 387.2 277.8 387.2 265.3 374.7C252.8 362.2 252.8 341.9 265.3 329.4L466.7 128L384 128C366.3 128 352 113.7 352 96z"/></svg></a>
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
