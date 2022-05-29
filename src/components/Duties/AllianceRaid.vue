<script setup lang='ts'>
import { type Trial } from "../../types";

defineProps<{
	dutyType: string
	duty: Trial
}>()

</script>

<template lang='pug'>
.duty.card.has-text-centered(:id="dutyType + '-' + duty.id")
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