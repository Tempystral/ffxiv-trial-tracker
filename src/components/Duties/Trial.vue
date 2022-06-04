<script setup lang='ts'>
import { ref } from "vue";
import { useStore } from "../../ts/store";
import { Objective, type RewardType, type Duty } from "../../types";
import { getFullRewardName, getRewardImg } from "../../ts/util";

const props = defineProps<{
	dutyType: string,
	duty: Duty
}>()

const store = useStore();
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
	div.is-relative(@click='markDuty')
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