const { cond } = require("lodash");

const locationQuery = document.getElementById('locationQ');
const submit = document.getElementById('submit');
submit.addEventListener('click', getQuery);

let lastQuery = "London";

function getQuery() {
  event.preventDefault();
  let locationValue = locationQuery.value;
  getWeather(locationValue);
  locationQuery.value = "";
}

async function getWeather(input) {
  try {
    const data = await fetchData(input);
    console.log(data);
    const { location, condition, temperatureF, temperatureC, forecast} = extractData(data);
    displayData(location, condition, temperatureF, temperatureC, forecast);
    lastQuery = input;
    return data;
  } catch (error) {
    console.error(error);
    displayError();
  }
}

async function fetchData(input) {
  const response = await fetch("https://api.weatherapi.com/v1/forecast.json?key=20f112c532fa4178a5f12253232203&days=8&q=" + queryFormatter(input));
  return response.json();
}

function queryFormatter(input) {
  if (typeof input === 'number') {
    return input;
  } else {
    return input.replace(/ /g, '+');
  }
}

function extractData(data) {
  const location = data.location.name;
  const condition = data.current.condition.text;
  const temperatureF = data.current.temp_f;
  const temperatureC = data.current.temp_c;
  const forecast = data.forecast.forecastday;
  return { location, condition, temperatureF, temperatureC, forecast };
}

function displayData(location, condition, temperatureF, temperatureC, forecast) {
  new createPage(location, condition, temperatureF, temperatureC);
  new createBottom(forecast);
  const searchError = document.getElementById('searchError');
  searchError.style.display = "none";
}

function createPage(location, condition, temperatureF, temperatureC) {
  const locationDiv = document.getElementById('location');
  locationDiv.innerHTML = location;
  
  const conditionDiv = document.getElementById('condition');
  conditionDiv.innerHTML = condition;
  temperatureImg = document.getElementById('temperatureImg');
  temperatureImg.src = weatherIcon(condition);
  
  let currentUnit = "farenheit";
  let currentTemp = temperatureF + " °F";
  
  const temperature = document.getElementById('temperature');
  temperature.innerHTML = currentTemp;
  
  const changeUnit = document.getElementById('changeUnit');
  changeUnit.addEventListener('click', () => {
    if (currentUnit === "celsius") {
      currentUnit = "farenheit";
      currentTemp = temperatureF + " °F";
    } else {
      currentUnit = "celsius";
      currentTemp = temperatureC + " °C";
    }
    temperature.innerHTML = currentTemp;
  });
}

function createBottom(forecast) {
  const days = document.querySelectorAll('#day');
  const daysIcon = document.querySelectorAll('#dayIcon');
  const dayTemperature = document.querySelectorAll('#dayTemperature')

  for (let i = 0; i < days.length; i++) {
    const date = forecast[i + 1].date;
    days[i].innerHTML = getDayOfWeek(date);
  }

  for (let i = 0; i < daysIcon.length; i++) {
    const condition = forecast[i + 1].day.condition.text;
    daysIcon[i].src = weatherIcon(condition);
  }

  for (let i = 0; i < dayTemperature.length; i++) {
    const temperatureF = forecast[i].day.avgtemp_f;
    const temperatureC = forecast[i].day.avgtemp_c;

    let currentUnit = "farenheit";
    let currentTemp = temperatureF + " °F";
    dayTemperature[i].innerHTML = currentTemp;
    
    const changeUnit = document.getElementById('changeUnit');
    changeUnit.addEventListener('click', () => {
      if (currentUnit === "celsius") {
        currentUnit = "farenheit";
        currentTemp = temperatureF + "°F";
      } else {
        currentUnit = "celsius";
        currentTemp = temperatureC + "°C";
      }
      dayTemperature[i].innerHTML = currentTemp;
    });
  }
}

function weatherIcon(condition) {
  if (condition.includes("Cloudy") || condition.includes("cloudy")) {
    return "./imgs/overcast.png";
  } else if (condition === "Overcast" || condition === "Mist") {
    return "./imgs/overcast.png";
  } else if (condition === "Sunny") {
    return "./imgs/sunny.png";
  } else if (condition.includes("rain")) {
    return "./imgs/rainy.png";
  }  else if (condition.includes("snow")) {
    return"./imgs/snow.png";
  } else {
    return"./imgs/default.png";
  }
}

function getDayOfWeek(date) {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dateFormatted = new Date(date);
  const dayOfWeekIndex = dateFormatted.getDay();
  return daysOfWeek[dayOfWeekIndex];
}

function displayError() {
  const searchError = document.getElementById('searchError');
  searchError.style.display = "block";
}

getWeather(lastQuery);