const hambutton = document.getElementById("hambutton");
const navBar = document.getElementById("nav-bar");
const footerCopyrightYear = document.getElementById("copyright-year");
const lastModified = document.getElementById("last-modified");
const now = new Date();
let option = {
  weekday: "short",
  month: "short",
  day: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};
const date = new Date().toLocaleDateString("en-US", option);

hambutton.addEventListener("click", () => {
  hambutton.classList.toggle("show");
  navBar.classList.toggle("show");
});

footerCopyrightYear.textContent = `© 🔥 Bruno's Site 🔥 ${now.getFullYear()}`;
lastModified.textContent = `Last Modified: ${date}`;
