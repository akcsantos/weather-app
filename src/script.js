import "./styles.css";
const APIKey = "W5QUCJXAGK2BZBRFZC8LWPYQ5";
const APIKEY = "367f03a756b67df8d0922ab76e031fca";
const location = document.querySelector(".location");
const searchBar = document.querySelector(".searchBar");
const temperature = document.querySelector(".temperature");
const weatherIcon = document.querySelector(".weatherIcon");
const status = document.querySelector(".status");
const feelsLike = document.getElementById("details-feelsLike");
const humidity = document.getElementById("details-humidity");
const wind = document.getElementById("details-wind");
const cloud = document.getElementById("details-cloud");

async function weather(location_name) {
  const res = await fetch(
    // `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location_name}?unitGroup=metric&key=${APIKey}&contentType=json`
    `https://api.openweathermap.org/data/2.5/weather?q=${location_name}&appid=${APIKEY}`
  );
  const data = await res.json();

  temperature.innerHTML = `${kelvinToCelsius(data.main.temp).toFixed(1)}`;
  location.innerHTML = `<header>${data.name}, ${data.sys.country}</header>`;
  weatherIcon.src = `../public/${data.weather[0].icon}.png`;
  status.innerHTML = `${capitalizeWords(data.weather[0].description)}`;
  feelsLike.innerHTML = `${kelvinToCelsius(data.main.feels_like).toFixed(1)}`;
  humidity.innerHTML = `${data.main.humidity}%`;
  wind.innerHTML = `${changeSpeed(data.wind.speed).toFixed(1)}km/h`;
  cloud.innerHTML = `${data.clouds.all}%`;
}

window.onload = weather("Calamba");

function changeSpeed(speed) {
  return speed * 3.6;
}

searchBar.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    weather(searchBar.value);
    console.log(searchBar.value);
  }
});

function kelvinToCelsius(degree) {
  return degree - 273.15;
}

function capitalizeWords(string) {
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
