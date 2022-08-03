import axiosInstance from "./instance";
import { ICityDataResponse } from "@/types/api";
import { AxiosRequestConfig } from "axios";

const fetchGeoApi = async (url: string, config: AxiosRequestConfig) => {
  const { data } = await axiosInstance.get(url, config).catch((err) => {
    throw new Error(
      `Something happened while executing the ${fetchGeoApi.name} request.\n${err}`
    );
  });

  if (!data.length) return false;

  return {
    name: data[0].name,
    country: data[0].country,
    lat: data[0].lat,
    lon: data[0].lon,
  } as ICityDataResponse;
};

/**
 * Finds city data by city name
 * @param city City name
 */
export async function getCityData(city: string): Promise<ICityDataResponse>;
/**
 * Finds city data by latitude and longitude
 * @param lat Latitude
 * @param lon Longitude
 */
export async function getCityData(
  lat: number,
  lon: number
): Promise<ICityDataResponse>;
export async function getCityData(a: unknown, b?: unknown): Promise<unknown> {
  if (typeof a === "string") {
    return await fetchGeoApi("/geo/1.0/direct", {
      params: {
        q: a,
        limit: 1,
        appid: process.env.VUE_APP_OPEN_WEATHER_APPID,
      },
    });
  }

  if (typeof a === "number" && typeof b === "number") {
    return await fetchGeoApi("/geo/1.0/reverse", {
      params: {
        lat: a,
        lon: b,
        limit: 1,
        appid: process.env.VUE_APP_OPEN_WEATHER_APPID,
      },
    });
  }

  throw new Error("Unable to getCityData");
}
