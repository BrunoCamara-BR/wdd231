const levelInfo = {
  np: `
    <h2 id="dialog-title">NP Membership</h2>
  <p>Best for nonprofit organizations with no membership fee.</p>
  <ul>
    <li>Free membership for qualified nonprofits</li>
    <li>Access to chamber newsletters and community updates</li>
    <li>Ability to attend select networking events</li>
    <li>Member directory listing</li>
    <li>Basic visibility on the chamber website</li>
  </ul>
  <button class="closeDialog">Close</button>
  `,
  bronze: `
    <h2 id="dialog-title">Bronze Membership</h2>
  <p>Entry-level paid membership for small businesses.</p>
  <ul>
    <li>All NP benefits</li>
    <li>Discounted access to chamber events</li>
    <li>Access to business training and workshops</li>
    <li>Listing in the member directory with business details</li>
    <li>Opportunity to promote one event or announcement per year</li>
  </ul>
  <button class="closeDialog">Close</button>
    `,
  silver: `
     <h2 id="dialog-title">Silver Membership</h2>
  <p>A stronger option for growing businesses.</p>
  <ul>
    <li>All Bronze benefits</li>
    <li>Priority event registration</li>
    <li>More promotional opportunities on the chamber website</li>
    <li>Access to select advertising and spotlight features</li>
    <li>Invitations to special networking sessions</li>
    <li>Reduced pricing for sponsorships and events</li>
  </ul>
  <button class="closeDialog">Close</button>
    `,
  gold: `
    <h2 id="dialog-title">Gold Membership</h2>
  <p>Premium level for businesses that want maximum visibility and support.</p>
  <ul>
    <li>All Silver benefits</li>
    <li>Featured spotlight placement on the chamber homepage</li>
    <li>Priority promotion in newsletters and events</li>
    <li>Premium advertising opportunities</li>
    <li>Early access to chamber programs and VIP networking events</li>
    <li>Highest discount on sponsorships, workshops, and event fees</li>
  </ul>
  <button class="closeDialog">Close</button>    
    `,
};

const buttonNP = document.querySelector("#button-np button");
const buttonBronze = document.querySelector("#button-bronze button");
const buttonSilver = document.querySelector("#button-silver button");
const buttonGold = document.querySelector("#button-gold button");
const dialog = document.querySelector("#dialog");

function dialogDisplay(level) {
  dialog.innerHTML = level;
  document.querySelector("#dialog button").addEventListener("click", () => {
    dialog.close();
  });
  dialog.showModal();
}

buttonNP.addEventListener("click", () => {
  dialogDisplay(levelInfo.np);
});
buttonBronze.addEventListener("click", () => {
  dialogDisplay(levelInfo.bronze);
});
buttonSilver.addEventListener("click", () => {
  dialogDisplay(levelInfo.silver);
});
buttonGold.addEventListener("click", () => {
  dialogDisplay(levelInfo.gold);
});

const timestamp = document.querySelector("#timestamp");
timestamp.value = document.lastModified;
