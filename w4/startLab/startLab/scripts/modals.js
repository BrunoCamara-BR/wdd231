const openButton1 = document.querySelector("#openButton1");
const openButton2 = document.querySelector("#openButton2");
const openButton3 = document.querySelector("#openButton3");

const dialogBox = document.querySelector("#dialogBox");
const dialogBoxText = document.querySelector("#dialogBox div"); // Vc pode combinar id com nome de elementos igual o seletor no CSS
const closeButton = document.querySelector("#closeButton");

openButton1.addEventListener("click", () => {
  dialogBoxText.innerHTML = "Apple has 95 calories.";
  dialogBox.showModal();
});
openButton2.addEventListener("click", () => {
  dialogBoxText.innerHTML = "Oranges has 45 calories.";
  dialogBox.showModal();
});
openButton3.addEventListener("click", () => {
  dialogBoxText.innerHTML = "Banana has 105 calories.";
  dialogBox.showModal();
});

closeButton.addEventListener("click", () => {
  dialogBox.close();
});
