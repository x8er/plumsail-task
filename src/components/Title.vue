<template>
  <div class="title">
    <span><slot></slot></span>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 0;

  span {
    font-size: 12px;
    font-weight: 600;
  }
}
</style>
