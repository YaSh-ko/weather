import { API } from './constants.js';

export function getWeather(cityName) {
    const url = `${API.url}forecast?q=${cityName}&appid=${API.key}`;
    return fetch(url) 
        .then(response => {
            console.log(response.ok);
            if(!response.ok) {
                return Promise.reject(`Ошибка API ${response.status}`);
            }

            return response.json();
        }) 
}

