// Weather Code Mapper for Open-Meteo
function translateWeatherCode(code) {
    const mappings = {
        0: { desc: 'Trời trong xanh', emoji: '☀️' },
        1: { desc: 'Ít mây', emoji: '🌤️' },
        2: { desc: 'Mây rải rác', emoji: '⛅' },
        3: { desc: 'Nhiều mây', emoji: '☁️' },
        45: { desc: 'Sương mù', emoji: '🌫️' },
        48: { desc: 'Sương muối kết tủa', emoji: '🌫️' },
        51: { desc: 'Mưa phùn nhẹ', emoji: '🌧️' },
        53: { desc: 'Mưa phùn vừa', emoji: '🌧️' },
        55: { desc: 'Mưa phùn lớn', emoji: '🌧️' },
        61: { desc: 'Mưa rào nhẹ', emoji: '🌧️' },
        63: { desc: 'Mưa rào vừa', emoji: '🌧️' },
        65: { desc: 'Mưa to', emoji: '🌧️' },
        71: { desc: 'Tuyết rơi nhẹ', emoji: '❄️' },
        73: { desc: 'Tuyết rơi vừa', emoji: '❄️' },
        75: { desc: 'Tuyết rơi dày', emoji: '❄️' },
        80: { desc: 'Mưa rào nhẹ', emoji: '🌧️' },
        81: { desc: 'Mưa rào vừa', emoji: '🌧️' },
        82: { desc: 'Mưa rào mạnh', emoji: '⛈️' },
        95: { desc: 'Dông bão nhẹ', emoji: '⛈️' },
        96: { desc: 'Dông bão có mưa đá', emoji: '⛈️' },
        99: { desc: 'Dông bão có mưa đá lớn', emoji: '⛈️' }
    };
    return mappings[code] || { desc: 'Thời tiết ổn định', emoji: '🌤️' };
}

// Show skeleton loading inside a single widget
function showWidgetLoading(index) {
    const widget = document.getElementById(`widget-${index}`);
    const content = widget.querySelector('.widget-content');
    content.innerHTML = `
        <div class="widget-loading">
            <div class="widget-spinner"></div>
            <span>Đang tải thông tin...</span>
        </div>
    `;
}

// Display error card inside a single widget
function renderWidgetError(index, message) {
    const widget = document.getElementById(`widget-${index}`);
    const content = widget.querySelector('.widget-content');
    content.innerHTML = `
        <div class="widget-error">
            <span class="error-icon">⚠️</span>
            <p style="font-weight: 600;">Không thể tải dữ liệu</p>
            <p style="font-size: 0.8rem; opacity: 0.8;">${message}</p>
        </div>
    `;
}

