<template>
  <div>
    <ul>
      <li v-for="i in list">{{ i }}</li>
    </ul>

    <button @click="add">修改</button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

let list = reactive<string[]>([])

let res = ['end', 'rng', 'edg']
list = res;
console.log(list);
const add = () => {
  setTimeout(() => {
  }, 2000)
}
</script>

<style lang="scss" scoped></style>