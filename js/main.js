const countryBox = document.querySelector('#country');
const countryBtn = document.querySelector('#country-btn');

// get Coords
const getCoords = (countryName, responseData) => {
  let result = {
    status : 'Not Found',
    coords : {
      lat : undefined,
      long : undefined
    }
  };

  responseData.forEach(eachCountry => {
    if(eachCountry.name.toLowerCase() == countryName.toLowerCase()) {
      result.status = 'Found';
      result.coords.lat = eachCountry.latlng[0];
      result.coords.long = eachCountry.latlng[1];
    }
  });

  return result;
};

// showMap
const showMap = result => {
  const mapId = document.querySelector('#mapid');

  if(result.status == 'Not Found') {
    mapId.innerHTML = 'Country Not Found!';
  } else {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic291cmF2LW1hbG8iLCJhIjoiY2tlbWlxN2x6MmJhNjJxbnY4cmx6OHFtdCJ9.LWKtCrZgPis_dmbXPwRXYg';
    var map = new mapboxgl.Map({
      container: 'mapid',
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: [result.coords.long, result.coords.lat], // starting position [lng, lat]
      zoom: 5 // starting zoom
    });
  }
};

// show Country Details
const showCountryDetails = result => {
  const output = document.querySelector('#output');

  if(result.status == 'Not Found') {
    output.innerHTML = 'Country Not Found!';
  } else {
    // XHR Request 
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      if(xhr.status == 200 && xhr.readyState == 4) {
        const responseData = JSON.parse(xhr.responseText);
      
        showExchangeRates(responseData[0].currencies[0].code); // invoking

        output.innerHTML = '<h1>'+responseData[0].name+'</h1>';
        output.innerHTML += '<div>Population: '+responseData[0].population+'</div>';
        output.innerHTML += '<div>Capital: '+responseData[0].capital+'</div>';
        output.innerHTML += '<div>Currency: '+responseData[0].currencies[0].name+'</div>';
        output.innerHTML += '<div>Language: '+responseData[0].languages[0].name+'</div>';
        output.innerHTML += `<div><img src=${responseData[0].flag}></div>`;
      }
    });
    xhr.open('GET', `php/get-country-info.php?countryName=${countryBox.value}`, true);
    xhr.send();
  }
};

// show weather
const showWeather = result => {
  const weather = document.querySelector('#weather');

  if(result.status == 'Not Found') {
    weather.innerHTML = 'Country Not Found!';
  } else {
    // XHR Request 
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      if(xhr.status == 200 && xhr.readyState == 4) {
        const responseData = JSON.parse(xhr.responseText);
        const temp = responseData.main.temp - 273;
      
        weather.innerHTML = `Current Temperature: ${temp.toFixed(1)}&#176;C`;
      }
    });
    xhr.open('GET', `php/get-weather-info.php?lat=${result.coords.lat}&lon=${result.coords.long}`, true);
    xhr.send();
  }
};

// show exchange rate
const showExchangeRates = currencyCode => {
  const exchangeRate = document.querySelector('#exchange-rate');

  // XHR Request 
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    if(xhr.status == 200 && xhr.readyState == 4) {
      const responseData = JSON.parse(xhr.responseText);
      
      let currencyValueBaseUSD = undefined;
      Object.keys(responseData.rates).forEach(key => {
        const curCurrencyCode = key;
        const curCurrencyValue =  responseData.rates[key];
        if(curCurrencyCode == currencyCode) {
          currencyValueBaseUSD = curCurrencyValue;
        }
      });

      const EURRateBaseUSD = responseData.rates.EUR;

      const toUSD =  (1 / currencyValueBaseUSD).toFixed(3);
      const toEUR = (toUSD * EURRateBaseUSD).toFixed(3);

      exchangeRate.innerHTML = `<div>1 ${currencyCode} = ${toUSD} USD</div>`;
      exchangeRate.innerHTML += `<div>1 ${currencyCode} = ${toEUR} EUR</div>`;
    }
  });
  xhr.open('GET', `php/get-exchange-rate.php`, true);
  xhr.send();
};

countryBtn.addEventListener('click', () => {
  const countryName = countryBox.value;
  
  // XHR Request 
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    if(xhr.status == 200 && xhr.readyState == 4) {
      const responseData = JSON.parse(xhr.responseText);
      const result = getCoords(countryName, responseData); // invoking
      showMap(result); // invoking
      showCountryDetails(result); // invoking
      showWeather(result); // invoking
    }
  });
  xhr.open('GET', 'js/countries.json', true);
  xhr.send();
});