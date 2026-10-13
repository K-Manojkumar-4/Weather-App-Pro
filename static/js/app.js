// frontend for the weather app

(function () {
  let unit = "metric";

  const input = document.getElementById("cityInput");
  const btn = document.getElementById("searchBtn");
  const unitC = document.getElementById("unitC");
  const unitF = document.getElementById("unitF");
  const status = document.getElementById("status");
  const currentCard = document.getElementById("currentCard");
  const hourlySec = document.getElementById("hourlySection");
  const dailySec = document.getElementById("dailySection");

  // safety check - if main elements missing, stop
  if (!input || !btn || !status) {
    console.error("main elements not found, check index.html");
    return;
  }

  function showMsg(msg, type) {
    if (!status) return;
    status.textContent = msg;
    status.className = "status " + type;
    status.classList.remove("hidden");
  }

  function hideMsg() {
    if (!status) return;
    status.classList.add("hidden");
  }

  function setUnit(u) {
    unit = u;
    if (unitC) unitC.classList.toggle("active", u === "metric");
    if (unitF) unitF.classList.toggle("active", u === "imperial");
  }

  function hideResults() {
    if (currentCard) currentCard.classList.add("hidden");
    if (hourlySec) hourlySec.classList.add("hidden");
    if (dailySec) dailySec.classList.add("hidden");
  }

  async function getWeather(city) {
    showMsg("loading...", "loading");

    try {
      const res = await fetch(
        "/api/weather?city=" + encodeURIComponent(city) + "&units=" + unit
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "something broke");
      }

      show(data);
      showMsg("done", "success");
      setTimeout(hideMsg, 1800);
    } catch (err) {
      showMsg(err.message, "error");
      hideResults();
    }
  }

  function show(data) {
    const c = data.current;
    if (!c) return;

    var loc = document.getElementById("location");
    var desc = document.getElementById("description");
    var temp = document.getElementById("temp");
    var feels = document.getElementById("feelsLike");
    var humidity = document.getElementById("humidity");
    var wind = document.getElementById("wind");
    var pressure = document.getElementById("pressure");
    var sunrise = document.getElementById("sunrise");
    var sunset = document.getElementById("sunset");
    var icon = document.getElementById("weatherIcon");

    if (loc) loc.textContent = c.city + ", " + c.country;
    if (desc) desc.textContent = c.description;
    if (temp) temp.textContent = c.temp + c.unit_symbol;
    if (feels) feels.textContent = "feels like " + c.feels_like + c.unit_symbol;
    if (humidity) humidity.textContent = c.humidity + "%";
    if (wind) wind.textContent = c.wind_speed + " " + c.wind_unit;
    if (pressure) pressure.textContent = c.pressure + " hPa";
    if (sunrise) sunrise.textContent = c.sunrise;
    if (sunset) sunset.textContent = c.sunset;
    if (icon) {
      icon.src = c.icon_url;
      icon.alt = c.description;
    }

    if (currentCard) currentCard.classList.remove("hidden");

    // hourly
    var hourlyBox = document.getElementById("hourlyContainer");
    if (hourlyBox && data.hourly) {
      hourlyBox.innerHTML = data.hourly
        .map(function (h) {
          return (
            '<div class="hourly-item">' +
            '<div class="hourly-time">' + h.time + "</div>" +
            '<img class="hourly-icon" src="' + h.icon_url + '" alt="" />' +
            '<div class="hourly-temp">' + h.temp + h.unit_symbol + "</div>" +
            (h.pop > 0 ? '<div class="hourly-pop">' + h.pop + "%</div>" : "") +
            "</div>"
          );
        })
        .join("");
      if (hourlySec) hourlySec.classList.remove("hidden");
    }

    // daily
    var dailyBox = document.getElementById("dailyContainer");
    if (dailyBox && data.daily) {
      dailyBox.innerHTML = data.daily
        .map(function (d) {
          return (
            '<div class="daily-item">' +
            '<div class="daily-day">' + d.day_name + "</div>" +
            '<img class="daily-icon" src="' + d.icon_url + '" alt="" />' +
            '<div class="daily-temps">' +
            '<span class="max">' + d.temp_max + "°</span>" +
            '<span class="min">' + d.temp_min + "°</span>" +
            "</div></div>"
          );
        })
        .join("");
      if (dailySec) dailySec.classList.remove("hidden");
    }
  }

  // events
  btn.addEventListener("click", function () {
    var city = input.value.trim();
    if (city) getWeather(city);
  });

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      var city = input.value.trim();
      if (city) getWeather(city);
    }
  });

  if (unitC) {
    unitC.addEventListener("click", function () {
      if (unit === "metric") return;
      setUnit("metric");
      var city = input.value.trim();
      if (city) getWeather(city);
    });
  }

  if (unitF) {
    unitF.addEventListener("click", function () {
      if (unit === "imperial") return;
      setUnit("imperial");
      var city = input.value.trim();
      if (city) getWeather(city);
    });
  }
})();