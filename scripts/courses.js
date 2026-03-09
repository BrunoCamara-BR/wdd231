const courseList = document.getElementById("courses");
const filter = document.querySelector("#filter");
const coursesInfo = document.querySelector("#courses-info");

const courses = [
  { code: "CSE 110", status: "completed" },
  { code: "CSE 111", status: "completed" },
  { code: "CSE 210", status: "in-progress" },
  { code: "WDD 130", status: "completed" },
  { code: "WDD 131", status: "completed" },
  { code: "WDD 231", status: "in-progress" },
];

function showList(list) {
  const allList = list.reduce((total, item) => {
    return (
      total +
      `<li>${item.code}${item.status == "in-progress" ? " - <span>in progress</span>" : ""}</li>`
    );
  }, "");
  courseList.innerHTML = allList;
}

filter.addEventListener("submit", (e) => {
  e.preventDefault();

  const filter = e.submitter.value;

  const filteredList = courses.filter((item) => {
    return item.code.includes(filter);
  });

  showList(filteredList);

  coursesInfo.innerHTML = `The total credits for course listed above <strong>${filteredList.length * 2}</strong>.`;
});
