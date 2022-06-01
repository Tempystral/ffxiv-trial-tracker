<script setup lang='ts'>
import localforage from "localforage";
import { ref } from "vue";
import { useStore } from "../../ts/store";
import { Objective, type Duty } from "../../types";

const props = defineProps<{
	dutyType: string,
	duty: Duty
}>()

const store = useStore();
store.$subscribe((_, state) => {
	localforage.setItem("duties", JSON.stringify(state));
});

const checked = ref(store.isObjectiveComplete(props.duty, Objective.NORMAL) || false);
const animating = ref(false);

function markDuty() {
	//console.log(e.currentTarget);
	checked.value = !checked.value;
	store.isDone(props.duty, Objective.NORMAL, checked.value)
	shimmer()
}

function shimmer() {
	animating.value = true;
	setTimeout(() => {
		animating.value = false;
	}, 700);
}

</script>

<template lang='pug'>
.duty.card.has-text-centered(:id="dutyType + '-' + duty.id" @click='markDuty' :class='{ "shine shine-anim": animating }')
	.duty-image.card-image( :class='{ "complete": store.isObjectiveComplete(duty, Objective.NORMAL) }' )
		.image.is-3by1
			img(:src="duty.image")
	.card-header
	.card-content
		.duty-title.title.is-5 #{duty.name}
		.duty-content This is some content!
	.fill-element(v-if='store.isObjectiveComplete(duty, Objective.NORMAL)')
		img.X(src="/assets/img/X.png")
</template>