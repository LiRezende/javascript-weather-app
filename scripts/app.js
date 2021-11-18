const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUi = (data) => {
  // Destructure properties
  const { cityDetails, weather } = data;

  // Update details template
  details.innerHTML = `
  <h5 class="my-3">${cityDetails.EnglishName}</h5>
  <div class="my-3 weather-condition">${weather.WeatherText}</div>
  <div class="display-4 my-4">
    <span>${weather.Temperature.Metric.Value}</span>
    <span>&deg;C</span>
  </div>
  `;

  // Update weather icons
  const iconSrc = `assets/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  // Update time images
  let timeSrc = null;
  if (weather.IsDayTime) {
    timeSrc = "assets/img/day.svg";
  } else {
    timeSrc = "assets/img/night.svg";
  }
  time.setAttribute("src", timeSrc);

  // Remove the 'd-none' class to display the card with weather information
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  // Using object shorthand notation
  return {
    cityDetails,
    weather,
  };
};

// Gets the form value
cityForm.addEventListener("submit", (e) => {
  // Prevent default action
  e.preventDefault();

  // Get city form value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // Update the ui with new city
  updateCity(city)
    .then((data) => updateUi(data))
    .catch((err) => console.log(err));
});
