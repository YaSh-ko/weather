export function formatTimeWithTimezone(unixSeconds, timezoneOffsetSeconds) {

    const localMs = (unixSeconds + timezoneOffsetSeconds) * 1000;
    return new Date(localMs).toLocaleTimeString('ru-RU', {
        hour: '2-digit', minute: '2-digit'
    });
}

export function saveCurrentCity(cityName) {
    localStorage.setItem('currentCity', cityName);
}

export function loadCurrentCity() {
    return localStorage.getItem('currentCity');
}

export function getIconName(iconCode) {
    const iconMap = {
        '01d': 'sunny.png',
        '01n': 'clear-night.png',
        '02d': 'partly-cloudy.png',
        '02n': 'partly-cloudy.png',
        '03d': 'cloudy.png',
        '03n': 'cloudy.png',
        '04d': 'cloudy.png',
        '04n': 'very-cloudy.png',
        '09d': 'shower-rain.png',
        '09n': 'shower-rain.png',
        '10d': 'rain.png',
        '10n': 'rain.png',
        '11d': 'thunderstorm.png',
        '11n': 'thunderstorm.png',
        '13d': 'snow.png',
        '13n': 'snow.png',
        '50d': 'mist.png',
        '50n': 'mist.png'
    };
    
    return iconMap[iconCode] || 'default.png';
}