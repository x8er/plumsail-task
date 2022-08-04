<template>
  <div>
    <Title>{{ props.city }}</Title>
    <div class="main-data">
      <img
        class="weather-icon"
        :src="require(`@/assets/weather/${getWeatherImage(weatherData.id)}`)"
        :alt="weatherData.description"
      />
      <span class="temperature">{{ weatherData.temp }}&#176;C</span>
    </div>
    <span class="short-description">
      Feels like: {{ weatherData.feels_like }}&#176;C.
      {{ capitalizedDescription }}
    </span>
    <p class="detail-description">
      <span>
        <div class="icon-container">
          <img
            :style="`transform: rotate(${weatherData.wind_deg}deg)`"
            :src="WindDirectionIcon"
            alt="Wind direction icon"
          />
        </div>
        {{ weatherData.wind_speed }}m/s {{ compassPoint }}
      </span>
      <span>
        <div class="icon-container">
          <img :src="PressureIcon" alt="Pressure icon" />
        </div>
        {{ weatherData.pressure }}hPa
      </span>
      <span>Humidity: {{ weatherData.humidity }}%</span>
      <span>Visibility: {{ visibilityInKilometers }}km</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue";
import Title from "@/components/Title.vue";
import { getCityData, getWeather } from "@/api";
import { getWeatherImage } from "@/utils";
import { IWeatherResponse } from "@/types/api.js";
import { cardinalFromDegree } from "cardinal-direction";
import WindDirectionIcon from "@/assets/wind-direction.svg";
import PressureIcon from "@/assets/pressure.svg";

const props = defineProps<{ city: string }>();
const weatherData = ref<IWeatherResponse>({
  id: 800,
  description: "...",
  temp: 0,
  feels_like: 0,
  pressure: 0,
  humidity: 0,
  visibility: 10000,
  wind_speed: 0,
  wind_deg: 0,
});

const capitalizedDescription = computed(
  () =>
    weatherData.value.description.charAt(0).toUpperCase() +
    weatherData.value.description.slice(1)
);
const compassPoint = computed(() =>
  cardinalFromDegree(weatherData.value.wind_deg)
);
const visibilityInKilometers = computed(() =>
  (weatherData.value.visibility / 1000).toFixed(1)
);

onBeforeMount(async () => {
  const coordinates = await getCityData(
    props.city.replace(/ /g, "").toLowerCase()
  );
  if (!coordinates) return console.log("No data was found for this city.");
  weatherData.value = await getWeather(coordinates);
});
</script>

<style lang="scss" scoped>
.main-data {
  display: flex;
  align-items: center;
  padding: 10px 0;

  .weather-icon {
    width: 64px;
    margin: 0 8px 0 16px;
  }

  .temperature {
    font-weight: 700;
    font-size: 1.5rem;
  }
}
.short-description,
.detail-description {
  font-size: 0.7rem;
}

.detail-description {
  display: flex;
  flex-wrap: wrap;

  span {
    display: flex;
    align-items: center;
    margin: 0 10px 15px 0;
  }

  .icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 22.74px;
    height: 22.74px;
    margin-right: 2px;

    img {
      width: 16px;
    }
  }
}
</style>
