const { cond } = require("lodash");
const farenheit = "°F";
const celsius = "°C";
const currentHour = new Date().getHours();
 const hourly = document.querySelectorAll('.hourly');
  const hourlyArray = Array.from(hourly);
  const hourlyGroups = [];

  for (let i = 0; i < 24; i += 8) {
    const hourGroup = hourlyArray.slice(i, i + 8);
    hourlyGroups.push(hourGroup);
  }
  const hourGroup1 = hourlyGroups[0];
  const hourGroup2 = hourlyGroups[1];
  const hourGroup3 = hourlyGroups[2];

  hourGroup1.forEach(hour => {
    hour.style.display = 'none'
  })
  hourGroup2.forEach(hour => {
    hour.style.display = 'none'
  })
  hourGroup3.forEach(hour => {
    hour.style.display = 'none'
  })

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
    const { location, condition, temperatureF, temperatureC, forecast, forecastHourly, current } = extractData(data);
    displayData(location, condition, temperatureF, temperatureC, forecast, forecastHourly, current);
    lastQuery = input;
    return data;
  } catch (error) {
    console.error(error);
    displayError();
  }
}

async function fetchData(input) {
  const response = await fetch("https://api.weatherapi.com/v1/forecast.json?key=20f112c532fa4178a5f12253232203&days=8&hours=25&q=" + queryFormatter(input));
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
  const allHourData = data.forecast.forecastday.flatMap(day => day.hour);
  const forecastHourly = allHourData.slice(currentHour, currentHour + 25);
  const current = data.current;
  return { location, condition, temperatureF, temperatureC, forecast, forecastHourly, current };
}

function displayData(location, condition, temperatureF, temperatureC, forecast, forecastHourly, current) {
  new createPage(location, condition, temperatureF, temperatureC);
  new createBottom(forecast, forecastHourly);
  new createRight(current, forecastHourly);
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
  let currentTemp = temperatureF + farenheit;
  
  const temperature = document.getElementById('temperature');
  temperature.innerHTML = currentTemp;
  
  const changeUnit = document.getElementById('changeUnit');
  changeUnit.addEventListener('click', () => {
    if (currentUnit === "celsius") {
      currentUnit = "farenheit";
      currentTemp = temperatureF + farenheit;
    } else {
      currentUnit = "celsius";
      currentTemp = temperatureC + celsius;
    }
    temperature.innerHTML = currentTemp;
  });
}

function forecastSwitch() {
  const daily = document.getElementById('daily');
  const hourly = document.getElementById('hourly');
  const leftBtn = document.getElementById('leftBtn');
  const rightBtn = document.getElementById('rightBtn');
  const circles = document.querySelectorAll('.circle');
  const hourlySwitch = document.getElementById('hourlySwitch');
  const forecastDailyDiv = document.getElementById('forecastDaily');
  const forecastHourlyDiv = document.getElementById('forecastHourly');
  if (forecastHourlyDiv.style.display = 'none') {
    forecastHourlyDiv.style.display = 'none';
    forecastDailyDiv.style.display = ''
  } else {
    forecastHourlyDiv.style.display = '';
    forecastDailyDiv.style.display = 'none'
  }
  let selectedIndex = 0;

  daily.classList.add("selected");
  hourlySwitch.style.display = 'none';

  daily.addEventListener('click', () => {
    daily.classList.add('selected');
    hourly.classList.remove('selected');
    hourlySwitch.style.display = 'none';
    forecastDailyDiv.style.display = '';
    forecastHourlyDiv.style.display = 'none';

  })

  hourly.addEventListener('click', () => {
    hourly.classList.add('selected');
    daily.classList.remove('selected');
    hourlySwitch.style.display = '';
    forecastDailyDiv.style.display = 'none';
    forecastHourlyDiv.style.display = '';
  })

circles[selectedIndex].classList.add('selected');
circles[selectedIndex].src = "imgs/circleFilled.png";

leftBtn.addEventListener('click', () => {
  circles[selectedIndex].classList.remove('selected');
  circles[selectedIndex].src = "imgs/circleThin.png";

  selectedIndex = (selectedIndex - 1 + circles.length) % circles.length;

  circles[selectedIndex].classList.add('selected');
  circles[selectedIndex].src = "imgs/circleFilled.png";
  displayHourly()
});

rightBtn.addEventListener('click', () => {
  circles[selectedIndex].classList.remove('selected');
  circles[selectedIndex].src = "imgs/circleThin.png";

  selectedIndex = (selectedIndex + 1) % circles.length;

  circles[selectedIndex].classList.add('selected');
  circles[selectedIndex].src = "imgs/circleFilled.png";
  displayHourly()
});

circles.forEach(circle => {
  circle.addEventListener('click', () => {
    circles.forEach(c => {
      c.classList.remove('selected');
      c.src = "imgs/circleThin.png";
    });
    circle.classList.add('selected');
    circle.src = "imgs/circleFilled.png";
    displayHourly()
  });
});
  displayHourly();
}

