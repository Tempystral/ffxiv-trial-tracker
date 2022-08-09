<script setup lang="ts">
import { ref } from 'vue';
import { type ExpansionType } from '../types';
import DutyContainer from "./DutyContainer.vue"

const props = defineProps<{
  exp: ExpansionType,
  last: { default: false, type: boolean },
}>()

</script>

<template lang="pug">
.view( :data-expansion="exp.name" )
  .spacer#top-spacer
  .container.is-max-desktop
    figure.image
      img(:src='exp.image')
  .content.tile.is-parent
    .columns.is-multiline.is-centered
      //- Collection of duty groups
      each collection in exp.collections
        DutyContainer(:collection="collection")
  .spacer#bottom-spacer
</template>

<style lang="scss">
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

.view {
  &[data-expansion="A Realm Reborn"] {
    background-image: url("@/assets/img/bg/Aether.png");
  }

  &[data-expansion="Heavensward"] {
    background-image: url("@/assets/img/bg/heavensward.webp");
  }

  &[data-expansion="Stormblood"] {
    background-image: url("@/assets/img/bg/stormblood.webp");
  }
}
</style>