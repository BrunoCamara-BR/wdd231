const answerForm = new URLSearchParams(window.location.search);
const div = document.querySelector("#results");

console.log(answerForm);

div.innerHTML = `<p>${answerForm.get("first")} ${answerForm.get("last")} ${answerForm.get("phone")} ${answerForm.get("email")} ${answerForm.get("ordinance")} ${answerForm.get("date")} ${answerForm.get("location")}</p>`;
