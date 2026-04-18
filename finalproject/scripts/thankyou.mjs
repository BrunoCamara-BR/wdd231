import { addMember } from "./update-members.mjs";

const params = new URLSearchParams(window.location.search);
const section = document.querySelector(".thankyou");

function get(key) {
  return params.get(key) || "";
}

const member = {
  fullName: get("fullName"),
  gender: get("gender"),
  age: get("age"),
  address: get("address"),
  cellPhone: get("cellPhone"),
  organization: get("organization"),
  leadership: get("leadership"),
};

section.innerHTML = `
  <div class="thankyou-card">
    <dl>
      <dt>Full Name</dt>
      <dd>${member.fullName}</dd>

      <dt>Gender</dt>
      <dd>${member.gender}</dd>

      <dt>Age</dt>
      <dd>${member.age}</dd>

      <dt>Address</dt>
      <dd>${member.address}</dd>

      <dt>Cell Phone</dt>
      <dd>${member.cellPhone}</dd>

      <dt>Organization</dt>
      <dd>${member.organization}</dd>

      <dt>Leadership</dt>
      <dd>${member.leadership || "None"}</dd>
    </dl>
  </div>
`;

addMember(member);
