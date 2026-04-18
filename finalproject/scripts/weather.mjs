const API_KEY = "a3ae92ebec526d34ef6b0d71891dcced";
const lat = -19.45;
const lon = -44.24;
const units = "metric";

const weatherImg = document.querySelector("#weather img");
const tempEl = document.querySelector("#temp");
const descEl = document.querySelector("#current-weather");
const cityEl = document.querySelector("#city");

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`;

async function fetchWeather() {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Weather fetch failed");

    return await res.json();
  } catch (err) {
    console.error(err);
  }
}

function renderWeather(data) {
  if (!data) return;

  // temperature
  tempEl.textContent = `${Math.round(data.main.temp)}°C`;

  // description
  descEl.textContent = data.weather[0].description;

  // icon
  weatherImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherImg.alt = data.weather[0].description;

  // city
  cityEl.textContent = `${data.name}, ${data.sys.country}`;
}

export async function loadWeather() {
  const data = await fetchWeather();
  renderWeather(data);
}
