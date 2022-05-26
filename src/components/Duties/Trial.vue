<script setup lang='ts'>
import { type Collection } from "../../types";
import sassStyles from '/assets/sass/style.scss';

defineProps<{
	collection: Collection
}>()

</script>

<template lang='pug'>
.group-content.columns.is-multiline
	each duty in collection.duties
		.column.is-3-fullhd.is-3-widescreen.is-3-desktop.is-4-tablet
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