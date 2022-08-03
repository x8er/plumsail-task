<template>
  <WeatherCard v-for="city in cities" :key="city" :city="city" />
  <Settings v-show="showSettings" @updateCities="handleSettingsUpdateCities" />
  <img
    class="settings-switcher icon-as-button"
    @click="handleSettingsSwitcherClick"
    :src="showSettings ? CloseIcon : GearIcon"
    alt="Settings Icon"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import Settings from "@/components/Settings.vue";
import GearIcon from "@/assets/gear.svg";
import CloseIcon from "@/assets/close.svg";
import WeatherCard from "@/components/WeatherCard.vue";
import { getCityData } from "@/api";

const showSettings = ref(false);

const cities = ref<string[]>(
  JSON.parse(localStorage.getItem("cities") || "[]")
);

if (!cities.value.length) {
  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const cityData = await getCityData(
        pos.coords.latitude,
        pos.coords.longitude
      );
    },
    (err) => {
      console.log(err);
    }
  );
}

const handleSettingsSwitcherClick = () => {
  showSettings.value = !showSettings.value;
};

const handleSettingsUpdateCities = (newCities: string[]) => {
  cities.value = newCities;
};
</script>

<style lang="scss">
@import "@/assets/styles.css";

weather-widget {
  position: relative;
  display: inline-block;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 180px;

  .settings-switcher {
    position: absolute;
    top: 4px;
    right: 0;
    width: 16px;
  }
}
</style>
