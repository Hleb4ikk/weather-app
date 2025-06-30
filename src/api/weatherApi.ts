import { ApiResponse } from '@/entities/apiResponse';
import { Forecast } from '@/entities/forecast';

export async function fetchForecastByCity(city: string) {
  const response = await fetch(`http://localhost:8080/weather?city=${city}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  const forecast: ApiResponse<Forecast> = data;
  console.log(forecast);
  return forecast;
}
