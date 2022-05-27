<script setup lang="ts">
import { type Expansion } from '../types';
import DutyContainer from "./DutyContainer.vue"

defineProps<{
  exp: Expansion
}>()

</script>

<template lang="pug">
.view
  //- (style=`background-image: url(${exp.bgimg})`)
  .container.has-text-centered.is-max-desktop
    figure.image
      img(:src='exp.image')
  .content.tile.is-parent
    .columns.is-multiline
      //- Collection of duty groups
      each collection in exp.collections
        DutyContainer(:collection="collection")
        //- +duty-group-container(collection)
</template>

<style scoped>
</style>
