<template>
  <div class="location" draggable="false">
    <img
      class="icon-as-button"
      :src="require('@/assets/burger.svg')"
      alt="Burger icon"
    />
    <span><slot></slot></span>
    <img
      class="icon-as-button"
      :src="require('@/assets/trash.svg')"
      alt="Trash
    icon"
      draggable="false"
      @click="emits('delete')"
    />
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(["delete"]);
</script>

<style lang="scss" scoped>
.location {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: lightgray;
  padding: 6px 4px;

  img {
    width: 16px;

    &:first-of-type {
      margin-right: 4px;
    }

    &:last-of-type {
      margin-left: auto;
    }
  }

  span {
    font-size: 0.9rem;
  }
}
</style>
