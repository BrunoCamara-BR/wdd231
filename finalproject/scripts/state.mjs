const STORAGE_KEY = "attendance-state-v1";

export function readState() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return { sundays: {} };
  }

  try {
    const parsed = JSON.parse(raw);
    if (!parsed.sundays) parsed.sundays = {};
    return parsed;
  } catch {
    return { sundays: {} };
  }
}

export function writeState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function buildDayMembers(baseMembers, savedMembers = []) {
  return baseMembers.map((member) => {
    const old = savedMembers.find((item) => item.fullName === member.fullName);

    return {
      ...member,
      present: old ? !!old.present : false,
      note: old?.note || "",
    };
  });
}

export function getDayMembers(state, dayKey, baseMembers) {
  const savedMembers = state.sundays?.[dayKey]?.members || [];
  return buildDayMembers(baseMembers, savedMembers);
}

export function setDayMembers(state, dayKey, dayMembers) {
  if (!state.sundays) state.sundays = {};
  state.sundays[dayKey] = { members: dayMembers };
}
