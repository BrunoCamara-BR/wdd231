const show = document.querySelector("#openDialog");
const dialog = document.querySelector("#dialog");
const closeDialog = document.querySelector("#closeDialog");

show.addEventListener("click", () => {
  dialog.showModal();
});

closeDialog.addEventListener("click", () => {
  dialog.close();
});


