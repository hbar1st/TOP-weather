import "./styles.css";

/*import clearDaySvg from "./assets/clear-day.svg";    
import partlyCloudyDaySvg from "./assets/partly-cloudy-day.svg";        
import rainSvg from "./assets/rain.svg";              
import snowShowersNightSvg from "./assets/snow-showers-night.svg";     
import thunderSvg from "./assets/thunder.svg";
import clearNightSvg from "./assets/clear-night.svg";  
import partlyCloudyNightSvg from "./assets/partly-cloudy-night.svg";      
import showersDaySvg from "./assets/showers-day.svg";       
import snowSvg from "./assets/snow.svg";                   
import windSvg from "./assets/wind.svg";
import cloudySvg from "./assets/cloudy.svg";       
import rainSnowShowersDaySvg from "./assets/rain-snow-showers-day.svg";    
import showersNightSvg from "./assets/showers-night.svg";     
import thunderRainSvg from "./assets/thunder-rain.svg";
import fogSvg from "./assets/fog.svg";          
import rainSnowShowersNightSvg from "./assets/rain-snow-showers-night.svg";  
import sleetSvg from "./assets/sleet.svg";             
import thunderShowersDaySvg from "./assets/thunder-showers-day.svg";
import hailSvg from "./assets/hail.svg";         
import rainSnowSvg from "./assets/rain-snow.svg";                
import snowShowersDaySvg from "./assets/snow-showers-day.svg";  
import thunderShowersNightSvg from "./assets/thunder-showers-night.svg";*/

function importAll(r) {
  let images = {};
  r.keys().map((item) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images = importAll(require.context("./assets", false, /\.svg$/));

async function getWeather(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?iconSet=icons2&unitGroup=metric&key=FGYFZL7WCPJ7LS7GZ4BLL4RST`
    );

    const weather = await response.json();
    const weatherObj = makeWeatherObj(weather);

    function makeWeatherObj(w) {
      const iconFileName = `${w.currentConditions.icon}.svg`;

      return {
        conditions: w.currentConditions.conditions,
        precip: w.currentConditions.precip,
        preciptype: w.currentConditions.preciptype,
        precipprob: w.currentConditions.precipprob,
        temp: w.currentConditions.temp,
        windgust: w.currentConditions.windgust,
        windspeed: w.currentConditions.windspeed,
        snow: w.currentConditions.snow,
        humidity: w.currentConditions.humidity,
        icon: w.currentConditions.icon,
        iconImg: `${images[iconFileName]}`,
        feelslike: w.currentConditions.feelslike,
      };
    }

    return weatherObj;
  } catch (err) {
    alert(err);
  }
}

getWeather("london");
