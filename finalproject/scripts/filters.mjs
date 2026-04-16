import { cleanText, makeSearchRegex } from "./helpers.mjs";

export function fillGroupSelect(selectBox, members) {
  if (!selectBox) return;

  const groups = [
    ...new Set(
      members
        .map((member) => String(member.organization || "").trim())
        .filter(Boolean),
    ),
  ].sort();

  selectBox.innerHTML = `
    <option value="all">All groups</option>
    ${groups
      .map(
        (group) =>
          `<option value="${cleanText(group)}">${cleanText(group)}</option>`,
      )
      .join("")}
  `;
}

export function filterMembers(members, searchText, groupText) {
  const regex = makeSearchRegex(searchText);

  return members.filter((member) => {
    const groupOk = groupText === "all" || member.organization === groupText;

    const fullText = [
      member.fullName,
      member.organization || "",
      member.leadership || "",
    ].join(" ");

    const searchOk = !regex || regex.test(fullText);

    return groupOk && searchOk;
  });
}
