<script setup lang='ts'>
import { type Collection } from "../../types";

defineProps<{
	collection: Collection
}>()

</script>

<template lang='pug'>
.group-content.tile.is-vertical
	each duty in collection.duties
		.raid-set-container.tile.is-12
			.tile.is-parent.is-vertical.is-1
				.raid-set-title-container.tile.is-child.box
					img(src=`/assets/img/gold-trim-top.png`)
					.raid-set-title.title.is-3 #{duty.raidset}
					img(src=`/assets/img/gold-trim-bottom.png`)
			.tile.is-parent.is-vertical.is-11
				each raid in duty.raids
					.duty.raid.tile.is-child.box(:id="collection.dutyType + '-' + duty.id")
						.columns.is-gapless.is-multiline
							.column.is-2
							.raid-content.column.is-4
								div
									.duty-title.title.is-5 #{raid.name}
									.duty-content This is some content!
							.raid-image.column.is-6
								.image.is-fullwidth
									img(:src='raid.image')
</template>

<style>
</style>