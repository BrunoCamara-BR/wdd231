import { cleanText, memberInitials } from "./helpers.mjs";

export const memberTableList =
  document.querySelector("#member-table table") ||
  document.createElement("table");

if (!memberTableList.isConnected) {
  const box = document.querySelector("#member-table");
  if (box) {
    box.appendChild(memberTableList);
  }
}

function makeNoteButton(member) {
  return `
    <button
      type="button"
      class="icon-button"
      data-action="note"
      data-name="${cleanText(member.fullName)}"
      aria-label="Abrir notas de ${cleanText(member.fullName)}"
    >
      <img src="images/notes.svg" alt="" aria-hidden="true">
    </button>
  `;
}

function makeCheckButton(member) {
  const imgPath = member.present
    ? "images/checkbox-checked.svg"
    : "images/checkbox-unchecked.svg";

  const label = member.present ? "Marcar como ausente" : "Marcar presença";

  return `
    <button
      type="button"
      class="icon-button"
      data-action="check"
      data-name="${cleanText(member.fullName)}"
      aria-label="${label} de ${cleanText(member.fullName)}"
    >
      <img src="${imgPath}" alt="" aria-hidden="true">
    </button>
  `;
}
export function drawMemberTable(members) {
  if (!members.length) {
    memberTableList.innerHTML = `
      <tbody>
        <tr class="empty-row">
          <td colspan="4">Nenhum membro encontrado.</td>
        </tr>
      </tbody>
    `;
    return;
  }

  const rows = members
    .map((member) => {
      const labelText = member.leadership || member.organization || "";

      return `
        <tr data-name="${cleanText(member.fullName)}">
          <td class="profile">
            <div class="round">
              <p class="member-initials">${memberInitials(member.fullName)}</p>
            </div>
          </td>

          <td class="col-member-name">
            ${cleanText(member.fullName)} <br />
            <span>${cleanText(labelText)}</span>
          </td>

          <td class="pointer">
            ${makeNoteButton(member)}
          </td>

          <td class="pointer">
            ${makeCheckButton(member)}
          </td>
        </tr>
      `;
    })
    .join("");

  memberTableList.innerHTML = `
    <tbody>
      ${rows}
    </tbody>
  `;
}
