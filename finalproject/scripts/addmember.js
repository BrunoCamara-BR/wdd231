document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#add-member-form");

  form.addEventListener("submit", (e) => {
    const btn = document.querySelector("#add-member-btn");

    btn.classList.add("clicked");

    setTimeout(() => {
      btn.classList.remove("clicked");
    }, 300);
  });
});
