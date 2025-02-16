document.addEventListener("DOMContentLoaded", function() {
    const apiKey = "ad3ad70e69684cf389f234922251502"; 
    const unsplashAccessKey = "USLIMQWBYbeA6k5R3suHYmi2ljPZd1pw1kkD_L3iYQw";
    
    // const city = "London";

    // Function to fetch weather data
    function fetchWeatherData(lat, lon) {
        const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=1`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                document.getElementById("temp").textContent = data.current.temp_c + " °C";
                document.getElementById("humidity").textContent = data.current.humidity + " %";
                document.getElementById("description").textContent = data.current.condition.text;
                document.getElementById("feels-like").textContent = data.current.feelslike_c + " °C";
                document.getElementById("wind").textContent = data.current.wind_kph + " km/h " + data.current.wind_dir;
                document.getElementById("coordinates").textContent = `${data.location.lat}° N, ${data.location.lon}° E`;
                document.getElementById("sunrise").textContent = data.forecast.forecastday[0].astro.sunrise;
                document.getElementById("sunset").textContent = data.forecast.forecastday[0].astro.sunset;
                document.getElementById("weather-icon").src = `https:${data.current.condition.icon}`;
                document.getElementById("local-time").textContent = data.location.localtime;
                document.getElementById("city").textContent = data.location.name;

                
                
            })
            .catch(error => console.error("Error fetching weather data:", error));
    }


    // Function to get the user's location
    function getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeatherData(lat, lon);
            }, error => {
                console.error("Error getting location:", error);
                alert("Unable to retrieve your location. Please enter a city name.");
            });
        } else {
            alert("Geolocation is not supported by this browser. Please enter a city name.");
        }
    }

    // Get weather for entered city or user's location on button click
    document.getElementById("search-btn").addEventListener("click", function() {
        const city = document.getElementById("location").value;
        if (city) {
            fetchWeatherData(city, '');
        } else {
            getUserLocation();
        }
        
    });

    // Optionally, get weather for user's location on page load
    getUserLocation();
});
