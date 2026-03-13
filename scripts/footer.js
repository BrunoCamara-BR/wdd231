const copyrightDate = document.querySelector("#copyrightDate");
const today = new Date();

copyrightDate.innerHTML = `<p>© 🔥 ${new Intl.DateTimeFormat("en-US", {
  year: "numeric",
}).format(
  today,
)} 🔥 Bruno Câmara 🔥 Minas Gerais, Brazil<p>\n <p>LastModified: ${document.lastModified} </p>`;
