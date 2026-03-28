import { courses } from "./courses.mjs";

const courseList = document.getElementById("courses");
const dialog = document.querySelector("#course-details");

courseList.addEventListener("click", (e) => {
  if (e.target.tagName == "LI") {
    const li = e.target.closest("li");
    if (!li) return;

    let part = li.textContent.replace(" - in progress", "").replace("✓ ", "");
    let [subject, number] = part.split(" ");

    let course = courses.find((item) => {
      return item.subject === subject && item.number == number;
    });

    if (!course) return;

    dialog.innerHTML = `
    <div>
        <button id="close-course-details">✖</button>
        <h2>${course.subject} ${course.number}</h2>
        <h3>${course.title}</h3>
        <p><strong>Credits</strong>: ${course.credits}</p>
        <p><strong>Description</strong>: ${course.description}</p>
        <p><strong>Certificate</strong>: ${course.certificate}</p>
        <p><strong>Technology</strong>: ${course.technology}</p>
        </div>
`;
    dialog.showModal();

    document
      .querySelector("#close-course-details")
      .addEventListener("click", () => {
        dialog.close();
      });

    dialog.addEventListener("click", (e) => {
      if (e.target.tagName == "DIALOG") dialog.close();
    });
  }
});
