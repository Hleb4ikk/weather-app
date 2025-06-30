import styles from './ForecastPage.module.css';

import { Droplet, Wind as WindIcon, Link } from 'lucide-react';
import { Thermometer } from '../../shared/components/Thermometer/Thermometer';
import { Forecast } from '@/entities/forecast';
import { useRef, useState, useEffect } from 'react';
import { fetchForecastByCity } from '../../api/weatherApi';
import Skeletons from '../../shared/components/Skeletons/Skeletons';
import { useNavigate, useSearchParams } from 'react-router';
import { validateInput } from '../../shared/validation';

export default function ForecastPage() {
  const cityInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [forecast, setForecast] = useState<Forecast | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const searchParams = useSearchParams();

  useEffect(() => {
    const city = searchParams[0].get('city');
    if (city && cityInputRef.current) {
      cityInputRef.current.value = city;
    }
  }, []);

  function copyLink() {
    navigator.clipboard.writeText(window.location.href);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const city = cityInputRef.current?.value;
    const cityInputMessage = validateInput(city);
    setErrorMessage(cityInputMessage);

    if (city) {
      setIsLoading(true);

      try {
        const searchParams = new URLSearchParams();
        const response = await fetchForecastByCity(city);

        console.log(response);

        if (response.code === 200) {
          setForecast(response.data);
          searchParams.set('city', response.data?.city ?? '');
        } else {
          setErrorMessage(response.message);
        }
        navigate(`?${searchParams.toString()}`);
      } catch (error) {
        setErrorMessage('Ошибка при запросе данных');
      }
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.forecastPageContainer}>
      {isLoading && <Skeletons />}
      {forecast && !isLoading && (
        <section className={styles.weather}>
          <article className={styles.generalData}>
            <div className={styles.weatherIconContainer}>
              <img
                width={90}
                height={90}
                src={`https://openweathermap.org/img/wn/${forecast.generalData.icon}@2x.png`}
                alt={forecast.generalData.icon}
                className={styles.weatherIcon}
              />
              <div className={styles.iconGlow}></div>
            </div>

            <div className={styles.weatherContent}>
              <h3 className={styles.weatherDescription}>
                {forecast.generalData.description[0].toUpperCase() + forecast.generalData.description.slice(1)}
              </h3>

              <div className={styles.jokeContainer}>
                <div className={styles.jokeIcon}>😄</div>
                <p className={styles.weatherJoke}>{forecast.joke}</p>
              </div>
            </div>

            <div className={styles.decorativeElements}>
              <div className={styles.sparkle}></div>
              <div className={styles.sparkle}></div>
              <div className={styles.sparkle}></div>
            </div>
          </article>
          <article className={`${styles.weatherItem} ${styles.rowItem}`}>
            <h2 className={styles.cityName}>{forecast.city}</h2>
            <div className={styles.temperatureContainer}>
              <span className={styles.currentTemperature}>{Math.floor(forecast.weather.temp)}°C</span>
              <div className={styles.minMaxTempContainer}>
                <span>Мин. {forecast.weather.temp_min}°C</span>
                <span>Макс. {forecast.weather.temp_max}°C</span>
              </div>
            </div>
          </article>
          <div className={styles.twoWeatherItems}>
            <article className={`${styles.weatherItem} ${styles.columnItem}`}>
              <h2 className={styles.wheatherItemHeader}>
                <Thermometer
                  temp={forecast.weather.feels_like}
                  size={20}
                />
                ОЩУЩАЕТСЯ КАК
              </h2>
              <span>{Math.floor(forecast.weather.feels_like)}°C</span>
              {/* TODO: доделать статусы температуры */}
              <p>Чуть ниже чем фактическая температура.</p>
            </article>
            <article className={`${styles.weatherItem} ${styles.columnItem}`}>
              <h2 className={styles.wheatherItemHeader}>
                <Droplet size={20} />
                ВЛАЖНОСТЬ
              </h2>
              <span>{forecast.weather.humidity}%</span>
              {/* TODO: доделать статусы влажности */}
              <p>Оптимальная влажность.</p>
            </article>
          </div>
          <article className={styles.weatherItem}>
            <h2 className={styles.wheatherItemHeader}>
              <WindIcon size={20} /> ВЕТЕР
            </h2>
            <div className={styles.windContainer}>
              <div className={styles.mainWindParamsContainer}>
                <div className={styles.windParam}>
                  Ветер<span>{Math.floor(forecast.wind.speed)} м/с</span>
                </div>
                <hr />
                <div className={styles.windParam}>
                  Направление<span>{forecast.wind.deg}°</span>
                </div>
              </div>
              <div className={styles.windCompass}>
                <div className={styles.compassTicks}>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className={styles.tick}
                      style={{ transform: `rotate(${i * 30}deg)` }}
                    />
                  ))}
                </div>
                <div className={styles.compassLabels}>
                  <span className={`${styles.label} ${styles.north}`}>С</span>
                  <span className={`${styles.label} ${styles.east}`}>В</span>
                  <span className={`${styles.label} ${styles.south}`}>Ю</span>
                  <span className={`${styles.label} ${styles.west}`}>З</span>
                </div>
                <div
                  className={styles.arrow}
                  style={{
                    transform: `rotate(${(forecast.wind.deg + 180) % 360}deg)`,
                  }}
                />
              </div>
            </div>
          </article>
        </section>
      )}
      <section className={styles.formContainer}>
        <h1>@the-wheather-app</h1>
        <p>Погода - мем exchange</p>
        <form
          onSubmit={handleSubmit}
          id="cityForm"
          className={styles.typeCityForm}
        >
          <input
            id="cityInput"
            ref={cityInputRef}
            className={styles.typeCityInput}
            type="text"
            placeholder="Введите город"
          />
          {errorMessage && <p className={styles.inputMessage}>{errorMessage}</p>}
          <div className={styles.buttonsContainer}>
            <div className={styles.submitButtonContainer}>
              <button
                className={styles.submitButton}
                type="submit"
              >
                Узнать погоду
              </button>
            </div>
            {forecast && (
              <button
                className={styles.linkButton}
                type="button"
                onClick={copyLink}
              >
                <Link size={20} />
              </button>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}
