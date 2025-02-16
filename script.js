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
                console.log(data);
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
                document.getElementById("city").textContent =`${data.location.name}, ${data.location.region}, ${data.location.country}`;
               
                // Fetch and display the country flag
                fetchCountryFlag(data.location.country);
                   // Change background based on weather condition
                   changeBackground(data.current.condition.text);
                
            })
            .catch(error => console.error("Error fetching weather data:", error));
    }

      // Function to fetch country flag from REST Countries API
      function fetchCountryFlag(country) {
        const url = `https://restcountries.com/v3.1/name/${country}`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                document.getElementById("country-flag").src = data[0].flags.png;
            })
            .catch(error => console.error("Error fetching country flag:", error));
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

    function changeBackground(condition) {
        let backgroundUrl;
        if (condition.includes("Clear")) {
            backgroundUrl = 'url("/images/sunny.jpg")';
        } else if (condition.includes("Rainy") || condition.includes("Showers")) {
            backgroundUrl = 'url("/images/rainy.jpg")';
        } else if (condition.includes("Partly Cloudy")) {
            backgroundUrl = 'url("images/cloudy.jpg")';
        } else if (condition.includes("Snowy")) {
            backgroundUrl = 'url("/images/snowy.jpg")';
        } else {
            backgroundUrl = 'url("/sky.jpg")';
        }
        document.body.style.backgroundImage = backgroundUrl;
    }
    // Get weather for entered city or user's location on button click
    document.getElementById("search-btn").addEventListener("click", function() {
        const city = document.getElementById("location").value;
        if (city) {
            fetchWeatherData(city, '');
        } else {
            getUserLocation();
        }

        // Get weather after the 'Enter' key is pressed
        document.getElementById("location").addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                const city = document.getElementById("location").value;
                if (city) {
                    fetchWeatherData(city, '');
                } else {
                    getUserLocation();
                }
            }
        });
        
    });

    // Optionally, get weather for user's location on page load
    getUserLocation();
});
