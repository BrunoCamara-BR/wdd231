const themeButton = document.querySelector("#theme");
const theme = document.querySelector("body");

themeButton.addEventListener("click", () => {
  if (localStorage.getItem("theme") === "dark") {
    localStorage.setItem("theme", "light");
    themeButton.setAttribute("src", "images/light-theme.svg");
  } else {
    localStorage.setItem("theme", "dark");
    themeButton.setAttribute("src", "images/dark-theme.svg");
  }
  theme.classList.toggle("dark");
});

//load theme
if (localStorage.getItem("theme") === "dark") {
  theme.classList.add("dark");
  themeButton.setAttribute("src", "images/dark-theme.svg");
}
