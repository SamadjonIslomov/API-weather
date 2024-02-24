const container = document.querySelector(".container");
const searchButton = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const cityInput = document.querySelector(".search-box input");
const APIKey = "27d7d8bcf5015828dc2efb1b6acd047d";

searchButton.addEventListener("click", searchWeather);

cityInput.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
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
            image.src = "haze.png";
            break;
          default:
            image.src = "mist.png";
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = json.weather[0].description;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)} km/h`;
        weatherBox.style.display = "block";
        weatherDetails.style.display = "flex";
        weatherBox.classList.add("fadeIn");
        weatherDetails.classList.add("fadeIn");
        container.style.height = "590px";
      }
    })
    .catch((error) => console.error("Fetch error:", error));
}
