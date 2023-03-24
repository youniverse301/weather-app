async function getWeather(input) {
  try {
    const data = await fetchData(input);
    const { location, condition, temperatureF, temperatureC } = extractData(data);
    displayData(location, condition, temperatureF, temperatureC);
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

function createPage(location,condition,temperatureF,temperatureC) {
  this.location = location;
  const locationDiv = document.getElementById('location');
  locationDiv.innerHTML= location;
  this.conition = condition;
  const conditionDiv = document.getElementById('condition');
  conditionDiv.innerHTML= condition;
  this.temperatureF = temperatureF;
  this.temperatureC = temperatureC;
  temperature = document.getElementById('temperature');
  temperature.innerHTML = checkUnit1(temperatureF,temperatureC)
  const changeUnit = document.getElementById('changeUnit');
  changeUnit.addEventListener('click', function() {
    temperature.innerHTML = checkUnit2(temperatureF, temperatureC);
  });
  }

  function checkUnit1(temperatureF,temperatureC) {
    if (temperature.classList.contains('farenheit')) {
      return temperatureF + " °F"
    } else {  
      return temperatureC + " °C"
    }
  }

function checkUnit2(temperatureF,temperatureC) {
  if (temperature.classList.contains('farenheit')) {
    temperature.classList.remove("farenheit");
    temperature.classList.add("celsius");    
    return temperatureC + " °C"
  } else {
    temperature.classList.remove("celsius");
    temperature.classList.add("farenheit");        
    return temperatureF + " °F"
  }
}

const changeUnit = document.getElementById('changeUnit');



function displayError() {
  const searchError = document.getElementById('searchError');
  searchError.style.display = "block";
}


const locationQuery = document.getElementById('locationQ');
const submit = document.getElementById('submit');
submit.addEventListener('click', getQuery);

function getQuery() {
    event.preventDefault();
     let locationValue = locationQuery.value;
     getWeather(locationValue);
     console.log(locationValue);
     locationQuery.value = "";
}
const temperatureDiv = document.getElementById('temperature');
temperatureDiv.classList.add("farenheit");
let defaultCity = "London";
getWeather(defaultCity);