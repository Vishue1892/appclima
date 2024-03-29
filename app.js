const APIKEY='b9ccdc33a8afe106f327b7dcaaa19644';
//API KEY for the OpenWeatherMap.org service, free to use but please keep this
const URLBASE="https://api.openweathermap.org/data/2.5/weather?";

async function request(url){
    return fetch(url).then(data => data.json());
}


async function getWeather(lat, lon){
    url=`${ URLBASE }lat=${lat}&lon=${lon}&appid=${APIKEY}`;
    const weather=await request(url);
    console.log(weather);
    updateDOM(weather.name, weather.main.temp);
}

async function getWeatherByCity(city){
    const url=URLBASE+`q=${city}&appid=${APIKEY}`;
    const weather=await request(url);
    updateDOM(weather.name, weather.main.temp);
}

function updateDOM(city, temp) {
    //Actualizar h2 de Ciudad
    //Actualizar h1 de Clima
    //Actualizar fondo dependiendo de la temperatura
    document.querySelector("h2").textContent = city;
    let celsius=(temp - 273.15).toFixed(2);
    document.querySelector("h1").textContent = `${(celsius)}°C`;
    if (celsius > 25) {
        document.body.style.backgroundColor = "red";
        } else if (celsius > 20) {
            document.body.style.backgroundColor = "orange";
            } else {
                document.body.style.backgroundColor = "lightblue";
                }
}
navigator.geolocation.getCurrentPosition(position =>{
    const lat=position.coords.latitude;
    const lon=position.coords.longitude;
    getWeather(lat,lon);
}); 

document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value.trim();
    if (cityName) {
        getWeatherByCity(cityName);
        cityInput.value = ''; // Limpiar el campo después de la búsqueda
    }
});