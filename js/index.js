// End point to Call 16 day / daily forecast data
// api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}

// End point to Call current weather data
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}



// Variáveis e seleção de eventos
const apiKey = "4cb7f05e58631d34b9fc0f76373a5738";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityInput = document.querySelector("#city-input");
const submitButton = document.querySelector("#search-btn");

const  cityElement = document.querySelector("#city");
const  tempElement = document.querySelector("#temperature span");
const  descElement = document.querySelector("#description");
const  weatherIconElement = document.querySelector("#weather-icon");
const  countryElement = document.querySelector("#country");
const  humidityElement = document.querySelector("#humidity span");
const  windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

const errorMessageContainer = document.querySelector("#error-message");
const errorMessage = document.querySelector("#error-message span");
const loader = document.querySelector("#loader");
const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");

// Loader
const toggleLoader = () => {
    loader.classList.toggle("hide");
};

// Tratamento de Erros
const showErrorMessage = (message) => {
    errorMessage.innerText = message;
    errorMessageContainer.classList.remove("hide");
};

const hideInformation = () => {
    errorMessageContainer.classList.add("hide");
    weatherContainer.classList.add("hide");
    suggestionContainer.classList.add("hide");
};

// Funções
const getWeatherData = async (city) => {

    toggleLoader();

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    toggleLoader();

    return data;
};

const showWeatherData = async (city) => {
    hideInformation();

    const data = await getWeatherData(city);
    
    console.log(data);

    switch(data.cod) {
        case "400" :
            showErrorMessage("Digite uma cidade válida.");
        case "404" : 
            showErrorMessage("Cidade não encontrada.");
    }

    cityElement.innerText = data.name;
    countryElement.setAttribute(
        "src",
        `https://flagsapi.com/${data.sys.country}/flat/64.png`
    );
    weatherIconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    ) ;    
    windElement.innerText = `${Math.round(data.wind.speed)} km/h`;
    tempElement.innerText = `${parseInt(data.main.temp)}°C`;
    descElement.innerText = data.weather[0].description;
    humidityElement.innerText = `${data.main.humidity}%`;

    // Trocar imagem de fundo
    document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

    weatherContainer.classList.remove("hide");
}

function clearField() {
    cityInput.value = "";
}


// Eventos
submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);

    clearField();
});

cityInput.addEventListener("keyup", (e) => {

    if(e.code === "Enter"){
        const city = e.target.value;

        showWeatherData(city);
        clearField();
    }

});

suggestionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const city = btn.getAttribute("id");

        showWeatherData(city);
    });
});