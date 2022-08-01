<template>
  <img class="settings-switcher" :src="GearIcon" alt="Settings Icon" />
</template>

<script setup lang="ts">
import GearIcon from "@/assets/gear.svg";
</script>

<style lang="scss" scoped>
.settings-switcher {
  width: 16px;
}
</style>
