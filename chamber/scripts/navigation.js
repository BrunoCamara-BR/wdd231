const hambuguer = document.querySelector("#hambuguer");
const navMenu = document.querySelector("#nav-menu");

hambuguer.addEventListener("click", (e) => {
  e.preventDefault();
  hambuguer.classList.toggle("show");
  navMenu.classList.toggle("show");
});
