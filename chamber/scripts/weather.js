const temperature = document.querySelector("#current-temp");
const weatherIMG = document.querySelector("#weather-icon");
const description = document.querySelector("#description");
const humidity = document.querySelector("#humidity");
const hight = document.querySelector("#hight");
const low = document.querySelector("#low");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");

const lat = "-19.45";
const lon = "-44.24";
const units = "metric";
const KEY = "a3ae92ebec526d34ef6b0d71891dcced";
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${KEY}`;
let iconURL;
let dateOption = {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  timeZone: "America/Sao_Paulo",
};

// Forecast
const div = document.querySelector("#forecast-days");
const day1 = document.createElement("p");
const day2 = document.createElement("p");
const day3 = document.createElement("p");

const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${KEY}`;

const apiFetch = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      let data = await response.json();
      return data;
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
};

function displayResults(weather, forecast) {
  temperature.innerHTML = `${weather.main.temp}&deg;C`;
  weatherIMG.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
  );
  weatherIMG.setAttribute("alt", weather.weather[0].description);
  description.textContent = weather.weather[0].description;

  humidity.innerHTML = `${weather.main.humidity}%`;
  hight.innerHTML = `${weather.main.temp_max}&deg;C`;
  low.innerHTML = `${weather.main.temp_min}&deg;C`;
  sunrise.innerHTML = new Date(weather.sys.sunrise * 1000).toLocaleTimeString(
    "pt-BR",
    dateOption,
  );

  sunset.innerHTML = new Date(weather.sys.sunset * 1000).toLocaleTimeString(
    "pt-BR",
    dateOption,
  );

  const forecastDays = forecast.list.filter((item) => {
    return item.dt_txt.includes("12:00:00");
  });

  const forecast3Days = forecastDays.slice(0, 3);
  day1.innerHTML = `Tomorrow: <span>${forecast3Days[0].main.temp}&deg;C</span>`;
  let day2number = forecast3Days[1].dt_txt.split(" ")[0];
  let day2name = new Date(day2number).toLocaleDateString("en-US", {
    weekday: "long",
  }); // I chose to change "pt-BR" (Brazil) to "en-US" to be easier to understand.
  day2.innerHTML = `${day2name}: <span>${forecast3Days[1].main.temp}&deg;C</span>`;

  let day3number = forecast3Days[2].dt_txt.split(" ")[0];
  let day3name = new Date(day3number).toLocaleDateString("en-US", {
    weekday: "long",
  }); // I chose to change "pt-BR" (Brazil) to "en-US" to be easier to understand.
  day3.innerHTML = `${day3name}: <span>${forecast3Days[2].main.temp}&deg;C</span>`;

  div.appendChild(day1);
  div.appendChild(day2);
  div.appendChild(day3);
}

const fullWeather = async () => {
  let weather = await apiFetch(url);
  let forecast = await apiFetch(urlForecast);
  displayResults(weather, forecast);
};

fullWeather();
