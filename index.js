const apikey = "5e8d32f2e85fe4350115b1352459a464"

const weatherDataEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input");

const formEl = document.getElementById("form");

formEl.addEventListener("submit" , (event)=>{
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData (cityValue)
});

async function getWeatherData(cityValue){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?
        q=${cityValue}&appid=${apikey}&units=metric`);

        console.log(cityValue);

        if(!response.ok){
        throw new Error("Network response was not ok")
        }

        const data = await response.json()

        const temperature = Math.round(data.main.temp)

        const description = data.weather[0].description

        const icon = data.weather[0].icon

        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed} m/s`,
        ];

        weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png"alt="weather Icon">`;

        weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`;
        weatherDataEl.querySelector(".description").textContent = description;

        weatherDataEl.querySelector(".details").innerHTML = details.map(
            (details) =>`<div>${details}</div>`
        ).join ("");



 
    }catch(error){

        weatherDataEl.querySelector(".icon").innerHTML = "" ;

        weatherDataEl.querySelector(".temperature").textContent = "";
        weatherDataEl.querySelector(".description").textContent = "An error happend try again later";

        weatherDataEl.querySelector(".details").innerHTML = "";

        console.error("fetch error: " , error);


    }

};