// Render data layout on success
function renderWidget(index, data) {
    const widget = document.getElementById(`widget-${index}`);
    const content = widget.querySelector('.widget-content');
    content.innerHTML = ''; // Clear loading screen
    
    if (index === 0) {
        // --- API 0: Weather Info ---
        const current = data.current_weather;
        if (!current) {
            renderWidgetError(0, "Dữ liệu thời tiết rỗng.");
            return;
        }
        const state = translateWeatherCode(current.weathercode);
        
        const weatherDiv = document.createElement('div');
        weatherDiv.className = 'weather-widget';
        weatherDiv.innerHTML = `
            <div style="font-size: 3.5rem; line-height: 1;">${state.emoji}</div>
            <div class="weather-temp-main">
                <span>${current.temperature}</span><span class="weather-temp-unit">°C</span>
            </div>
            <div class="weather-code-desc">${state.desc}</div>
            
            <div class="weather-details-list">
                <div class="weather-detail-box">
                    <span class="weather-detail-lbl">Tốc độ gió</span>
                    <div class="weather-detail-val">💨 ${current.windspeed} km/h</div>
                </div>
                <div class="weather-detail-box">
                    <span class="weather-detail-lbl">Hướng gió</span>
                    <div class="weather-detail-val">🧭 ${current.winddirection}°</div>
                </div>
            </div>
        `;
        content.appendChild(weatherDiv);
        
    } else if (index === 1) {
        // --- API 1: Dog Image ---
        if (!data.message || data.status !== 'success') {
            renderWidgetError(1, "Dữ liệu ảnh rỗng hoặc bị lỗi.");
            return;
        }
        
        const dogDiv = document.createElement('div');
        dogDiv.className = 'dog-widget';
        dogDiv.innerHTML = `
            <img class="dog-img" src="${data.message}" alt="Random Dog" loading="lazy">
        `;
        content.appendChild(dogDiv);
        
    } else if (index === 2) {
        // --- API 2: Vietnam Country Info ---
        const country = data[0];
        if (!country) {
            renderWidgetError(2, "Không tìm thấy dữ liệu quốc gia.");
            return;
        }
        
        const countryDiv = document.createElement('div');
        countryDiv.className = 'country-widget';
        
        const pop = country.population ? country.population.toLocaleString('vi-VN') : 'N/A';
        const currencyKey = Object.keys(country.currencies || {})[0];
        const currencyStr = currencyKey ? `${country.currencies[currencyKey].name} (${country.currencies[currencyKey].symbol || ''})` : 'N/A';
        const languages = Object.values(country.languages || {}).join(', ');
        
        countryDiv.innerHTML = `
            <div class="country-flag-box">
                <img class="country-flag-img" src="${country.flags.png}" alt="Vietnam Flag">
            </div>
            <h4 class="country-name-official">${country.name.official}</h4>
            
            <div class="country-info-list">
                <div class="country-info-row">
                    <span class="country-info-lbl">Thủ đô</span>
                    <span class="country-info-val">${country.capital ? country.capital[0] : 'N/A'}</span>
                </div>
                <div class="country-info-row">
                    <span class="country-info-lbl">Dân số</span>
                    <span class="country-info-val">${pop}</span>
                </div>
                <div class="country-info-row">
                    <span class="country-info-lbl">Tiền tệ</span>
                    <span class="country-info-val" title="${currencyStr}">${currencyStr}</span>
                </div>
                <div class="country-info-row">
                    <span class="country-info-lbl">Ngôn ngữ</span>
                    <span class="country-info-val">${languages}</span>
                </div>
            </div>
        `;
        content.appendChild(countryDiv);
    }
}

// Promise.allSettled loading framework (Exactly as requested)
async function loadDashboard() {
    const startTime = Date.now();
    
    // UI Loading Indicators
    document.getElementById('overall-loading').style.display = 'block';
    document.getElementById('load-duration').textContent = 'Đang đồng bộ...';
    
    for (let i = 0; i < 3; i++) {
        showWidgetLoading(i);
    }
    
    // Promises with error guards
    const weatherPromise = fetch("https://api.open-meteo.com/v1/forecast?latitude=21.03&longitude=105.85&current_weather=true")
        .then(r => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json();
        });
        
    const dogPromise = fetch("https://dog.ceo/api/breeds/image/random")
        .then(r => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json();
        });
        
    const countryPromise = fetch("https://restcountries.com/v3.1/name/vietnam")
        .then(r => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json();
        });
        
    // Execute all 3 in parallel
    const results = await Promise.allSettled([
        weatherPromise,
        dogPromise,
        countryPromise
    ]);
    
    // Process results
    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            renderWidget(index, result.value);
        } else {
            renderWidgetError(index, result.reason.message);
        }
    });
    
    // Finish loading
    document.getElementById('overall-loading').style.display = 'none';
    const elapsed = Date.now() - startTime;
    document.getElementById('load-duration').textContent = `Data loaded in ${elapsed}ms`;
    console.log(`Loaded in ${elapsed}ms`);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    loadDashboard();
    
    document.getElementById('refresh-btn').addEventListener('click', loadDashboard);
});
