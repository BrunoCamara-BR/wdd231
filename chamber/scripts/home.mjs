import { gridCardBuilder } from "./gridCardBuilder.mjs";
import { memberList } from "./members.mjs";

const spotlights = document.querySelector("#member-container");
let memberArray = [];

const buildSpotlights = async () => {
  memberArray = await memberList(3, true);
  const gridElements = gridCardBuilder(memberArray);

  gridElements.forEach((item) => {
    spotlights.appendChild(item);
  });
};

buildSpotlights();
