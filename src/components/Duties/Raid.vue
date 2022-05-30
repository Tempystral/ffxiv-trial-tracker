<script setup lang='ts'>
import { ref } from "vue";
import { useStore } from "../../ts/store";
import { Objective, type Duty } from "../../types";

const props = defineProps<{
	dutyType: string
	duty: Duty
}>()

const store = useStore();

const checked = ref(false);
const animating = ref(false);

function markDuty() {
	//console.log(e.currentTarget);
	checked.value = !checked.value;
	store.isDone(props.duty, Objective.NORMAL, checked.value)
	shimmer()
}

function shimmer() {
	animating.value = true;
	// setTimeout(() => {
	// 	animating.value = false;
	// }, 700);
}

</script>

<template lang='pug'>
.duty.raid.tile.is-child.box(:id="dutyType + '-' + duty.id" @click='markDuty' :class='{ "shine shine-anim": animating }')
	.columns.is-gapless.is-multiline
		.column.is-2
		.raid-content.column.is-4
			div
				.duty-title.title.is-5 #{duty.name}
				.duty-content This is some content!
		.raid-image.column.is-6
			.image.is-fullwidth
				img(:src='duty.image')
</template>