function displayHourly() {
  const circle1 = document.getElementById('circle1');
  const circle2 = document.getElementById('circle2');
  const circle3 = document.getElementById('circle3');
  if (circle1.classList.contains('selected')) {
    hourGroup1.forEach(hour => {
      hour.style.display = '';
    })
    hourGroup2.forEach(hour => {
      hour.style.display = 'none'
    })
    hourGroup3.forEach(hour => {
      hour.style.display = 'none'
    })
  } else if (circle2.classList.contains('selected')) {
    hourGroup1.forEach(hour => {
      hour.style.display = 'none';
    })
    hourGroup2.forEach(hour => {
      hour.style.display = ''
    })
    hourGroup3.forEach(hour => {
      hour.style.display = 'none'
    })
  } else if (circle3.classList.contains('selected')) {
    hourGroup1.forEach(hour => {
      hour.style.display = 'none';
    })
    hourGroup2.forEach(hour => {
      hour.style.display = 'none'
    })
    hourGroup3.forEach(hour => {
      hour.style.display = ''
    })
  }
}

function createBottom(forecast, forecastHourly) {
  forecastSwitch(daily);
  const days = document.querySelectorAll('#day');
  const daysIcon = document.querySelectorAll('#dayIcon');
  const dayTemperature = document.querySelectorAll('#dayTemperature');

  for (let i = 0; i < days.length; i++) {
    const date = forecast[i + 1].date;
    days[i].innerHTML = formatWeek(date);
  }

  for (let i = 0; i < daysIcon.length; i++) {
    const condition = forecast[i + 1].day.condition.text;
    daysIcon[i].src = weatherIcon(condition);
  }

  for (let i = 0; i < dayTemperature.length; i++) {
    const temperatureF = forecast[i].day.avgtemp_f;
    const temperatureC = forecast[i].day.avgtemp_c;

    let currentUnit = "farenheit";
    let currentTemp = temperatureF + farenheit;
    dayTemperature[i].innerHTML = currentTemp;
    
    const changeUnit = document.getElementById('changeUnit');
    changeUnit.addEventListener('click', () => {
      if (currentUnit === "celsius") {
        currentUnit = "farenheit";
        currentTemp = temperatureF + farenheit;
      } else {
        currentUnit = "celsius";
        currentTemp = temperatureC + celsius;
      }
      dayTemperature[i].innerHTML = currentTemp;
    });


  const hours = document.querySelectorAll('#hour');
  const hoursIcon = document.querySelectorAll('#hourIcon');
  const hourTemperature = document.querySelectorAll('#hourTemperature');

  for (let i = 0; i < hourly.length; i++) {
    const temperatureF = forecastHourly[i].temp_f;
    const temperatureC = forecastHourly[i].temp_c;
    let currentUnit = "farenheit";
    let currentTemp = temperatureF + farenheit;
    hourTemperature[i].innerHTML = currentTemp;
    const changeUnit = document.getElementById('changeUnit');
    changeUnit.addEventListener('click', () => {
      if (currentUnit === "celsius") {
        currentUnit = "farenheit";
        currentTemp = temperatureF + farenheit;
      } else {
        currentUnit = "celsius";
        currentTemp = temperatureC + celsius;
      }
      hourTemperature[i].innerHTML = currentTemp;
    });

    hours[i].innerHTML = formatHour(forecastHourly[i].time);

    const condition = forecastHourly[i].condition.text;
    hoursIcon[i].src = weatherIcon(condition);
    }
  }
}

function weatherIcon(condition) {
  if (condition.includes("Cloudy") || condition.includes("cloudy")) {
    return "./imgs/overcast.png";
  } else if (condition === "Overcast" || condition === "Mist" || condition === "Fog") {
    return "./imgs/overcast.png";
  } else if (condition === "Sunny" || condition === "Clear") {
    return "./imgs/sunny.png";
  } else if (condition.includes("rain")) {
    return "./imgs/rainy.png";
  }  else if (condition.includes("snow")) {
    return"./imgs/snow.png";
  } else {
    return"./imgs/default.png";
  }
}

function formatWeek(date) {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dateFormatted = new Date(date);
  const dayOfWeekIndex = dateFormatted.getDay();
  return daysOfWeek[dayOfWeekIndex];
}

function formatHour(hourString) {
  const time = new Date(hourString);
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

function createRight(current, forecastHourly) {
  console.log(current)
  const feelsTemp = document.getElementById('feelsTemp');
  const humidityPerc = document.getElementById('humidityPerc');
  const rainPerc = document.getElementById('rainPerc');
  const windKm = document.getElementById('windKm');

  console.log(forecastHourly) 

  humidityPerc.innerHTML = current.humidity + "%";
  rainPerc.innerHTML = forecastHourly[0].chance_of_rain + "%";
  windKm.innerHTML = forecastHourly[0].wind_kph + "km/h";


  const temperatureF = current.feelslike_f;
  const temperatureC = current.feelslike_c;
    let currentUnit = "farenheit";
    let currentTemp = temperatureF + farenheit;
    feelsTemp.innerHTML = currentTemp;
    
    const changeUnit = document.getElementById('changeUnit');
    changeUnit.addEventListener('click', () => {
      if (currentUnit === "celsius") {
        currentUnit = "farenheit";
        currentTemp = temperatureF + farenheit;
      } else {
        currentUnit = "celsius";
        currentTemp = temperatureC + celsius;
      }
      feelsTemp.innerHTML = currentTemp;
    });
}

function displayError() {
  const searchError = document.getElementById('searchError');
  searchError.style.display = "block";
}

getWeather(lastQuery);