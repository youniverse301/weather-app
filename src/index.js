let query = "Fairfax Station";
function queryFormatter(string) {
    return string.replace(/ /g, '+');
  }

async function getWeather() {
    try {
        const response = await fetch("https://api.weatherapi.com/v1/current.json?key=20f112c532fa4178a5f12253232203&q=" + queryFormatter(query));
        const data = await response.json();
        console.log(data);
        const condition = data.current.condition.text;
        const location = data.location.name;
        const temperature = data.current.feelslike_f;
        console.log(temperature);
        new createPage(condition,location,temperature);
    return data;
    } catch (error) {
        console.error(error);
    }
}

function createPage(condition,location,temperature) {
     this.conition = condition;
     const conditionDiv = document.getElementById('condition');
     conditionDiv.innerHTML= condition;
     this.location = location;
     const locationDiv = document.getElementById('location');
     locationDiv.innerHTML= location;
     this.temperature = temperature;
     const temperatureDiv = document.getElementById('temperature');
     temperatureDiv.innerHTML= temperature;
}


getWeather();