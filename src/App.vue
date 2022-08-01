<template>
  <Title>Anything</Title>
  <Settings v-show="showSettings" @close="handleSettingsSwitcherClick" />
  <img
    class="settings-switcher icon-as-button"
    @click="handleSettingsSwitcherClick"
    :src="showSettings ? CloseIcon : GearIcon"
    alt="Settings Icon"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import Title from "@/components/Title.vue";
import Settings from "@/components/Settings.vue";
import GearIcon from "@/assets/gear.svg";
import CloseIcon from "@/assets/close.svg";

const showSettings = ref(false);

const handleSettingsSwitcherClick = () => {
  showSettings.value = !showSettings.value;
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
  width: 200px;

  .settings-switcher {
    position: absolute;
    top: 4px;
    right: 0;
    width: 16px;
  }
}
</style>
