const hambutton = document.querySelector("#hambutton");
const nav = document.querySelector("#navigation");

hambutton.addEventListener("click", () => {
  hambutton.classList.toggle("show");
  nav.classList.toggle("show");
});
