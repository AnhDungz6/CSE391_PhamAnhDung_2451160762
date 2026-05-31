// DOM Elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const historyContainer = document.getElementById('history-container');
const historyTags = document.getElementById('history-tags');

// State Containers
const stateIdle = document.getElementById('state-idle');
const stateLoading = document.getElementById('state-loading');
const stateError = document.getElementById('state-error');
const stateSuccess = document.getElementById('state-success');
const errorMessage = document.getElementById('error-message');

// Weather Success Card Elements
const weatherCity = document.getElementById('weather-city');
const weatherDate = document.getElementById('weather-date');
const weatherIcon = document.getElementById('weather-icon');
const weatherEmoji = document.getElementById('weather-emoji');
const weatherTemp = document.getElementById('weather-temp');
const weatherDesc = document.getElementById('weather-desc');
const weatherHumidity = document.getElementById('weather-humidity');
const weatherWind = document.getElementById('weather-wind');
const iconWrapper = document.querySelector('.icon-wrapper');

// Search History State
let searchHistory = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadHistory();
    renderHistory();
    
    // Search Actions
    searchBtn.addEventListener('click', handleSearch);
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
});

// Show states cleanly
function showState(state) {
    stateIdle.style.display = 'none';
    stateLoading.style.display = 'none';
    stateError.style.display = 'none';
    stateSuccess.style.display = 'none';

    if (state === 'idle') stateIdle.style.display = 'flex';
    else if (state === 'loading') stateLoading.style.display = 'flex';
    else if (state === 'error') stateError.style.display = 'flex';
    else if (state === 'success') stateSuccess.style.display = 'flex';
}

// Weather emoji mapping for modern look
function getWeatherEmoji(desc) {
    const d = desc.toLowerCase();
    if (d.includes('sun') || d.includes('clear') || d.includes('sunny')) return '☀️';
    if (d.includes('partly cloudy') || d.includes('cloudy') || d.includes('overcast')) return '⛅';
    if (d.includes('mist') || d.includes('fog') || d.includes('haze')) return '🌫️';
    if (d.includes('rain') || d.includes('drizzle') || d.includes('shower')) return '🌧️';
    if (d.includes('snow') || d.includes('blizzard') || d.includes('ice')) return '❄️';
    if (d.includes('thunder') || d.includes('storm')) return '⛈️';
    return '🌤️'; // Default
}

// Fetch weather from wttr.in
async function fetchWeather(city) {
    showState('loading');
    
    // Format city name for query
    const queryCity = encodeURIComponent(city.trim());
    const apiUrl = `https://wttr.in/${queryCity}?format=j1`;
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Thành phố không tồn tại (Lỗi ${response.status})`);
        }
        
        const data = await response.json();
        
        // Validate payload structure
        if (!data.current_condition || data.current_condition.length === 0) {
            throw new Error("Không thể tìm thấy thông tin thời tiết cho địa điểm này.");
        }
        
        displayWeather(data, city);
        saveToHistory(city);
    } catch (error) {
        console.error("Fetch Error:", error);
        errorMessage.textContent = error.message || "Không thể kết nối tới máy chủ thời tiết. Vui lòng kiểm tra mạng.";
        showState('error');
    }
}

// Display parsed data to UI
function displayWeather(data, originalSearchTerm) {
    const current = data.current_condition[0];
    const area = data.nearest_area ? data.nearest_area[0] : null;
    
    // Resolve City Name
    let resolvedCity = originalSearchTerm;
    if (area && area.areaName && area.areaName[0]) {
        resolvedCity = area.areaName[0].value;
    }
    
    // Capitalize city name
    weatherCity.textContent = resolvedCity.charAt(0).toUpperCase() + resolvedCity.slice(1);
    
    // Date
    const today = new Date();
    weatherDate.textContent = today.toLocaleDateString('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Temperature and details
    weatherTemp.textContent = current.temp_C;
    
    const desc = current.weatherDesc && current.weatherDesc[0] ? current.weatherDesc[0].value : 'N/A';
    weatherDesc.textContent = desc;
    weatherHumidity.textContent = `${current.humidity}%`;
    weatherWind.textContent = `${current.windspeedKmph} km/h`;
    
    // Handle weather icon
    let iconUrl = current.weatherIconUrl && current.weatherIconUrl[0] ? current.weatherIconUrl[0].value : '';
    if (iconUrl) {
        // Fix HTTP vs HTTPS mixed content
        if (iconUrl.startsWith('http://')) {
            iconUrl = iconUrl.replace('http://', 'https://');
        }
        weatherIcon.src = iconUrl;
        weatherIcon.style.display = 'block';
        iconWrapper.classList.add('has-icon');
    } else {
        weatherIcon.style.display = 'none';
        iconWrapper.classList.remove('has-icon');
    }
    
    // Emoji
    weatherEmoji.textContent = getWeatherEmoji(desc);
    
    showState('success');
}

// Handle search button/input execution
function handleSearch() {
    const city = cityInput.value.trim();
    if (!city) return;
    
    fetchWeather(city);
}

// History actions
function loadHistory() {
    try {
        const stored = localStorage.getItem('weather_search_history');
        if (stored) {
            searchHistory = JSON.parse(stored);
        }
    } catch (e) {
        console.error("Error reading from LocalStorage:", e);
        searchHistory = [];
    }
}

function saveToHistory(city) {
    const cleanedCity = city.trim();
    // Remove if already exists (to push it to the top)
    searchHistory = searchHistory.filter(item => item.toLowerCase() !== cleanedCity.toLowerCase());
    
    // Add to front of history
    searchHistory.unshift(cleanedCity);
    
    // Cap at 5 cities
    if (searchHistory.length > 5) {
        searchHistory.pop();
    }
    
    try {
        localStorage.setItem('weather_search_history', JSON.stringify(searchHistory));
    } catch (e) {
        console.error("Error writing to LocalStorage:", e);
    }
    
    renderHistory();
}

function renderHistory() {
    if (searchHistory.length === 0) {
        historyContainer.style.display = 'none';
        return;
    }
    
    historyContainer.style.display = 'flex';
    historyTags.innerHTML = '';
    
    searchHistory.forEach(city => {
        const tag = document.createElement('span');
        tag.className = 'history-tag';
        tag.textContent = city;
        tag.addEventListener('click', () => {
            cityInput.value = city;
            fetchWeather(city);
        });
        historyTags.appendChild(tag);
    });
}
