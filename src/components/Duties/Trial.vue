<script setup lang='ts'>
import { ref, toRefs } from "vue";
import { type Trial } from "../../types";

const checked = ref(false);
const animating = ref(false);

const props = defineProps<{
	dutyType: string
	duty: Trial
}>()

function markDuty(e: Event) {
	console.log(e.currentTarget);
	//const duty = e.currentTarget as Element;
	//duty.classList.add("complete");
	checked.value = !checked.value;
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
	.duty-image.card-image( :class='{ "complete": checked }' )
		.image.is-3by1
			img(:src="duty.image")
	.card-header
	.card-content
		.duty-title.title.is-5 #{duty.name}
		.duty-content This is some content!
	.fill-element(v-if='checked')
		img.X(src="/assets/img/X.png")
</template>