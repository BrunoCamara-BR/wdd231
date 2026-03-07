hambutton = document.getElementById("hambutton");
navBar = document.getElementById("nav-bar");

hambutton.addEventListener("click", () => {
  hambutton.classList.toggle("show");
  navBar.classList.toggle("show");
});
