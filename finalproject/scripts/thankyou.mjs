import { cleanText } from "./helpers.mjs";

document.addEventListener("DOMContentLoaded", startThankYouPage);

function startThankYouPage() {
  const summaryBox = document.querySelector("#thankyou-summary");
  if (!summaryBox) return;

  const params = new URLSearchParams(window.location.search);
  let member = {
    fullName: params.get("fullName") || "",
    sex: params.get("sex") || "",
    age: params.get("age") || "",
    address: params.get("address") || "",
    cellPhone: params.get("cellPhone") || "",
    organization: params.get("organization") || "",
    leadership: params.get("leadership") || "",
  };

  if (!member.fullName) {
    try {
      const stored = sessionStorage.getItem("last-new-member-v1");
      if (stored) {
        member = JSON.parse(stored);
      }
    } catch {
      // nothing here
    }
  }

  summaryBox.innerHTML = `
    <div class="summary-item"><strong>Full Name:</strong> ${cleanText(member.fullName || "Not provided")}</div>
    <div class="summary-item"><strong>Sex:</strong> ${cleanText(member.sex || "Not provided")}</div>
    <div class="summary-item"><strong>Age:</strong> ${cleanText(String(member.age || "Not provided"))}</div>
    <div class="summary-item"><strong>Address:</strong> ${cleanText(member.address || "Not provided")}</div>
    <div class="summary-item"><strong>Cell Phone:</strong> ${cleanText(member.cellPhone || "Not provided")}</div>
    <div class="summary-item"><strong>Organization:</strong> ${cleanText(member.organization || "Not provided")}</div>
    <div class="summary-item"><strong>Leadership:</strong> ${cleanText(member.leadership || "None")}</div>
  `;
}
