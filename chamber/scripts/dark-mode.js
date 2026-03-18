const darkTheme = document.querySelector("#toggle-theme");
darkTheme.innerHTML = `<img src="images/light-theme.svg" alt="" width="44" height="44"
/>`;

const body = document.querySelector("body");
let toggle = true;

darkTheme.addEventListener("click", (e) => {
  e.preventDefault();
  body.classList.toggle("dark");
  if (toggle) {
    darkTheme.innerHTML = `<img src="images/dark-theme.svg" alt="" width="44" height="44"
        />`;
    toggle = false;
  } else {
    darkTheme.innerHTML = `<img src="images/light-theme.svg" alt="" width="44" height="44"
        />`;
    toggle = true;
  }
});
