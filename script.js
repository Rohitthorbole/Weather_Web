const apiKey = 'cb493a96b85a2f352100e5002bf7d73a';

async function fetchWeatherData() {
    const city = document.getElementById('city-input').value;
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = '';

    if (!city) {
        errorMessage.textContent = 'Please enter a city name';
        return;
    }
    const geoApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

    try {
        const geoResponse = await fetch(geoApiUrl);
        if (!geoResponse.ok) {
            throw new Error('Network response was not ok');
        }
        const geoData = await geoResponse.json();
        if (geoData.length === 0) {
            errorMessage.textContent = 'No data found for the specified location.';
            return;
        }
        const { lat, lon } = geoData[0];
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        const weatherResponse = await fetch(weatherApiUrl);
        if (!weatherResponse.ok) {
            throw new Error('Network response was not ok');
        }
        const weatherData = await weatherResponse.json();
        displayWeatherData(weatherData);
    } catch (error) {
        errorMessage.textContent = `Error: ${error.message}`;
    }
}

function displayWeatherData(data) {
    const temperature = data.main.temp;
    const windSpeed = data.wind.speed;
    const humidity = data.main.humidity;

    const tempValue = document.getElementById('temp-value');
    const rainValue = document.getElementById('rain-value');
    const windValue = document.getElementById('wind-value');

    if (tempValue && rainValue && windValue) {
        tempValue.textContent = `${temperature}°C`;
        rainValue.textContent = `${humidity}%`;
        windValue.textContent = `${windSpeed} m/s`;

        
        document.getElementById('weather-display').style.visibility = 'visible';
    } else {
        document.getElementById('error-message').textContent = 'Error: Unable to display weather data.';
    }
}

function checkEnter(event) {
    if (event.key === 'Enter') {
        fetchWeatherData();
    }
}

function hideWeatherDisplay() {
    document.getElementById('weather-display').style.visibility = 'hidden';
}
