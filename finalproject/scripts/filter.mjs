export function filter(memberList, nameToSearch, groupFilter) {
  const localData = memberList;

  const filter = localData.filter((m) => {
    const matchName = m.fullName
      .toLowerCase()
      .includes((nameToSearch || "").toLowerCase());

    const matchGroup =
      groupFilter === "All organizations" ||
      !groupFilter ||
      m.organization === groupFilter;

    return matchName && matchGroup;
  });

  //   console.log(filter);
  return filter;
}
