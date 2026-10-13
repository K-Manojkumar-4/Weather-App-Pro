# WeatherPro

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.10%2B-blue?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/Flask-3.0-black?style=for-the-badge&logo=flask&logoColor=white" alt="Flask">
  <img src="https://img.shields.io/badge/OpenWeatherMap-API-orange?style=for-the-badge&logo=openweathermap&logoColor=white" alt="OpenWeatherMap">
  <img src="https://img.shields.io/badge/License-Apache%202.0-blue?style=for-the-badge" alt="License">
</p>

<p align="center">
  <strong>A clean, modern weather application</strong><br>
  Real-time current conditions • Hourly forecast • 5-day outlook
</p>

---

## Overview

**WeatherPro** is a lightweight full-stack weather app built with Flask and the OpenWeatherMap API.  
It delivers current weather, an 8-hour hourly forecast, and a 5-day daily forecast in a responsive dark-themed UI.

The API key stays securely on the server — the frontend never sees it.

### Features

| Feature | Description |
|---------|-------------|
| **Current Weather** | Temperature, feels-like, humidity, wind, pressure, sunrise & sunset |
| **Hourly Forecast** | Next 8 hours with temperature, icon, and precipitation probability |
| **5-Day Forecast** | Daily high/low temperatures with weather icons |
| **Unit Toggle** | Seamless switch between °C (metric) and °F (imperial) |
| **Responsive Design** | Works smoothly on desktop and mobile |
| **Error Handling** | Clear messages for invalid cities, network issues, or missing API key |

---

## Tech Stack

- **Backend**: Python 3.10+, Flask 3.0, Requests, python-dotenv
- **Frontend**: HTML5, CSS3 (custom dark theme), Vanilla JavaScript
- **API**: [OpenWeatherMap](https://openweathermap.org/api) (Current Weather + 5 Day / 3 Hour Forecast)
- **Fonts**: Inter (Google Fonts)

---

## Project Structure

```
WeatherPro/
├── app.py                 # Flask backend + API routes
├── requirements.txt       # Python dependencies
├── .env.example           # Environment variable template
├── .gitignore
├── LICENSE
├── README.md
├── templates/
│   └── index.html         # Main page
└── static/
    ├── css/
    │   └── style.css      # Dark theme styles
    └── js/
        └── app.js         # Frontend logic
```

---

## Getting Started

### Prerequisites

- Python 3.10 or higher
- A free [OpenWeatherMap API key](https://openweathermap.org/api)

### 1. Clone the repository

```bash
git clone https://github.com/K-Manojkumar-4/WeatherPro.git
cd WeatherPro
```

### 2. Create a virtual environment

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and replace the placeholders:

```env
OPENWEATHER_API_KEY=your_actual_api_key_here
FLASK_SECRET_KEY=any-random-string-you-like
```

### 5. Run the app

```bash
python app.py
```

Open your browser and go to:  
**http://127.0.0.1:5000**

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Serves the frontend |
| `GET` | `/api/health` | Health check → `{"status": "ok"}` |
| `GET` | `/api/weather?city=London&units=metric` | Full weather data |

### Query Parameters

| Parameter | Required | Default | Values |
|-----------|----------|---------|--------|
| `city` | Yes | — | Any city name (e.g. `Chennai`, `New York`) |
| `units` | No | `metric` | `metric` (°C) or `imperial` (°F) |

### Example Response

```json
{
  "current": {
    "city": "London",
    "country": "GB",
    "temp": 14.2,
    "feels_like": 13.1,
    "humidity": 72,
    "pressure": 1015,
    "wind_speed": 3.6,
    "description": "Scattered Clouds",
    "icon_url": "https://openweathermap.org/img/wn/03d@2x.png",
    "unit_symbol": "°C",
    "wind_unit": "m/s",
    "sunrise": "06:42",
    "sunset": "19:15"
  },
  "hourly": [ ... ],
  "daily": [ ... ],
  "units": "metric",
  "fetched_at": "2025-10-13T14:30:00Z"
}
```

---

## Screenshots

> Add screenshots of the app here after running it locally.

<!-- Example:
![Current Weather](assets/screenshot-current.png)
![Hourly Forecast](assets/screenshot-hourly.png)
-->

---

## Security Notes

- The OpenWeatherMap API key is stored only in the `.env` file (never committed).
- `.env` is listed in `.gitignore`.
- The frontend never receives or stores the API key.

---

## License

This project is licensed under the **Apache License 2.0** — see the [LICENSE](LICENSE) file for details.

---

## Author

**Manoj Kumar K**  
GitHub: [K-Manojkumar-4](https://github.com/K-Manojkumar-4)

---

<p align="center">
  Built with ❤️ using Flask & OpenWeatherMap
</p>
