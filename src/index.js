const locationQuery = document.getElementById('locationQ');
const submit = document.getElementById('submit');
submit.addEventListener('click', getQuery);

let lastQuery = "London";

function getQuery() {
  event.preventDefault();
  let locationValue = locationQuery.value;
  const temperature = document.getElementById('temperature');
  temperature.classList.add("farenheit"); // Add "farenheit" class to temperature element
  getWeather(locationValue);
  locationQuery.value = "";
}

async function getWeather(input) {
  try {
    const data = await fetchData(input);
    const { location, condition, temperatureF, temperatureC } = extractData(data);
    displayData(location, condition, temperatureF, temperatureC);
    lastQuery = input;
    return data;
  } catch (error) {
    console.error(error);
    displayError();
  }
}

async function fetchData(input) {
  const response = await fetch("https://api.weatherapi.com/v1/current.json?key=20f112c532fa4178a5f12253232203&q=" + queryFormatter(input));
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
  return { location, condition, temperatureF, temperatureC };
}

function displayData(location, condition, temperatureF, temperatureC) {
  new createPage(location, condition, temperatureF, temperatureC);
  const searchError = document.getElementById('searchError');
  searchError.style.display = "none";
}

function createPage(location, condition, temperatureF, temperatureC) {
  const locationDiv = document.getElementById('location');
  locationDiv.innerHTML = location;
  
  const conditionDiv = document.getElementById('condition');
  conditionDiv.innerHTML = condition;
  
  let currentUnit = "farenheit";
  let currentTemp = temperatureF;
  
  const temperature = document.getElementById('temperature');
  temperature.innerHTML = checkUnit(currentTemp, currentUnit);
  
  const changeUnit = document.getElementById('changeUnit');
  changeUnit.addEventListener('click', function() {
    if (currentUnit === "farenheit") {
      currentUnit = "celsius";
      currentTemp = temperatureC + " °C";
    } else {
      currentUnit = "farenheit";
      currentTemp = temperatureF + " °F";
    }
    temperature.innerHTML = currentTemp;
  });
}

function displayError() {
  const searchError = document.getElementById('searchError');
  searchError.style.display = "block";
}

const temperatureDiv = document.getElementById('temperature');
temperatureDiv.classList.add("farenheit");
getWeather(lastQuery);
