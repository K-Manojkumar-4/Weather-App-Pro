# Weather App

Simple weather app using Flask + OpenWeatherMap.

Backend is a small API, frontend is just html/css/js.

## Setup

1. Get a free key from https://openweathermap.org/api

2. Create venv and install stuff:

```bash
python -m venv venv
source venv/bin/activate   # windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. Copy the env file and put your key in it:

```bash
cp .env.example .env
```

Open `.env` and replace the placeholder with your actual key.

4. Run it:

```bash
python app.py
```

Then open http://127.0.0.1:5000

## API

`GET /api/weather?city=London&units=metric`

units can be `metric` or `imperial`.

Returns current weather + hourly + 5 day forecast.

`GET /api/health` just returns ok.

## Notes

- api key stays on the server, frontend never sees it
- if something breaks check the browser console or the terminal
- dont run with debug=True in production

That's pretty much it.
