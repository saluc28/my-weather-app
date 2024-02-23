import { apiKey } from apiKey

const weatherForm = document.querySelector(".weatherForm");

const cityInput = document.querySelector(".cityInput");

const card = document.querySelector(".card");



weatherForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const city = cityInput.value;

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.log(error);
            displayError(error);
        }
    } else {
        displayError("Per piacere scegli una città ");
    }

});


async function getWeatherData(city) {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=${"it"}`

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Scegli una città vera")
    }

    return await response.json()

}

const displayWeatherInfo = (data) => {

    const { name: city,
        main: { temp, humidity },
        weather: [{ description, id }] } = data;

    card.textContent = "";

    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");


    cityDisplay.textContent = city;
    tempDisplay.textContent = `${Math.floor(temp - 273)} °C`
    humidityDisplay.textContent = `Umidità: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);


    cityDisplay.classList.add("cityDisplay")
    tempDisplay.classList.add("tempDisplay")
    humidityDisplay.classList.add("humidityDisplay")
    descDisplay.classList.add("descDisplay")
    weatherEmoji.classList.add("weatherEmoji")



    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);



}

const getWeatherEmoji = (weatherId) => {

    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "🌩";
        case (weatherId >= 300 && weatherId < 599):
            return "🌧";
        case (weatherId >= 600 && weatherId < 700):
            return "🌨";
        case (weatherId >= 700 && weatherId < 800):
            return "😶‍🌫️";
        case (weatherId === 800):
            return "🌞";
        case (weatherId >= 801 && weatherId < 8010):
            return "🌥";
        default: "???"
    }

}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;

    errorDisplay.classList.add("errorDisplay")

    card.textContent = "";

    card.style.display = "flex";

    card.appendChild(errorDisplay)
}


