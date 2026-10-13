# weather app backend
# flask api that talks to openweathermap

import os
from datetime import datetime
from collections import defaultdict

from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import requests

load_dotenv()

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("FLASK_SECRET_KEY", "dev-key-change-later")

API_KEY = os.getenv("OPENWEATHER_API_KEY")
BASE = "https://api.openweathermap.org/data/2.5"

if not API_KEY or API_KEY.startswith("your_"):
    print("hey, put a real openweathermap key in the .env file")


def call_owm(endpoint, params):
    params["appid"] = API_KEY
    try:
        r = requests.get(f"{BASE}/{endpoint}", params=params, timeout=10)
    except requests.exceptions.Timeout:
        raise Exception("request timed out, try again")
    except requests.exceptions.ConnectionError:
        raise Exception("no internet or openweathermap is down")

    if r.status_code == 404:
        raise Exception("city not found, check the spelling")
    if r.status_code == 401:
        raise Exception("bad api key, check your .env")
    if r.status_code != 200:
        raise Exception(f"owm returned {r.status_code}")

    return r.json()


def clean_current(data, units):
    symbol = "°C" if units == "metric" else "°F"
    wind_u = "m/s" if units == "metric" else "mph"

    return {
        "city": data["name"],
        "country": data["sys"]["country"],
        "temp": round(data["main"]["temp"], 1),
        "feels_like": round(data["main"]["feels_like"], 1),
        "humidity": data["main"]["humidity"],
        "pressure": data["main"]["pressure"],
        "wind_speed": data["wind"]["speed"],
        "description": data["weather"][0]["description"].title(),
        "icon": data["weather"][0]["icon"],
        "icon_url": f"https://openweathermap.org/img/wn/{data['weather'][0]['icon']}@2x.png",
        "unit_symbol": symbol,
        "wind_unit": wind_u,
        "sunrise": datetime.fromtimestamp(data["sys"]["sunrise"]).strftime("%H:%M"),
        "sunset": datetime.fromtimestamp(data["sys"]["sunset"]).strftime("%H:%M"),
    }


def clean_hourly(lst, units, limit=8):
    symbol = "°C" if units == "metric" else "°F"
    out = []
    for item in lst[:limit]:
        out.append({
            "time": datetime.fromtimestamp(item["dt"]).strftime("%H:%M"),
            "temp": round(item["main"]["temp"]),
            "description": item["weather"][0]["description"].title(),
            "icon": item["weather"][0]["icon"],
            "icon_url": f"https://openweathermap.org/img/wn/{item['weather'][0]['icon']}.png",
            "unit_symbol": symbol,
            "pop": round(item.get("pop", 0) * 100),
        })
    return out


def clean_daily(lst, units):
    # group by day so we can show min/max
    symbol = "°C" if units == "metric" else "°F"
    groups = defaultdict(list)

    for item in lst:
        day = datetime.fromtimestamp(item["dt"]).strftime("%Y-%m-%d")
        groups[day].append(item)

    result = []
    for day, items in list(groups.items())[:5]:
        temps = [i["main"]["temp"] for i in items]
        # just grab a mid-dayish icon
        icon_item = items[min(2, len(items) - 1)]

        result.append({
            "date": day,
            "day_name": datetime.strptime(day, "%Y-%m-%d").strftime("%a"),
            "temp_min": round(min(temps)),
            "temp_max": round(max(temps)),
            "description": icon_item["weather"][0]["description"].title(),
            "icon": icon_item["weather"][0]["icon"],
            "icon_url": f"https://openweathermap.org/img/wn/{icon_item['weather'][0]['icon']}.png",
            "unit_symbol": symbol,
        })
    return result


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/health")
def health():
    return jsonify({"status": "ok"})


@app.route("/api/weather")
def weather():
    city = request.args.get("city", "").strip()
    units = request.args.get("units", "metric").lower()

    if not city:
        return jsonify({"error": "need a city name"}), 400

    if units not in ("metric", "imperial"):
        units = "metric"

    if not API_KEY or API_KEY.startswith("your_"):
        return jsonify({"error": "server missing api key"}), 500

    try:
        current = call_owm("weather", {"q": city, "units": units})
        forecast = call_owm("forecast", {"q": city, "units": units})

        return jsonify({
            "current": clean_current(current, units),
            "hourly": clean_hourly(forecast["list"], units),
            "daily": clean_daily(forecast["list"], units),
            "units": units,
            "fetched_at": datetime.utcnow().isoformat() + "Z",
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    # dont use this in prod
    app.run(debug=True, host="0.0.0.0", port=5000)
