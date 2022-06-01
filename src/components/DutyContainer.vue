<script setup lang='ts'>
import { type Collection } from '../types';
import Raid from './Duties/Raid.vue';
import Trial from './Duties/Trial.vue';

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
			.group-content.tile.is-vertical
				each duty in collection.duties
					.raid-set-container.tile.is-12
						.tile.is-parent.is-vertical.is-1
							.raid-set-title-container.tile.is-child.box
								//- img(src=`/assets/img/gold-trim-top.png`)
								.raid-set-title.title.is-3 #{duty.raidset}
								//- img(src=`/assets/img/gold-trim-bottom.png`)
						.tile.is-parent.is-vertical.is-11
							each raid in duty.raids
								Raid(:dutyType='collection.dutyType', :duty='raid')
	.column.is-2-fullhd.is-1-widescreen.is-0

else if collection.dutyType == 'trial'
	.column.is-8-fullhd.is-12-widescreen.is-12-desktop.is-12-tablet
		.group-title.title.is-2.has-text-centered #{collection.title}
		.duty-group.box
			.group-content.columns.is-multiline
				each duty in collection.duties
					.column.is-3-fullhd.is-3-widescreen.is-3-desktop.is-4-tablet
						Trial(:dutyType='collection.dutyType', :duty='duty')

else if collection.dutyType == 'allianceraid'
	.column.is-4-fullhd.is-12-widescreen.is-12-desktop.is-12-tablet
		.group-title.title.is-2.has-text-centered #{collection.title}
		.duty-group.box
			.group-content.columns.is-multiline.is-centered
				each duty in collection.duties
					.column.is-6-fullhd.is-4-widescreen.is-4-desktop.is-4-tablet
						Trial(:dutyType='collection.dutyType', :duty='duty')
</template>