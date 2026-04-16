import { drawMemberTable } from "./table.mjs";
import { makeNoteDialog } from "./modal.mjs";
import {
  readState,
  writeState,
  getDayMembers,
  setDayMembers,
} from "./state.mjs";
import { bindSundayControls } from "./date.mjs";
import { fillGroupSelect, filterMembers } from "./filters.mjs";
import { formatDateKey, getSunday } from "./helpers.mjs";
import { mergeMembers, readExtraMembers } from "./members-store.mjs";

document.addEventListener("DOMContentLoaded", init);

async function init() {
  const searchBox = document.querySelector("#search-members input");
  const groupBox = document.querySelector("#group");
  const presentBox = document.querySelector("#present span");
  const absentBox = document.querySelector("#absent span");
  const totalBox = document.querySelector("#totalmembers span");
  const markAllButton = document.querySelector("#mark-all");
  const clearButton = document.querySelector("#clear");
  const saveButton = document.querySelector("#save-attendance");
  const todayBox = document.querySelector("#today");
  const backButton = document.querySelector("#back");
  const nextButton = document.querySelector("#next");
  const tableBox = document.querySelector("#member-table table");

  if (!tableBox) return;

  const noteDialog = makeNoteDialog();

  let membersList = [];
  let currentDate = getSunday(new Date());
  let currentDayKey = formatDateKey(currentDate);
  let currentDayMembers = [];

  function updateResume() {
    const presentCount = currentDayMembers.filter(
      (member) => member.present,
    ).length;
    const totalCount = currentDayMembers.length;
    const absentCount = totalCount - presentCount;

    if (presentBox) presentBox.textContent = String(presentCount);
    if (absentBox) absentBox.textContent = String(absentCount);
    if (totalBox) totalBox.textContent = String(totalCount);
  }

  function saveCurrentDay() {
    const state = readState();
    setDayMembers(state, currentDayKey, currentDayMembers);
    writeState(state);
  }

  function renderTable() {
    const searchText = searchBox ? searchBox.value : "";
    const groupText = groupBox ? groupBox.value : "all";
    const visibleMembers = filterMembers(
      currentDayMembers,
      searchText,
      groupText,
    );

    drawMemberTable(visibleMembers);
    updateResume();
  }

  function setCurrentDay(date) {
    currentDate = getSunday(date);
    currentDayKey = formatDateKey(currentDate);

    const state = readState();
    currentDayMembers = getDayMembers(state, currentDayKey, membersList);

    renderTable();
  }

  function setAllPresence(value) {
    currentDayMembers = currentDayMembers.map((member) => ({
      ...member,
      present: value,
    }));

    saveCurrentDay();
    renderTable();
  }

  async function loadMembers() {
    const response = await fetch("data/members.json");
    const baseMembers = await response.json();
    membersList = mergeMembers(baseMembers, readExtraMembers());

    if (groupBox) {
      fillGroupSelect(groupBox, membersList);
    }

    const state = readState();
    currentDayMembers = getDayMembers(state, currentDayKey, membersList);
    renderTable();
  }

  tableBox.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const memberName = button.dataset.name;
    const member = currentDayMembers.find(
      (item) => item.fullName === memberName,
    );

    if (!member) return;

    if (button.dataset.action === "note") {
      noteDialog.open(member, member.note, (newNote) => {
        member.note = newNote;
        saveCurrentDay();
        renderTable();
      });
    }

    if (button.dataset.action === "check") {
      member.present = !member.present;
      saveCurrentDay();
      renderTable();
    }
  });

  if (searchBox) {
    searchBox.addEventListener("input", renderTable);
  }

  if (groupBox) {
    groupBox.addEventListener("change", renderTable);
  }

  if (markAllButton) {
    markAllButton.addEventListener("click", () => setAllPresence(true));
  }

  if (clearButton) {
    clearButton.addEventListener("click", () => setAllPresence(false));
  }

  if (saveButton) {
    saveButton.addEventListener("click", () => {
      saveCurrentDay();
    });
  }

  bindSundayControls({
    todayBox,
    backButton,
    nextButton,
    onChange: (date) => {
      setCurrentDay(date);
    },
  });

  await loadMembers();
}
