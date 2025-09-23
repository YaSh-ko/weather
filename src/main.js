import { getWeather } from "./api.js";
import { likedCities } from "./likedCities.js";
import { renderWeather, renderForecast, renderLikedCities, showLoading, getElements } from "./ui.js";
import { saveCurrentCity, loadCurrentCity } from "./utils.js";

const els = getElements();

document.addEventListener('DOMContentLoaded', ()=> {
    const savedCity = loadCurrentCity();
    console.log(savedCity);
    if(savedCity) {
        loadWeather(savedCity);
    }
    likedCities.init();
    renderLikedCities(likedCities.list, els.cityList, deleteCity, selectCity);
})

els.form.addEventListener('submit', onSubmit);
els.likeBtn.addEventListener('click', toogleLike);

function onSubmit(e) {
    e.preventDefault();
    const cityName= e.target.elements.searchCity.value.trim();

    if(!cityName) {
        return alert("Введите название города");
    }
 
    showLoading(els.imgContainer);

    saveCurrentCity(cityName);
    loadWeather(cityName);
}

function loadWeather(cityName) {
    getWeather(cityName)
        .then(data => {
            renderWeather(data, cityName, els);
            syncLikeBtn(cityName);
            renderForecast(data, els.forecastContainer);
        })
        .catch(() => {
            alert("Не знаю такого города");
        })
}

function toogleLike() {
    const cityName = els.currentCity.textContent;
    if(!cityName) return;

    if(likedCities.list.includes(cityName)) {
        likedCities.deleteCity(cityName);
        els.likeBtn.classList.remove('active');
    } else {
        likedCities.addCity(cityName);
        els.likeBtn.classList.add('active');
    }

    renderLikedCities(likedCities.list, els.cityList, deleteCity, selectCity);
}

function selectCity(city) {
    loadWeather(city);
    console.log(city);
    saveCurrentCity(city);
}

function deleteCity(city)  {
    likedCities.deleteCity(city);
    renderLikedCities(likedCities.list, els.cityList, deleteCity, selectCity);

    syncLikeBtn(city);
}

function syncLikeBtn(cityName) {
    if (likedCities.list.includes(cityName)) {
        els.likeBtn.classList.add('active');
    } else {
        els.likeBtn.classList.remove('active');
    }
}

