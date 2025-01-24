const APIKey = "W5QUCJXAGK2BZBRFZC8LWPYQ5";

const location = document.querySelector(".location");
const searchBar = document.querySelector(".searchBar");

async function weather(location_name) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location_name}&appid=${APIKey}`
  );
  const data = await res.json();

  location.innerHTML = `<header>${data.name}, ${data.sys.country}</header>`;
}

searchBar.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    weather(searchBar.value);
    console.log(searchBar.value);
  }
});
