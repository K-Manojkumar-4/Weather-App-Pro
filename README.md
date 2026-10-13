<div align="center">

# 🌤️ WeatherPro

### Real-time Weather • Hourly Forecast • 5-Day Outlook

A clean and modern full-stack weather application built with **Flask** and the **OpenWeatherMap API**.

<br>

[![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![OpenWeatherMap](https://img.shields.io/badge/OpenWeatherMap-API-EB6E4B?style=for-the-badge&logo=openweathermap&logoColor=white)](https://openweathermap.org/api)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)]()

<br>

**Live Demo:** Run locally → `http://127.0.0.1:5000`

</div>

---

## 📖 About The Project

**WeatherPro** helps users quickly check the weather for any city in the world.

Instead of opening multiple weather websites, you simply type a city name and instantly get:

- Current temperature and conditions  
- Hourly forecast for the next few hours  
- 5-day daily forecast with high & low temperatures  

The app has a modern dark interface that works well on both desktop and mobile.

### Why this project?

| Goal | How it was achieved |
|------|---------------------|
| Learn full-stack development | Built both backend (Flask) and frontend (HTML/CSS/JS) |
| Work with real APIs | Integrated OpenWeatherMap Current + Forecast APIs |
| Keep API keys secure | API key never leaves the server |
| Create a clean UI | Custom dark theme with responsive design |

---

## ✨ Features

| | Feature | Description |
|---|---------|-------------|
| 🌡️ | **Current Weather** | Temperature, feels-like, humidity, wind speed, pressure, sunrise & sunset |
| ⏰ | **Hourly Forecast** | Next 8 hours with temperature, weather icon & rain probability |
| 📅 | **5-Day Forecast** | Daily high / low temperatures with clear weather icons |
| 🔄 | **Unit Toggle** | Switch between Celsius (°C) and Fahrenheit (°F) instantly |
| 📱 | **Responsive Design** | Looks great on phones, tablets and desktops |
| 🛡️ | **Secure API Key** | Key stays only on the server — frontend never sees it |
| ⚠️ | **Error Handling** | Friendly messages when city is not found or network fails |

---

## 🏗️ How It Works

```
┌─────────────┐       ┌──────────────┐       ┌─────────────────────┐
│   Browser   │──────▶│  Flask App   │──────▶│  OpenWeatherMap API │
│  (Frontend) │◀──────│  (Backend)   │◀──────│                     │
└─────────────┘       └──────────────┘       └─────────────────────┘
       │                      │
       │  1. User searches    │  2. Backend calls API
       │     for a city       │     with secret key
       │                      │
       │  3. Clean JSON data  │  4. Returns current +
       │     is displayed     │     hourly + daily data
```

**Simple flow:**

1. User types a city name (example: `Chennai` or `London`)
2. Frontend sends request to `/api/weather`
3. Flask backend calls OpenWeatherMap using the secret API key
4. Data is cleaned and returned as neat JSON
5. Frontend shows current weather + hourly + 5-day forecast

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Backend** | Python 3.10+, Flask 3.0, Requests, python-dotenv |
| **Frontend** | HTML5, CSS3 (custom dark theme), Vanilla JavaScript |
| **API** | OpenWeatherMap – Current Weather + 5 Day / 3 Hour Forecast |
| **Styling** | Inter font (Google Fonts), fully responsive CSS |
| **Environment** | `.env` file for secure configuration |

---

## 📁 Project Structure

```
WeatherPro/
│
├── app.py                  # Main Flask application + API logic
├── requirements.txt        # Python packages needed
├── .env.example            # Template for environment variables
├── .gitignore              # Files that should not be uploaded
├── LICENSE                 # Apache License 2.0
├── README.md               # This file
│
├── templates/
│   └── index.html          # Main webpage
│
└── static/
    ├── css/
    │   └── style.css       # Dark theme & responsive styles
    └── js/
        └── app.js          # Frontend search & display logic
```

---

## 🚀 Getting Started

Follow these steps to run WeatherPro on your computer.

### Prerequisites

- Python **3.10** or higher installed
- A free API key from [OpenWeatherMap](https://openweathermap.org/api)

### Step 1 — Clone the repository

```bash
git clone https://github.com/K-Manojkumar-4/Weather-App-Pro.git
cd WeatherPro
```

### Step 2 — Create a virtual environment

```bash
# Create virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate

# macOS / Linux:
source venv/bin/activate
```

### Step 3 — Install required packages

```bash
pip install -r requirements.txt
```

### Step 4 — Set up your API key

```bash
cp .env.example .env
```

Open the `.env` file and add your real key:

```env
OPENWEATHER_API_KEY=your_actual_api_key_here
FLASK_SECRET_KEY=any-random-secret-string
```

> 💡 Get a free API key in less than 2 minutes at  
> [https://openweathermap.org/api](https://openweathermap.org/api)

### Step 5 — Run the application

```bash
python app.py
```

Now open your browser and visit:

**👉 http://127.0.0.1:5000**

Type any city name and press Enter or click the search button.

---

## 🔌 API Documentation

The backend exposes a simple REST API.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Serves the main webpage |
| `GET` | `/api/health` | Health check (returns `{"status": "ok"}`) |
| `GET` | `/api/weather` | Returns current + hourly + daily weather |

### Query Parameters

| Parameter | Required | Default | Example Values |
|-----------|----------|---------|----------------|
| `city` | ✅ Yes | — | `Chennai`, `London`, `Tokyo` |
| `units` | ❌ No | `metric` | `metric` (°C) or `imperial` (°F) |

### Example Request

```
GET /api/weather?city=Chennai&units=metric
```

### Example Response (simplified)

```json
{
  "current": {
    "city": "Chennai",
    "country": "IN",
    "temp": 31.5,
    "feels_like": 35.2,
    "humidity": 68,
    "pressure": 1008,
    "wind_speed": 4.1,
    "description": "Scattered Clouds",
    "unit_symbol": "°C",
    "sunrise": "06:05",
    "sunset": "18:12"
  },
  "hourly": [
    {
      "time": "15:00",
      "temp": 31,
      "description": "Light Rain",
      "pop": 40
    }
  ],
  "daily": [
    {
      "day_name": "Tue",
      "temp_min": 27,
      "temp_max": 33,
      "description": "Moderate Rain"
    }
  ]
}
```

---

## 🔒 Security

| Practice | Details |
|----------|---------|
| API Key Protection | Stored only in `.env` file |
| Never committed | `.env` is listed in `.gitignore` |
| Frontend Safety | Browser never receives the API key |
| Error Messages | Generic messages — no sensitive data leaked |

---

## 📸 Screenshots

> After running the app, you can add screenshots here to make the README even better.

```
assets/
├── screenshot-current.png     # Current weather card
├── screenshot-hourly.png      # Hourly forecast scroll
└── screenshot-daily.png       # 5-day forecast grid
```

<!-- Uncomment and add your images later
![Current Weather](assets/screenshot-current.png)
![Hourly Forecast](assets/screenshot-hourly.png)
![5-Day Forecast](assets/screenshot-daily.png)
-->

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **Apache License 2.0**.

You are free to use, modify and distribute this project under the terms of the license.  
See the [LICENSE](LICENSE) file for full details.

---

## 👨‍💻 Author

**Manoj Kumar K**

- GitHub: [K-Manojkumar-4](https://github.com/K-Manojkumar-4)
- Project Link: [https://github.com/K-Manojkumar-4/WeatherPro](https://github.com/K-Manojkumar-4/Weather-App-Pro)

---

<div align="center">

**Built with ❤️ using Flask + OpenWeatherMap**

If you found this project useful, please give it a ⭐ on GitHub!

</div>
