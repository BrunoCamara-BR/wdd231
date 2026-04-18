import { toggleAttendance } from "./update-members.mjs";
import { updateStatistic } from "./attendance.mjs";

const dialog = document.querySelector("#notesDialog");
const closeDialog = document.querySelector("#closeDialog");
const saveBtn = document.querySelector("#saveNotesBtn");

closeDialog.addEventListener("click", () => {
  dialog.close();
});

saveBtn.addEventListener("click", () => {
  if (!currentMember) return;

  const notes = document.querySelector("#dialogNotes").value;

  const key = `notes-${currentMember}`;
  localStorage.setItem(key, notes);

  dialog.close();
});

let currentMember = null;

// profile
export function profile(name) {
  let parts = [];
  parts = name.split(" ");
  return (
    parts[0].charAt(0).toUpperCase() +
    parts[parts.length - 1].charAt(0).toUpperCase()
  );
}

// construir tabela
export function buildTable(MembersData, indexDay) {
  const table = document.createElement("table");
  const tbody = document.createElement("tbody");

  MembersData.forEach((member) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
              <td class="profile">
                <div class="round"><p id="member">${profile(member.fullName)}</p></div>
              </td>
              <td class="col-member-name">
                ${member.fullName} <br /><span>${member.organization}</span>
              </td>`;

    const notes = document.createElement("td");
    notes.classList.add("pointer");
    const svgNotes = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg",
    );

    svgNotes.addEventListener("click", () => {
      currentMember = member.fullName;

      const data = JSON.parse(localStorage.getItem("MemberData"));

      const m = data.find((x) => x.fullName === currentMember);
      if (!m) return;

      document.querySelector("#dialogName").textContent = m.fullName;
      document.querySelector("#dialogLeadership").textContent = m.leadership;
      document.querySelector("#dialogOrganization").textContent =
        m.organization;
      document.querySelector("#dialogPhone").textContent = m.cellPhone;
      document.querySelector("#dialogAddress").textContent = m.address;
      document.querySelector("#dialogAge").textContent = m.age;
      document.querySelector("#dialogGender").textContent = m.gender;

      // load notes from localStorage
      const notesKey = `notes-${m.fullName}`;
      const savedNotes = localStorage.getItem(notesKey);

      document.querySelector("#dialogNotes").value = savedNotes || "";

      dialog.showModal();
    });

    svgNotes.setAttribute("role", "img");
    svgNotes.setAttribute("aria-labelledby", "note");
    svgNotes.setAttribute("width", "44");
    svgNotes.setAttribute("height", "44");
    svgNotes.setAttribute("viewBox", "0 0 24 24");
    svgNotes.setAttribute("fill", "none");
    svgNotes.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    const title = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "title",
    );
    (title.setAttribute("id", "note"), (title.textContent = "Add note"));

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute(
      "d",
      "M7.556 8.5h8m-8 3.5H12m7.111-7H4.89a.896.896 0 0 0-.629.256.868.868 0 0 0-.26.619v9.25c0 .232.094.455.26.619A.896.896 0 0 0 4.89 16H9l3 4 3-4h4.111a.896.896 0 0 0 .629-.256.868.868 0 0 0 .26-.619v-9.25a.868.868 0 0 0-.26-.619.896.896 0 0 0-.63-.256Z",
    );

    svgNotes.appendChild(title);
    svgNotes.appendChild(path);

    notes.appendChild(svgNotes);
    tr.appendChild(notes);

    const tdCheck = document.createElement("td");
    tdCheck.classList.add("pointer");
    tdCheck.addEventListener("click", (e) => {
      if (e.target.closest("svg")) {
        const svg = e.target.closest("svg");
        if (!svg) return;

        const label = svg.getAttribute("aria-labelledby");

        // toggle the svg checkbox
        if (label === "checkbox-unchecked") {
          svg.outerHTML = `
      <svg role="img" aria-labelledby="checkbox-checked"
fill="none" height="44" viewBox="0 0 24 24" width="44" xmlns="http://www.w3.org/2000/svg"><title id="checkbox-checked">checkbox checked</title><path clip-rule="evenodd" d="m1 4.99999c0-2.18866 1.81136-3.99999 4-3.99999h14c2.1886 0 4 1.81133 4 3.99999v14.00001c0 2.1887-1.8114 4-4 4h-14c-2.18864 0-4-1.8113-4-4zm16.1616 4.25302c.3905-.39053.3905-1.02369 0-1.41422-.3905-.39052-1.0237-.39052-1.4142 0l-5.2819 5.28191-2.20219-2.271c-.38447-.3964-1.01756-.4062-1.41405-.0217-.39648.3845-.40622 1.0175-.02175 1.414l2.90909 3c.18649.1923.4423.3018.7102.3038.2679.0021.5254-.1034.7148-.2928z" fill="currentColor" fill-rule="evenodd"/></svg>
    `;
        } else {
          svg.outerHTML = `
      <svg
                  role="img"
                  aria-labelledby="checkbox-unchecked"
                  id="Layer_2"
                  viewBox="0 0 16 16"
                  height="44"
                  width="44"
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Layer 2"
                >
                  <title id="checkbox-unchecked">checkbox unchecked</title>
                  <path
                    fill="currentColor"
                    d="m3 15.5h10a2.5026 2.5026 0 0 0 2.5-2.5v-10a2.5026 2.5026 0 0 0 -2.5-2.5h-10a2.5026 2.5026 0 0 0 -2.5 2.5v10a2.5026 2.5026 0 0 0 2.5 2.5zm-1.5-12.5a1.5017 1.5017 0 0 1 1.5-1.5h10a1.5017 1.5017 0 0 1 1.5 1.5v10a1.5017 1.5017 0 0 1 -1.5 1.5h-10a1.5017 1.5017 0 0 1 -1.5-1.5z"
                  />
                </svg>
    `;
        }

        // toggle the attendance
        toggleAttendance(member.fullName, indexDay);
        updateStatistic(indexDay);
      }
    });

    tdCheck.innerHTML = member.attendance[indexDay].present
      ? `<svg role="img" aria-labelledby="checkbox-checked"
fill="none" height="44" viewBox="0 0 24 24" width="44" xmlns="http://www.w3.org/2000/svg"><title id="checkbox-checked">checkbox checked</title><path clip-rule="evenodd" d="m1 4.99999c0-2.18866 1.81136-3.99999 4-3.99999h14c2.1886 0 4 1.81133 4 3.99999v14.00001c0 2.1887-1.8114 4-4 4h-14c-2.18864 0-4-1.8113-4-4zm16.1616 4.25302c.3905-.39053.3905-1.02369 0-1.41422-.3905-.39052-1.0237-.39052-1.4142 0l-5.2819 5.28191-2.20219-2.271c-.38447-.3964-1.01756-.4062-1.41405-.0217-.39648.3845-.40622 1.0175-.02175 1.414l2.90909 3c.18649.1923.4423.3018.7102.3038.2679.0021.5254-.1034.7148-.2928z" fill="currentColor" fill-rule="evenodd"/></svg>`
      : `<svg
                  role="img"
                  aria-labelledby="checkbox-unchecked"
                  id="Layer_2"
                  viewBox="0 0 16 16"
                  height="44"
                  width="44"
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Layer 2"
                >
                  <title id="checkbox-unchecked">checkbox unchecked</title>
                  <path
                    fill="currentColor"
                    d="m3 15.5h10a2.5026 2.5026 0 0 0 2.5-2.5v-10a2.5026 2.5026 0 0 0 -2.5-2.5h-10a2.5026 2.5026 0 0 0 -2.5 2.5v10a2.5026 2.5026 0 0 0 2.5 2.5zm-1.5-12.5a1.5017 1.5017 0 0 1 1.5-1.5h10a1.5017 1.5017 0 0 1 1.5 1.5v10a1.5017 1.5017 0 0 1 -1.5 1.5h-10a1.5017 1.5017 0 0 1 -1.5-1.5z"
                  />
                </svg>
              `;
    tr.appendChild(tdCheck);
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  return table;
}
