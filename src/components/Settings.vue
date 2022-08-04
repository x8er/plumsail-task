<template>
  <div class="settings">
    <Title>Settings</Title>
    <div class="location-list" @dragover.prevent>
      <DraggableLocation
        v-for="(city, index) in props.cities"
        :key="city"
        @dragstart="startDrag($event, index.toString())"
        @drop="onDrop($event, index.toString())"
        @delete="handleDelete(index)"
      >
        {{ city }}
      </DraggableLocation>
    </div>
    <Title>Add location:</Title>
    <div class="add-location">
      <input
        type="text"
        placeholder="Type here..."
        @keyup.enter="handleEnter"
        v-model="inputValue"
        :disabled="isLoading"
      />
      <img :src="EnterIcon" alt="Enter icon" />
    </div>
    <span class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Title from "./Title.vue";
import DraggableLocation from "./DraggableLocation.vue";
import { swapInArray } from "@/utils";
import EnterIcon from "@/assets/enter.svg";
import { getCityData } from "@/api";

const emits = defineEmits(["updateCities"]);
const props = defineProps<{
  cities: string[];
}>();

const isLoading = ref(false);
const errorMessage = ref("");
const inputValue = ref("");

const startDrag = (event: DragEvent, index: string) => {
  if (!event.dataTransfer) return;
  console.log(event);
  event.dataTransfer.setDragImage(
    (event.target as HTMLImageElement).parentElement!,
    10,
    10
  );
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("cityIndex", index);
};

const onDrop = (event: DragEvent, index: string) => {
  const cityIndex = event.dataTransfer!.getData("cityIndex");
  const resultArr = swapInArray<typeof props.cities[0]>(
    [...props.cities],
    +cityIndex,
    +index
  );
  emits("updateCities", resultArr);
};

const handleEnter = async () => {
  isLoading.value = true;
  const result = await getCityData(inputValue.value.trim());
  isLoading.value = false;
  inputValue.value = "";
  if (!result) {
    errorMessage.value = "City not found";
    setTimeout(() => {
      errorMessage.value = "";
    }, 2000);
    return;
  }
  const resultArr = [...props.cities];
  resultArr.push(`${result.name}, ${result.country}`);
  emits("updateCities", resultArr);
};

const handleDelete = (index: number) => {
  const resultArr = props.cities.filter((_, i) => i !== index);
  emits("updateCities", resultArr);
};
</script>

<style lang="scss" scoped>
.settings {
  position: absolute;
  top: 0;
  left: 0;
  width: inherit;
  height: 100%;
  background-color: white;

  .location-list {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    margin: 10px 0;
  }

  .add-location {
    display: flex;
    align-items: center;

    input {
      padding: 4px;
      font-size: 0.9rem;
      border: 1px solid gray;
    }

    img {
      height: 24px;
      margin-left: 6px;
    }
  }

  .error-message {
    color: red;
    font-size: 0.8rem;
  }
}
</style>
