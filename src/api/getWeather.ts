import { ICityDataResponse, IWeatherResponse } from "@/types/api";
import axiosInstance from "./instance";

export const getWeather = async (coordinates: ICityDataResponse) => {
  const { lat, lon } = coordinates;
  const { data } = await axiosInstance
    .get("/data/2.5/weather", {
      params: {
        lat,
        lon,
        units: "metric",
        appid: process.env.VUE_APP_OPEN_WEATHER_APPID,
      },
    })
    .catch((err) => {
      throw new Error(
        `Something happened while executing the getWeather request.\n${err}`
      );
    });

  return {
    id: data.weather[0].id,
    description: data.weather[0].description,
    temp: Math.round(data.main.temp),
    feels_like: data.main.feels_like,
    pressure: data.main.pressure,
    humidity: data.main.humidity,
    visibility: data.visibility,
    speed: data.wind.speed,
    deg: data.wind.deg,
  } as IWeatherResponse;
};
