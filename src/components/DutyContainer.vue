<script setup lang='ts'>
import { type Collection } from '../types';
import Raid from './Duties/Raid.vue';
import Trial from './Duties/Trial.vue';
import AllianceRaid from './Duties/AllianceRaid.vue';
import sassStyles from '../assets/sass/style.scss';

defineProps<{
	collection: Collection
}>()

</script>

<template lang='pug'>
if collection.dutyType == 'raid'
	.column.is-2-fullhd.is-1-widescreen.is-0
	.column.is-8-fullhd.is-10-widescreen.is-12-desktop.is-12-tablet
		.group-title.title.is-2.has-text-centered #{collection.title}
		.duty-group.box.tile.is-ancestor
			Raid(:collection='collection')
	.column.is-2-fullhd.is-1-widescreen.is-0

else if collection.dutyType == 'trial'
	.column.is-8-fullhd.is-12-widescreen.is-12-desktop.is-12-tablet
		.group-title.title.is-2.has-text-centered #{collection.title}
		.duty-group.box
			Trial(:collection='collection')

else if collection.dutyType == 'allianceraid'
	.column.is-4-fullhd.is-12-widescreen.is-12-desktop.is-12-tablet
		.group-title.title.is-2.has-text-centered #{collection.title}
		.duty-group.box
			AllianceRaid(:collection='collection')
</template>

<style>
</style>