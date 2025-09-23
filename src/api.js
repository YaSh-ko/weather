import { API } from './constants.js';

export function getWeather(cityName) {
    const url = `${API.url}forecast?q=${cityName}&appid=${API.key}`;
    return fetch(url) 
        .then(response => {
            if(!response.ok) {
                return Promise.reject(`Ошибка API ${response.status}`);
            }
            const data = response.json();
            console.log(data);
            return data;
        }) 
}

