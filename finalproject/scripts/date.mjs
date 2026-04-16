import { addDays, getSunday, prettySunday } from "./helpers.mjs";

export function bindSundayControls({
  todayBox,
  backButton,
  nextButton,
  onChange,
}) {
  let currentDate = getSunday(new Date());

  function paint() {
    if (todayBox) {
      todayBox.textContent = prettySunday(currentDate);
    }

    if (onChange) {
      onChange(currentDate);
    }
  }

  if (backButton) {
    backButton.addEventListener("click", () => {
      currentDate = addDays(currentDate, -7);
      paint();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      currentDate = addDays(currentDate, 7);
      paint();
    });
  }

  paint();

  return {
    getCurrentDate() {
      return currentDate;
    },
    setCurrentDate(date) {
      currentDate = getSunday(date);
      paint();
    },
  };
}
