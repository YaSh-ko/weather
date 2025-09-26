import { API } from './constants.js';

export async function getWeather(cityName) {
    const url = `${API.url}forecast?q=${cityName}&appid=${API.key}`;
    const response = await fetch(url);
    return await response.json();
}

