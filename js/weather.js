const weathers = ["☁", "⛅", "🌧"]
const API_KEY = "9c3640eecac9f7bffab0aeba3753d0c2"


function onGeoOk(position){
    const lat = position.coords.latitude;
    const log = position.coords.longitude;
    const lang = "KR"

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${API_KEY}&units=metric&lang=${lang}`
    fetch(url).then(response => response.json())
    .then(data => {
        const city = document.querySelector("#weather span:first-child")
        const weather = document.querySelector("#weather span:last-child")
    
        console.dir(data)
        city.innerText = data.name
        weather.innerText = `${data.weather[0].description}     ${data.main.temp}º`
    })
}
function onGeoError(){
    alert("Can't find you. No weather for you.")
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError)