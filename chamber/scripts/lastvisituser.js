const today = Date.now(); // test       1775557081005 = 1 day         1775470681005 = 2 days
const msDay = 24 * 60 * 60 * 1000; //86400000
const lastVisitMsg = document.querySelector("#last-visit-msg");
let displayLastVisitMsg;

if (localStorage.getItem("lastVisit")) {
  let diffDays = ((today - localStorage.getItem("lastVisit")) / msDay).toFixed(
    0,
  );
  if (diffDays <= 0) {
    displayLastVisitMsg = "Back so soon! Awesome!";
  } else {
    displayLastVisitMsg = `You last visited ${diffDays == 1 ? `${diffDays} day` : `${diffDays} days`} ago.`;
  }
  localStorage.setItem("lastVisit", today);
} else {
  localStorage.setItem("lastVisit", today);
  displayLastVisitMsg = "Welcome! Let us know if you have any questions.";
}
lastVisitMsg.textContent = displayLastVisitMsg;
