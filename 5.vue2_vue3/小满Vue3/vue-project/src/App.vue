<template>
  <component is="curr"></component>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const curr = ref('RefComponent')
</script>

<script lang="ts">
import RefComponent from '@/components/Ref.vue';
export default {
  components: {
    RefComponent
  }
};
</script>