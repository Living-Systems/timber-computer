<template>
  <div id="vue" class="counter">
      <button @click="subtract()" class="text-9xl">-</button>
      <pre class="text-9xl">{{ count }}</pre>
      <button @click="add()" class="text-9xl">+</button>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    const count = ref(0)
    const add = () => count.value = count.value + 1;
    const subtract = () => count.value = count.value - 1;

    return {
      count,
      add,
      subtract
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/components/components.counter';
</style>
