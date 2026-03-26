const temperature = document.querySelector("#current-temp");
const weatherIMG = document.querySelector("#weather-icon");
const description = document.querySelector("figcaption");
const lat = "-19.45";
const lon = "-44.24";
const units = "metric";
const KEY = "a3ae92ebec526d34ef6b0d71891dcced";
const url = `https://api.openweathermap.org/data/2.5/weather?id=524901&lat=${lat}&lon=${lon}&units=${units}&appid=${KEY}`;
let iconURL;

const apiFetch = async () => {
  try {
    const response = await fetch(url);
    console.log(response);
    if (response.ok) {
      let data = await response.json();
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
};

apiFetch();

function displayResults(data) {
  temperature.innerHTML = `${data.main.temp}&deg;C`;
  weatherIMG.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
  );
  weatherIMG.setAttribute("alt", data.weather[0].description);
  description.textContent = data.weather[0].description;
}
