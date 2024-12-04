export { initializeListener };

function initializeListener(docObj) {
  const formEl = docObj.querySelector("form");
  const inputEl = docObj.querySelector("input");
  const sectionEl = getSectionEl(docObj);

  formEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    sectionEl.innerHTML = `<h2>Please wait. Your results are loading.</h2> <div class="tenor-gif-embed" data-postid="1555691742468449884" data-share-method="host" data-aspect-ratio="0.923695" data-width="100%"><a href="https://tenor.com/view/lilpotate-lil-potate-lilpotates-lil-potates-potato-gif-1555691742468449884">Lilpotate Lil Potate GIF</a>from <a href="https://tenor.com/search/lilpotate-gifs">Lilpotate GIFs</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>`;
    const wObj = await getWeather(inputEl.value);
    if (wObj) {
      showWeather(docObj, wObj);
    } else {
      showInstructions(docObj);
    }
  });
}

function getSectionEl(docObj) {
  return docObj.querySelector("main section");
}

function showWeather(docObj, wObj) {
  let sectionEl = getSectionEl(docObj);
  sectionEl.innerHTML = `<h2>${wObj.address}</h2>`;
  let divEl = `<div class="results weather">
  <img class="icon" src="${wObj.iconImg}" alt="${wObj.icon} icon">
  <p id="temp">${wObj.temp}℃</p>
  <div class="row">
    <div>Feels like ${wObj.feelslike}℃</div>
    <div>Conditions: ${wObj.conditions}</div>
  </div>
  <div class="row">
    <div>Humidity: ${wObj.humidity}</div>
    <div>Wind gust: ${wObj.windgust}</div>
    <div>Wind speed: ${wObj.windspeed}</div>
  </div>`;
  divEl += wObj.preciptype
    ? `<div class="row">
        <div>Precipitation expected: ${wObj.preciptype}</div> 
        <div>Chance of Precipitation: ${wObj.precipprob}</div>
       </div></div>`
    : `</div>`;
  sectionEl.innerHTML += divEl;
}

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
    if (response.ok) {
      const weather = await response.json();
      const weatherObj = makeWeatherObj(weather);

      function makeWeatherObj(w) {
        const iconFileName = `${w.currentConditions.icon}.svg`;

        return {
          address: w.resolvedAddress,
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
    } else {
      alert(`I can't find this location: ${location}. So sorry!`);
      return null;
    }
  } catch (err) {
    alert(err);
  }
}

function showInstructions(docObj) {
  const sectionEl = getSectionEl(docObj);
  sectionEl.innerHTML = `<h2>Get today's weather! Enter your location.</h2>
        <iframe
          src="https://giphy.com/embed/ZxLr4sFdcSRVhajXli"
          class="giphy-embed results"
          allowfullscreen
        ></iframe>
        <p>
          <a
            href="https://giphy.com/gifs/rain-weather-forecast-ZxLr4sFdcSRVhajXli"
            >via GIPHY</a
          >
        </p>`;
}
