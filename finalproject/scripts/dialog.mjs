const dialogNote = document.querySelector("#notes");
const closeDialog = document.querySelector("#closeDialog");

showCurrentDay();
dialogNote.showModal();

closeDialog.addEventListener("click", () => {
  dialogNote.close();
});


