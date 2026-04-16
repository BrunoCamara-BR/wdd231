import { cleanText, memberInitials } from "./helpers.mjs";
import { mergeMembers, readExtraMembers } from "./members-store.mjs";

document.addEventListener("DOMContentLoaded", startLeadershipPage);

async function startLeadershipPage() {
  const listBox = document.querySelector("#leadership-list");
  if (!listBox) return;

  try {
    const response = await fetch("data/members.json");
    const baseMembers = await response.json();
    const members = mergeMembers(baseMembers, readExtraMembers());

    const leaders = members
      .filter((member) => String(member.leadership || "").trim() !== "")
      .sort((a, b) =>
        String(a.fullName || "").localeCompare(String(b.fullName || "")),
      );

    if (!leaders.length) {
      listBox.innerHTML = `<p class="empty-leaders">No leaders were found.</p>`;
      return;
    }

    listBox.innerHTML = leaders.map(makeLeaderCard).join("");
  } catch (error) {
    console.error(error);
    listBox.innerHTML = `<p class="empty-leaders">Unable to load leadership data.</p>`;
  }
}

function makeLeaderCard(member) {
  const phone = member.cellPhone ? cleanText(member.cellPhone) : "Not provided";
  const location = member.address ? cleanText(member.address) : "Not provided";
  const age = member.age ? cleanText(String(member.age)) : "Not provided";
  const sex = member.sex ? cleanText(member.sex) : "Not provided";
  const role = member.leadership
    ? cleanText(member.leadership)
    : "Not provided";

  return `
    <article class="leader-card">
      <div class="leader-top">
        <div class="leader-initials">${cleanText(memberInitials(member.fullName))}</div>
        <div class="leader-name-box">
          <h2 class="leader-name">${cleanText(member.fullName)}</h2>
          <p class="leader-role">${role}</p>
        </div>
      </div>

      <dl class="leader-info">
        <div>
          <dt>Phone</dt>
          <dd>${phone}</dd>
        </div>

        <div>
          <dt>Location</dt>
          <dd>${location}</dd>
        </div>

        <div>
          <dt>Age</dt>
          <dd>${age}</dd>
        </div>

        <div>
          <dt>Sex</dt>
          <dd>${sex}</dd>
        </div>
      </dl>
    </article>
  `;
}
