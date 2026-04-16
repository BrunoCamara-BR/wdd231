const EXTRA_MEMBERS_KEY = "added-members-v1";

export function readExtraMembers() {
  const raw = localStorage.getItem(EXTRA_MEMBERS_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveExtraMembers(members) {
  localStorage.setItem(EXTRA_MEMBERS_KEY, JSON.stringify(members));
}

export function addExtraMember(member) {
  const members = readExtraMembers();
  const index = members.findIndex((item) => item.fullName === member.fullName);

  if (index >= 0) {
    members[index] = member;
  } else {
    members.push(member);
  }

  saveExtraMembers(members);
}

export function mergeMembers(baseMembers, extraMembers) {
  const merged = [...baseMembers];
  const seen = new Set(baseMembers.map((member) => member.fullName));

  extraMembers.forEach((member) => {
    if (seen.has(member.fullName)) {
      const index = merged.findIndex(
        (item) => item.fullName === member.fullName,
      );
      if (index >= 0) {
        merged[index] = member;
      }
      return;
    }

    merged.push(member);
    seen.add(member.fullName);
  });

  return merged;
}
