let currentWeather = document.getElementById("current-weather");
let cityInput = document.getElementById("city-input");
let cityName = document.getElementById("city-name");
let forecast = document.getElementById("forecast");


function getWeather() {
  getCurrentWeather();
  getForecast();
}

function getCurrentWeather() {
  let req = new XMLHttpRequest();
  req.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=1c667e47228d1b19e6a47b5eae608757&units=metric&lang=pl`, true);
  req.addEventListener("load", function (e) {
    let data = JSON.parse(req.responseText);
    console.log(data);
    addToWeather(data);
  });
  req.send(null);
}
function addToWeather(data) {
  currentWeather.style.display = "block";
  let hourDiv = document.getElementById("hour-div");
  hourDiv.style.display = "block";
  if (data.main === undefined) {
    cityName.innerText = "?";
    hourDiv.querySelector(".hour").innerText = "?";
    for (let span of currentWeather.querySelectorAll("span")) {
      span.innerText = "?";
    }
    return;
  }
  let precipitation = 0;

  if (data.rain !== undefined) {
    precipitation = precipitation + data.rain["1h"];
  }
  if (data.snow !== undefined) {
    precipitation = precipitation + data.snow["1h"];
  }

  cityName.innerText = data.name;
  currentWeather.querySelector(".temperature-real").innerText = Math.floor(data.main.temp + 0.5);
  currentWeather.querySelector(".temperature-perceived").innerText = Math.floor(data.main.feels_like + 0.5);
  currentWeather.querySelector(".precipitation").innerText = precipitation;
  currentWeather.querySelector(".humidity").innerText = data.main.humidity;
  currentWeather.querySelector(".visibility").innerText = Math.floor(data.visibility / 1000 + 0.5);
  currentWeather.querySelector(".sky").innerText = data.weather[0].description;
  currentWeather.querySelector(".wind-speed").innerText = Math.floor(data.wind.speed + 0.5);
  hourDiv.querySelector(".hour").innerText = new Date(data.dt * 1000).toLocaleTimeString("pl-PL");
}

async function getForecast() {
  let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityInput.value}&appid=1c667e47228d1b19e6a47b5eae608757&units=metric&lang=pl`);
  let data = await response.json();
  console.log(data);
  addToForecast(data.list);
}

function addToForecast(list) {
  forecast.innerHTML = "";

  for (let item of list) {
    let card = document.createElement("div");
    card.className = "card";

    let precipitation = 0;
    if (item.rain !== undefined) {
      precipitation = precipitation + item.rain["3h"];
    }

    if (item.snow !== undefined) {
      precipitation = precipitation + item.snow["3h"];
    }

    card.innerHTML = `
      <div>${new Date(item.dt *1000).toLocaleString("pl-PL")}</div>
      <div>Temperatura: ${Math.floor(item.main.temp + 0.5)}°C </div>
      <div>Odczuwalna: ${Math.floor(item.main.feels_like + 0.5)} °C</div>
      <div>${item.weather[0].description}</div>
      <div>Opady: ${precipitation} mm</div>
      <div>Wiatr: ${Math.floor(item.wind.speed + 0.5)} m/s </div>
      <div>Wilgotność: ${item.main.humidity}%</div>
      <div>Widoczność: ${Math.floor(item.visibility / 1000 + 0.5)} km</div>
    `;
    forecast.appendChild(card);
  }
}
