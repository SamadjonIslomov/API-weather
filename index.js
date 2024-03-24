const container = document.querySelector(".container");
const searchButton = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const date = document.querySelector("#current-date");
const cityInput = document.querySelector(".search-box input");
const APIKey = "27d7d8bcf5015828dc2efb1b6acd047d";
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const cityName = document.querySelector(".city");
const BtnCity = document.querySelector(".cityBtn");
const region = document.querySelector(".cityName");
const regions = [
  document.querySelector(".region1"),
  document.querySelector(".region2"),
  document.querySelector(".region3"),
  document.querySelector(".region4"),
  document.querySelector(".region5"),
  document.querySelector(".region6"),
  document.querySelector(".region7"),
  document.querySelector(".region8"),
  document.querySelector(".region9"),
  document.querySelector(".region10"),
  document.querySelector(".region11"),
  document.querySelector(".region12"),
];

searchButton.addEventListener("click", searchWeather);

cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchWeather();
  }
});

function searchWeather() {
  const city = cityInput.value.trim();
  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        date.style.display = "none";
        btn.style.display = "none";
      } else {
        error404.style.display = "none";
        error404.classList.remove("fadeIn");

        const image = document.querySelector(".weather-box img");
        const temperature = document.querySelector(".weather-box .temperature");
        const description = document.querySelector(".weather-box .description");
        const humidity = document.querySelector(
          ".weather-details .humidity span"
        );
        const wind = document.querySelector(".weather-details .wind span");

        switch (json.weather[0].main) {
          case "Clear":
            image.src = "clear.png";
            break;
          case "Rain":
            image.src = "rain.png";
            break;
          case "Snow":
            image.src = "snow.png";
            break;
          case "Clouds":
            image.src = "cloud.png";
            break;
          case "Haze":
            image.src = "mist.png";
            break;
          default:
            image.src = "mist.png";
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = json.weather[0].description;
        humidity.innerHTML = `${json.main.humidity}%  `;
        wind.innerHTML = `${parseInt(json.wind.speed)} km/h`;
        weatherBox.style.display = "block";
        weatherDetails.style.display = "flex";
        weatherBox.classList.add("fadeIn");
        weatherDetails.classList.add("fadeIn");
        container.style.height = "630px";
        date.style.display = "block";
        btn.style.display = "block";
      }
    })
    .catch((error) => console.error("Fetch error:", error));
}
document.addEventListener("DOMContentLoaded", function () {
  showCurrentDate();
});

function showCurrentDate() {
  const now = new Date();
  const dateString = now.toLocaleDateString("uz-UZ", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  document.getElementById("current-date").textContent = dateString;
}
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    region.style.scale = "0";
    modal.style.scale = "0";
  }
});
BtnCity.addEventListener("click", () => {
  modal.style.scale = "1";
  region.style.scale = "1";
  regions.forEach((reg) => {
    reg.style.display = "block";
  });
});
modal.addEventListener("click", () => {
  modal.style.scale = "0";
  region.style.scale = "0";
});
// Regions uchun event listener qo'shish
function setupRegionClicks() {
  regions.forEach((region) => {
    region.addEventListener("click", function () {
      cityInput.value = this.textContent;
      modal.style.scale = "0";
      regions.forEach((reg) => {
        reg.style.display = "none";
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  setupRegionClicks();
  showCurrentDate();
});
