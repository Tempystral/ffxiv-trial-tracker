<script setup lang='ts'>
import { ref } from "vue";
import { useDutyStore } from '../../store/DutyStore'
import { Objective, type RewardType, type Duty } from "../../types";
import { getFullRewardName } from "../../ts/util";
import { getRewardImg, getObjectiveImg } from "../../ts/data";

const props = defineProps<{
	dutyType: string,
	duty: Duty
}>()

const store = useDutyStore();
const elemToShine = ref("");
const animating = ref(false);

function markDuty() {
	store.markDone(props.duty, Objective.NORMAL)
	console.log(`Marked duty ${props.duty.id} as done`)
	shimmer(props.duty.name)
}

function markReward(reward: RewardType) {
	store.markCollected(props.duty, reward)
	console.log(`Marked duty ${props.duty.name}, ${reward.item} as collected`)
	shimmer(reward.item)
}

function shimmer(obj: string) {
	elemToShine.value = obj;
	setTimeout(() => {
		elemToShine.value = "";
	}, 500);
}

const isShining = (str: string) => { return elemToShine.value === str }

</script>

<template lang='pug'>
.duty.card.has-text-centered(:id="dutyType + '-' + duty.id")
	div.is-relative.click-target(@click='markDuty')
		.duty-image.card-image( :class='{ "complete": store.isObjectiveComplete(duty, Objective.NORMAL) }' )
			.image.is-3by1
				img(:src="duty.image")
		.card-header
			.card-header-title.duty-title.title.is-5 #{duty.name}
		.fill-element( v-if='store.isObjectiveComplete(duty, Objective.NORMAL)')
			img.X(src="/assets/img/X.png")
	.card-content
		.duty-content
			for reward in duty.rewards
				.reward.image.is-48x48(@click="markReward(reward)" :data-tooltip="getFullRewardName(reward)")
					img(:src='getRewardImg(reward.name)' :class='{ "shine shine-anim": isShining(reward.item) }')
					.fill-element(v-if='store.isRewardCollected(duty, reward)')
						img.X(src="/assets/img/X.png")
					div.shine-target( :class='{ "shine shine-anim": isShining(reward.item) }')
	div.shine-target(:class='{ "shine shine-anim": isShining(duty.name) }')
</template>
<style scoped lang="scss">
@use "@/assets/sass/style" as *;
@use "@/assets/sass/mixins" as *;

.card {
	display: flex;
	flex-direction: column;

	div.is-relative {
		flex-grow: 100;
	}

	.duty-content {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		row-gap: .2em;
		justify-content: space-around;
		font-family: "Eurostile Regular";
	}

	// Image
	.duty-image .image img {
		border-radius: 1em 1em 0 0;
		-webkit-mask-image: linear-gradient(to bottom,
				rgba(0, 0, 0, 1) 50%,
				rgba(0, 0, 0, 0));
	}
}
</style>