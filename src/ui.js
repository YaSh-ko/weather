import { KELVIN } from './constants.js';
import { getIconName, formatTimeWithTimezone } from './utils.js';

export function renderWeather(data, cityName, els) {
    const currentTimeData = data.list[0];
    const iconCode = currentTimeData.weather[0].icon;
    const img = document.createElement('img');
    img.width = 60;

    img.src = `img/${getIconName(iconCode)}`; 
    els.imgContainer.textContent = '';
    els.imgContainer.appendChild(img);

    els.temp.textContent = Math.round(currentTimeData.main.temp - KELVIN);
    els.currentCity.textContent = cityName;
    els.feelsLike.textContent = Math.round(currentTimeData.main.feels_like - KELVIN);

    els.sunrise.textContent = formatTimeWithTimezone(data.city.sunrise, data.city.timezone);
    els.sunset.textContent = formatTimeWithTimezone(data.city.sunset, data.city.timezone);
}

export function renderForecast(data, container) {
    const list = data.list;
    container.textContent = '';
    for(let period = 1; period < list.length; period++) {
        console.log(list[period].dt_txt.split(' ')[1]);
        if(list[period].dt_txt.split(' ')[1] === "00:00:00") break;
        
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast__item';
        
        const forecastTime = document.createElement('h3');
        forecastTime.className = 'forecast__time';
        forecastTime.textContent = list[period].dt_txt.substring(11, 16);

        const tempElement = document.createElement('p');
        tempElement.textContent = `Температура: ${Math.round(list[period].main.temp - KELVIN)}`;
        const feelsLikeElement = document.createElement('p');
        feelsLikeElement.textContent = `Ощущается как: ${Math.round(list[period].main.feels_like - KELVIN)}`;

        const lineElement = document.createElement('span');
        lineElement.className = 'forecast__line';

        forecastItem.appendChild(forecastTime);
        forecastItem.appendChild(tempElement);
        forecastItem.appendChild(feelsLikeElement);
        forecastItem.appendChild(lineElement);

        container.appendChild(forecastItem);
        console.log(container);
    }
}

export function renderLikedCities(list, container, onDelete, onSelect) {
    container.textContent = '';
    list.forEach(city => {
            
        const cityItem = document.createElement('div');
        cityItem.className = 'city-list__item';

        const cityNameELement = document.createElement('p');
        cityNameELement.className = 'city-list__city-name';
        cityNameELement.textContent = city;

        const deleteBtn = document.createElement('button');
        const deleteIcon = document.createElement('img');
        deleteIcon.src = 'img/delete.png';
        deleteIcon.style.width = '20px';
        deleteBtn.appendChild(deleteIcon);

        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            onDelete(city);
        })

        cityItem.appendChild(cityNameELement);
        cityItem.appendChild(deleteBtn);

        cityItem.addEventListener('click', () => onSelect(city));

        container.appendChild(cityItem);
    })
}

export function showLoading(container) {
    container.textContent = 'Загрузка...';
}


export function getElements() {
  return {
    form: document.querySelector('#weatherForm'),
    imgContainer: document.querySelector('.weather-today__icon'),
    likeBtn: document.querySelector('#likeCity'),
    cityList: document.querySelector('.liked-city__city-list'),
    forecastContainer: document.querySelector('.weather-today__forecast'),
    temp: document.querySelector('#temp'),
    currentCity: document.querySelector('#currentCity'),
    feelsLike: document.querySelector('#feelsLike'),
    sunrise: document.querySelector('#sunrise'),
    sunset: document.querySelector('#sunset')
  };
}