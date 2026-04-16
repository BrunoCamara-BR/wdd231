import { addExtraMember } from "./members-store.mjs";

document.addEventListener("DOMContentLoaded", startAddMemberPage);

function startAddMemberPage() {
  const form = document.querySelector("#add-member-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const newMember = {
      fullName: String(formData.get("fullName") || "").trim(),
      sex: String(formData.get("sex") || "").trim(),
      age: Number(formData.get("age") || 0),
      address: String(formData.get("address") || "").trim(),
      cellPhone: String(formData.get("cellPhone") || "").trim(),
      organization: String(formData.get("organization") || "").trim(),
      leadership: String(formData.get("leadership") || "").trim(),
    };

    addExtraMember(newMember);

    const query = new URLSearchParams();
    Object.entries(newMember).forEach(([key, value]) => {
      query.set(key, String(value));
    });

    sessionStorage.setItem("last-new-member-v1", JSON.stringify(newMember));
    window.location.href = `thankyou.html?${query.toString()}`;
  });
}
