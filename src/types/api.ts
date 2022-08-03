export interface ICoordinatesResponse {
  /**
   * Name of the found location
   */
  name: string;
  /**
   * Country of the found location
   */
  country: string;
  /**
   * Geographical coordinates of the found location (latitude)
   */
  lat: number;
  /**
   * Geographical coordinates of the found location (longitude)
   */
  lon: number;
}

export interface IWeatherResponse {
  /**
   * Weather condition id
   */
  id: number;
  /**
   * Weather condition within the group
   */
  description: string;
  /**
   * Temperature (celsius)
   */
  temp: number;
  /**
   * Temperature. This temperature parameter accounts for the human perception of weather (celsius)
   */
  feels_like: number;
  /**
   * Atmospheric pressure (hPa)
   */
  pressure: number;
  /**
   * Humidity (%)
   */
  humidity: number;
  /**
   * Visibility (meter). The maximum value of the visibility is 10000m
   */
  visibility: number;
  /**
   * Wind speed (meter/sec)
   */
  speed: number;
  /**
   * Wind direction (degrees)
   */
  deg: number;
}
