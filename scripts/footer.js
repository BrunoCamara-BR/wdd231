const copyrightText = document.querySelector("#copyright-year");
const lastModified = document.querySelector("#lastModified");
const today = new Date();

copyrightText.textContent = `© 🔥 ${new Intl.DateTimeFormat("en-US", {
  year: "numeric",
}).format(today)} 🔥 Bruno Câmara 🔥 Minas Gerais, Brazil`;

lastModified.textContent = document.lastModified;
