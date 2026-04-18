import { loadWeather } from "./weather.mjs";
import { importToLocal } from "./import-members.mjs";
import { buildTable } from "./table.mjs";
import { filter } from "./filter.mjs";
import { setAttendanceBatch, getAttendanceStats } from "./update-members.mjs";

const containerTable = document.querySelector("#member-table");
const groupSelect = document.querySelector("#group");

const markAllBt = document.querySelector("#mark-all");
const clearBt = document.querySelector("#clear");

let nameToSearch = "";
const organizations = [];
let dataLocal = [];
let groupFilter;

let isFirstRenderGroups = true;

// Days
const currentDay = document.querySelector("#currentDay");
const backBt = document.querySelector("#back");
const nextBt = document.querySelector("#next");

let dayIndex = 0;

const GetDaysAvailable = async () => {
  const srcDays = "./data/dates.json";
  const data = await fetch(srcDays);
  const days = await data.json();

  //   console.log(days[0].dates);
  return days[0].dates;
};

const listDays = await GetDaysAvailable();

backBt.addEventListener("click", () => {
  if (dayIndex > 0) {
    dayIndex--;
  }
  showCurrentDay();
});

nextBt.addEventListener("click", () => {
  if (dayIndex < listDays.length - 1) {
    dayIndex++;
  }
  showCurrentDay();
});

function showCurrentDay() {
  const [year, month, day] = listDays[dayIndex].split("-");

  const date = new Date(year, month - 1, day);

  const parameters = {
    month: "long",
    day: "2-digit",
    year: "numeric",
  };
  const formatted = date.toLocaleString("en-US", parameters);
  currentDay.textContent = formatted;

  // update table
  memberTable();
}

// Table
const memberTable = async () => {
  if (localStorage.getItem("firstImport") !== "true") {
    const importedData = await importToLocal();
    dataLocal =
      importedData || JSON.parse(localStorage.getItem("MemberData")) || [];
    localStorage.setItem("firstImport", "true");
  } else {
    dataLocal = JSON.parse(localStorage.getItem("MemberData")) || [];
  }

  if (isFirstRenderGroups) {
    renderGroups(dataLocal);
    isFirstRenderGroups = false;
  }

  const filterMember = filter(dataLocal, nameToSearch, groupFilter);

  containerTable.innerHTML = "";
  containerTable.appendChild(buildTable(filterMember, dayIndex));
  updateStatistic(dayIndex);
};

showCurrentDay();

// filter
const searchMember = document.querySelector("#member-filter");
searchMember.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    nameToSearch = e.target.value;
    // console.log(nameToSearch);
    // console.log(localData);
    memberTable();
  }
});

function groupList(dataLocal = []) {
  const organizations = Array.isArray(dataLocal)
    ? dataLocal.map((m) => m.organization?.trim()).filter(Boolean)
    : [];

  return ["All organizations", ...new Set(organizations)];
}

function renderGroups(dataLocal) {
  const groups = groupList(dataLocal);

  groupSelect.innerHTML = "";

  groups.forEach((group, index) => {
    const option = document.createElement("option");

    option.value = group;
    option.textContent = group;

    option.selected = index === 0;

    groupSelect.appendChild(option);
  });
}

groupSelect.addEventListener("change", (e) => {
  groupFilter = e.target.value;
  //   console.log(groupFilter);
  memberTable();
});

markAllBt.addEventListener("click", async () => {
  const filterMember = filter(dataLocal, nameToSearch, groupFilter);

  await setAttendanceBatch(filterMember, dayIndex, true);

  memberTable();
});

clearBt.addEventListener("click", async () => {
  const filterMember = filter(dataLocal, nameToSearch, groupFilter);

  await setAttendanceBatch(filterMember, dayIndex, false);

  memberTable();
});

export function updateStatistic(dayIndex) {
  const stats = getAttendanceStats(dayIndex);

  document.querySelector("#present span").textContent = stats.present;
  document.querySelector("#absent span").textContent = stats.absent;
  document.querySelector("#totalmembers span").textContent = stats.total;
}

loadWeather();
