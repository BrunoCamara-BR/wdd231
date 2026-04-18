const getMembers = () => {
  return JSON.parse(localStorage.getItem("MemberData")) || [];
};

function renderMember(member, container) {
  const card = document.createElement("div");
  card.classList.add("leader-card");

  card.innerHTML = `
    <div class="leader-name">${member.fullName || ""}</div>
    <div class="leader-role">${member.leadership || ""}</div>

    <div class="leader-grid">
      <p>${member.organization || ""}</p>
      <p>${member.gender || ""}</p>
      <p>${member.age || ""} years</p>
      <p>${member.cellPhone || ""}</p>
      <p>${member.address || ""}</p>
    </div>
  `;

  container.appendChild(card);
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#leadership-container");

  if (!container) return;

  const members = getMembers();

  const leaders = members.filter(
    (m) => m.leadership && m.leadership.trim() !== "",
  );

  if (leaders.length === 0) {
    container.innerHTML = `<p style="padding:10px">No leadership members found.</p>`;
    return;
  }

  leaders.forEach((member) => renderMember(member, container));
});
