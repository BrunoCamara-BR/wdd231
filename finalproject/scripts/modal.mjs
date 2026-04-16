export function makeNoteDialog() {
  const dialog = document.createElement("dialog");
  dialog.className = "note-dialog";

  dialog.innerHTML = `
    <form class="note-box">
      <h3 data-note-title></h3>
      <p data-note-leader></p>
      <textarea id="note-text" placeholder="Write a note about your brother..."></textarea>

      <div class="note-actions">
        <button type="button" class="close-note" data-close-note>Close</button>
        <button type="submit" class="save-note">Save</button>
      </div>
    </form>
  `;

  document.body.appendChild(dialog);

  const titleBox = dialog.querySelector("[data-note-title]");
  const leaderBox = dialog.querySelector("[data-note-leader]");
  const textBox = dialog.querySelector("#note-text");
  const closeBtn = dialog.querySelector("[data-close-note]");
  const form = dialog.querySelector("form");

  let saveNote = null;

  closeBtn.addEventListener("click", () => {
    dialog.close();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (saveNote) {
      saveNote(textBox.value.trim());
    }

    dialog.close();
  });

  return {
    open(member, noteText, onSave) {
      saveNote = onSave;
      titleBox.textContent = member.fullName;
      leaderBox.textContent = member.leadership || member.organization || "";
      textBox.value = noteText || "";
      dialog.showModal();
      textBox.focus();
    },
  };
}
