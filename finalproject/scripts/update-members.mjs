export function toggleAttendance(fullName, indexDay) {
  const data = JSON.parse(localStorage.getItem("MemberData"));

  const memberIndex = data.findIndex((m) => m.fullName === fullName);

  //   console.log(memberIndex);
  if (memberIndex === -1) return;

  const current = data[memberIndex].attendance[indexDay].present;

  data[memberIndex].attendance[indexDay].present = !current;

  localStorage.setItem("MemberData", JSON.stringify(data));
}

export function setAttendanceBatch(list, indexDay, value) {
  const data = JSON.parse(localStorage.getItem("MemberData"));

  list.forEach((m) => {
    const member = data.find((x) => x.fullName === m.fullName);

    if (member) {
      member.attendance[indexDay].present = value;
    }
  });

  localStorage.setItem("MemberData", JSON.stringify(data));
}

export function getAttendanceStats(indexDay) {
  const data = JSON.parse(localStorage.getItem("MemberData")) || [];

  let present = 0;
  let absent = 0;

  data.forEach((m) => {
    const status = m.attendance?.[indexDay]?.present;

    if (status === true) present++;
    else if (status === false) absent++;
  });

  return {
    present,
    absent,
    total: data.length,
  };
}

export function addMember(member) {
  if (!member || !member.fullName) return;

  const data = JSON.parse(localStorage.getItem("MemberData")) || [];

  const exists = data.find((m) => m.fullName === member.fullName);
  if (exists) return;

  const defaultAttendance = [
    { date: "2026-04-05", present: false, notes: "" },
    { date: "2026-04-12", present: false, notes: "" },
    { date: "2026-04-19", present: false, notes: "" },
    { date: "2026-04-26", present: false, notes: "" },
  ];

  const newMember = {
    fullName: member.fullName || "",
    gender: member.gender || "",
    age: Number(member.age) || 0,
    address: member.address || "",
    cellPhone: member.cellPhone || "",
    organization: member.organization || "",
    leadership: member.leadership || "",
    attendance: defaultAttendance,
  };

  data.push(newMember);
  localStorage.setItem("MemberData", JSON.stringify(data));
}
