import { getWeather } from "./api.js";
import { likedCities } from "./likedCities.js";
import { renderWeather, renderForecast, renderLikedCities, showLoading, getElements } from "./ui.js";
import { saveCurrentCity, loadCurrentCity } from "./utils.js";

const elements = getElements();

document.addEventListener('DOMContentLoaded', ()=> {
    const savedCity = loadCurrentCity();
    if(savedCity) {
        loadWeather(savedCity);
    }
    likedCities.init();
    renderLikedCities([...likedCities.list], elements.cityList, deleteCity, selectCity);
})

elements.form.addEventListener('submit', onSubmit);
elements.likeBtn.addEventListener('click', toogleLike);

function onSubmit(e) {
    e.preventDefault();
    const cityName= e.target.elements.searchCity.value.trim();

    if(!cityName) {
        return alert("Введите название города");
    }
 
    showLoading(elements.imgContainer);

    saveCurrentCity(cityName);
    loadWeather(cityName);
}

function loadWeather(cityName) {
    getWeather(cityName)
        .then(data => {
            console.log(data);
            renderWeather(data, cityName, elements);
            syncLikeBtn(cityName);
            renderForecast(data, elements.forecastContainer);
        })
        .catch((error) => {
            handleWeatherError(error);
        })
}

function handleWeatherError(error) {
    const errorMessage = error.toString();

    if (errorMessage.includes('Failed to fetch')) {
        alert("Нет интернета");
    } else if (errorMessage.includes('404')) {
        alert("Город не найден");
    } else {
        alert("Ошибка: " + errorMessage);
    }
}

function toogleLike() {
    const cityName = elements.currentCity.textContent;
    if(!cityName) return;

    if(likedCities.list.has(cityName)) {
        likedCities.deleteCity(cityName);
        elements.likeBtn.classList.remove('active');
    } 
    if(!likedCities.list.has(cityName)) {
        likedCities.addCity(cityName);
        elements.likeBtn.classList.add('active');
    }

    renderLikedCities([...likedCities.list], elements.cityList, deleteCity, selectCity);
}

function selectCity(city) {
    loadWeather(city);
    saveCurrentCity(city);
}

function deleteCity(city)  {
    likedCities.deleteCity(city);
    renderLikedCities([...likedCities.list], elements.cityList, deleteCity, selectCity);

    syncLikeBtn(city);
}

function syncLikeBtn(cityName) {
    if (likedCities.list.has(cityName)) {
        elements.likeBtn.classList.add('active');
    } 
    if (!likedCities.list.has(cityName)) {
        elements.likeBtn.classList.remove('active');
    }
}

