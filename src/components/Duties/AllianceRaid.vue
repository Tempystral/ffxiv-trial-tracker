<script setup lang='ts'>
import { type Collection } from "../../types";

defineProps<{
	collection: Collection
}>()

</script>

<template lang='pug'>
.group-content.columns.is-multiline.is-centered
	each duty in collection.duties
		.column.is-6-fullhd.is-4-widescreen.is-4-desktop.is-4-tablet
			.duty.card.has-text-centered(:id="collection.dutyType + '-' + duty.id")
				.duty-image.card-image
					.image.is-3by1
						img(:src="duty.image")
				.card-header
				.card-content
					.duty-title.title.is-5 #{duty.name}
					.duty-content This is some content!
</template>

<style>
</style>