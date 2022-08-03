import axiosInstance from "./instance";
import { ICoordinatesResponse } from "@/types/api";

export const getCoordinates = async (city: string) => {
  const { data } = await axiosInstance
    .get("/geo/1.0/direct", {
      params: {
        q: city,
        limit: 1,
        appid: process.env.VUE_APP_OPEN_WEATHER_APPID,
      },
    })
    .catch((err) => {
      throw new Error(
        `Something happened while executing the getCoordinates request.\n${err}`
      );
    });

  if (!data.length) return false;

  return {
    name: data[0].name,
    country: data[0].country,
    lat: data[0].lat,
    lon: data[0].lon,
  } as ICoordinatesResponse;
};
