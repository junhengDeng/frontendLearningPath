<template>
  <div>
    <div ref="div">小满Ref</div>
    <hr>
    <div>
      {{ name }}
    </div>
    <hr>
    <button @click="change">修改 customRef</button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, shallowRef, customRef } from 'vue'

function myRef<T = any>(value: T) {
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newVal) {
        value = newVal;
        trigger()
      }
    }
  })
}

const name = myRef<string>('小满')

const change = () => {
  name.value = "大满"
}

const div = ref<HTMLDivElement>();

onMounted(function () {
  console.log(div.value?.innerText);
})


</script>

<style scoped></style>