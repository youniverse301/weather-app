let query = "Fairfax Station";
function queryFormatter(input) {
    if (typeof input === 'number') {
      return input;
    } else {
      return input.replace(/ /g, '+');
    }
  }
  

async function getWeather() {
    try {
        const response = await fetch("https://api.weatherapi.com/v1/current.json?key=20f112c532fa4178a5f12253232203&q=" + queryFormatter(query));
        const data = await response.json();
        console.log(data);
        const location = data.location.name;
        const condition = data.current.condition.text;
        const temperature = data.current.temp_f;
        console.log(temperature);
        new createPage(location,condition,temperature);
    return data;
    } catch (error) {
        console.error(error);
    }
}


function createPage(location,condition,temperature) {
     this.location = location;
     const locationDiv = document.getElementById('location');
     locationDiv.innerHTML= location;
     this.conition = condition;
     const conditionDiv = document.getElementById('condition');
     conditionDiv.innerHTML= condition;
     this.temperature = temperature;
     const temperatureDiv = document.getElementById('temperature');
     temperatureDiv.innerHTML= temperature;
}


getWeather();