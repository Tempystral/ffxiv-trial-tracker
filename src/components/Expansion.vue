<script setup lang="ts">
import { ref } from 'vue';
import { type Expansion } from '../types';
import DutyContainer from "./DutyContainer.vue"

const props = defineProps<{
  exp: Expansion
}>()

</script>

<template lang="pug">
.view
  //- (style=`background-image: url(${exp.bgimg})`)
  .container.is-max-desktop
    figure.image
      img(:src='exp.image')
  .content.tile.is-parent
    .columns.is-multiline
      //- Collection of duty groups
      each collection in exp.collections
        DutyContainer(:collection="collection")
</template>

<style lang="scss">
.view {
  background-image: url("@/assets/img/Aether.png");
}

#settingsButton {
  position: absolute;
  right: 0;
  background: none;
  border: none;
  transition: all 0.1s ease-in-out;

  &:hover {
    transform: scale(0.95);
  }

  cursor: pointer;
}
</style>