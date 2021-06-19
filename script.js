/*  SELECTORS   */
const cityInput = document.querySelector('.city-search .city-input');
const searchBtn = document.querySelector('.search-btn');
const cityWeatherAll = document.querySelector('.city-weather');
const errorMsg = document.querySelector('.errorMsg');
const btnDelete = document.querySelector('.btnDelete');

const apiKey = "41e8db017d0053889d542b749b05821c";

/*  EVENTLISTENERS  */
searchBtn.addEventListener('click', addCity);
cityWeatherAll.addEventListener('click', removeCity);



/*  FUNCTIONS   */
async function addCity(event) {
    event.preventDefault();

    const cityName = cityInput.value;

    if (cityName === '') return;

    // fetch weather data from city
    const weatherData = await fetchWeatherData(cityName, apiKey);

    // if city doesnt exist
    if (weatherData.cod === "404") {
        errorMsg.innerText = weatherData.message + "!";
        cityInput.value = '';
        return;
    } else {
        errorMsg.innerText = '';
    }

    // if city is already listed   
    if (isDuplicate(weatherData.name) >= 1) {
        errorMsg.innerText = 'City already exist.'
        cityInput.value = '';
        return;
    } else {
        errorMsg.innerText = '';
    }

    createCard(weatherData);

    // clear Searchbar
    cityInput.value = '';
};

async function fetchWeatherData(city, apiKey) {
    let response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey);
    let weatherData = await response.json();

    return weatherData;
};

// check of duplicates
function isDuplicate(cityInput) {
    const citys = document.querySelectorAll('.card h3 .cityName')
    cityInput = cityInput.charAt(0).toUpperCase() + cityInput.slice(1)
    
    let count = 0;

    citys.forEach(city => {
        if (city.innerText === cityInput)
            count++;
    })
    return count;
};

// create new card
function createCard(weatherData) {
    // create new card
    const city = document.createElement('div');
    city.classList.add('card');

    city.innerHTML = `
        <h3><span class="cityName">${weatherData.name}</span><span>, </span><span>${weatherData.sys.country}</span></h3>
        <span class="temperature">${Math.round(weatherData.main.temp)}°C</span>
        <i class="fas ${getWeatherIcon()}"></i>
        <span>${weatherData.weather[0].description}</span>
        <span class="btnDelete">x</span>
    `;
    // append finished card to Website
    cityWeatherAll.appendChild(city);
};

function getWeatherIcon(weatherdata) {
    //TODO
};

function removeCity(e) {
    const clickedElement = e.target; 

    if (clickedElement.classList[0] === 'btnDelete') {
        // get parent element from item class="trash-btn"
        const parentElement = clickedElement.parentElement;
        parentElement.classList.add('minimize');
    
        // remove todo from LS
        //removeCityFromLS(parentElement);
    
        // wait till Animation ends then execute function
        parentElement.addEventListener('transitionend', () => {
            // remove item
            parentElement.remove();
        });
    }
};

function getCitysFromLS() {
    //TODO
}

function saveCityToLS() {
    //TODO
}

function removeCityFromLS() {
    //TODO
}



