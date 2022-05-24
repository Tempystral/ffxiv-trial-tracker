<script setup lang="ts">
import { ref } from "vue"

defineProps<{

  data: {
    name: string
  }

}>()

</script>

<template lang="pug">
div
  h1= data.name
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
