<script setup lang="ts">
import { ref } from 'vue';
import { type ExpansionType } from '../types';
import DutyContainer from "./DutyContainer.vue"

const props = defineProps<{
  exp: ExpansionType
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
.content {
  justify-content: center;
}

.view {
  &[data-expansion="A Realm Reborn"] {
    background-image: url("@/assets/img/bg/ARR_New.webp");
    background-size: 100% auto;
    background-repeat: repeat-y;
    background-position: center top;
  }

  &[data-expansion="Heavensward"] {
    background-image: url("@/assets/img/bg/heavensward.webp");
  }

  &[data-expansion="Stormblood"] {
    background-image: url("@/assets/img/bg/stormblood.webp");
  }

  &[data-expansion="Shadowbringers"] {
    background-image: url("@/assets/img/bg/shadowbringers.webp");
  }
}
</style>