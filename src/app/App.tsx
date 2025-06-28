import "./App.css";

import { Droplet, Thermometer, Wind as WindIcon } from "lucide-react";
import { Forecast } from "@/entities/forecast";
import { useEffect, useRef, useState } from "react";
import { fetchForecastByCity } from "../api/weatherApi";
import { ApiResponse } from "@/entities/apiResponse";

function App() {
  const cityInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [forecast, setForecast] = useState<Forecast | undefined>(undefined);

  function validateCityInput(input: string | undefined) {
    let message = null;
    if (input === undefined || input.length === 0) {
      message = "Поле не может быть пустым.";
    }
    return message;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const city = cityInputRef.current?.value;
    const cityInputMessage = validateCityInput(city);
    setErrorMessage(cityInputMessage);

    if (city) {
      const response: ApiResponse<Forecast> = await fetchForecastByCity(city);
      console.log(response);
      if (response.code === 200) {
        setForecast(response.data);
      } else {
        setErrorMessage(response.message);
      }
    }
  }

  return (
    <div className="App">
      <main>
        {forecast && (
          <section className="weather">
            <article className="weatherItem rowItem">
              <h2 className="cityName">{forecast.city}</h2>
              <div className="temperatureContainer">
                <span className="currentTemperature">
                  {forecast.weather.temp}°C
                </span>
                <div className="minMaxTempContainer">
                  <span>Мин. {forecast.weather.temp_min}°C</span>
                  <span>Макс. {forecast.weather.temp_max}°C</span>
                </div>
              </div>
            </article>
            <div className="twoWeatherItems">
              <article className="weatherItem columnItem">
                <h2 className="wheatherItemHeader">
                  <Thermometer size={20} />
                  ОЩУЩАЕТСЯ КАК
                </h2>
                <span>{forecast.weather.feels_like}°C</span>
                <p>Чуть ниже чем фактическая температура.</p>
              </article>
              <article className="weatherItem columnItem">
                <h2 className="wheatherItemHeader">
                  <Droplet size={20} />
                  ВЛАЖНОСТЬ
                </h2>
                <span>{forecast.weather.humidity}%</span>
                <p>Оптимальная влажность.</p>
              </article>
            </div>
            <article className="weatherItem">
              <h2 className="wheatherItemHeader">
                <WindIcon size={20} /> ВЕТЕР
              </h2>
              <div className="windContainer">
                <div className="mainWindParamsContainer">
                  <div className="windParam">
                    Ветер<span>{forecast.wind.speed} м/с</span>
                  </div>
                  <hr />
                  <div className="windParam">
                    Направление<span>{forecast.wind.deg}°</span>
                  </div>
                </div>
                <div className="windCompass">
                  <div className="compassTicks">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className="tick"
                        style={{ transform: `rotate(${i * 30}deg)` }}
                      />
                    ))}
                  </div>
                  <div className="compassLabels">
                    <span className="label north">С</span>
                    <span className="label east">В</span>
                    <span className="label south">Ю</span>
                    <span className="label west">З</span>
                  </div>
                  <div
                    className="arrow"
                    style={{
                      transform: `rotate(${
                        (forecast.wind.deg + 180) % 360
                      }deg)`,
                    }}
                  />
                </div>
              </div>
            </article>
          </section>
        )}
        <section className="formContainer">
          <h1>@the-wheather-app</h1>
          <p>Погода - мем exchange</p>
          <form onSubmit={handleSubmit} id="cityForm" className="typeCityForm">
            <input
              id="cityInput"
              ref={cityInputRef}
              className="typeCityInput"
              type="text"
              placeholder="Введите город"
            />
            {errorMessage && <p className="inputMessage">{errorMessage}</p>}
            <div className="submitButtonContainer">
              <button className="submitButton" type="submit">
                Узнать погоду
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;
