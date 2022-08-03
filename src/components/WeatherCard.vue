<template>
  <Title>{{ props.city }}</Title>
  <div class="main-data">
    <img
      class="weather-icon"
      :src="require(`@/assets/weather/${getWeatherImage(weatherData.id)}`)"
      :alt="weatherData.description"
    />
    <span class="temperature">{{ weatherData.temp }}&#176;C</span>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import Title from "@/components/Title.vue";
import { getCityData, getWeather } from "@/api";
import { getWeatherImage } from "@/utils";
import { IWeatherResponse } from "@/types/api.js";

const props = defineProps<{ city: string }>();
const weatherData = ref<IWeatherResponse>({
  id: 800,
  description: "...",
  temp: 0,
  feels_like: 0,
  pressure: 0,
  humidity: 0,
  visibility: 10000,
  speed: 0,
  deg: 0,
});

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
</style>
