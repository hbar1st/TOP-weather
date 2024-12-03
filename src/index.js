import "./styles.css";

async function getWeather(location) {
  try {
    let response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?iconSet=icons2&unitGroup=metric&key=FGYFZL7WCPJ7LS7GZ4BLL4RST`
    );
    let weather = await response.json();
    console.log(weather.currentConditions);
    console.log(weather.currentConditions.conditions);
    console.log(weather.currentConditions.precip);
    console.log(weather.currentConditions.temp);
    console.log(weather.currentConditions.windgust);
    console.log(weather.currentConditions.windspeed);
    console.log(weather.currentConditions.snow);
    console.log(weather.currentConditions.humidity);
    console.log(weather.currentConditions.icon);
    console.log(weather.currentConditions.feelslike);
  } catch (err) {
    alert(err);
  }
}

getWeather("london");
