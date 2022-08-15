<script setup lang='ts'>
import { ref } from "vue";
import { useDutyStore } from '../../store/DutyStore';
import { usePrefStore } from '../../store/PrefStore';
import { Objective, type RewardType, type Duty } from "../../types";
import { getFullRewardName } from "../../ts/util";
import { getRewardImg, getObjectiveImg } from "../../ts/data";

const props = defineProps<{
	dutyType: string,
	duty: Duty
}>()

const store = useDutyStore();
const prefs = usePrefStore();
const elemToShine = ref("");
const elemToStamp = ref("");
const animating = ref(false);

function markDuty() {

	if (isRevealed()) {
		store.markDone(props.duty, Objective.NORMAL)
		console.log(`Marked duty ${props.duty.id} as done`)
		stamp(props.duty)
	}
	spoil();
}

function markReward(reward: RewardType) {

	if (isRevealed()) {
		store.markCollected(props.duty, reward)
		console.log(`Marked duty ${props.duty.name}, ${reward.item} as collected`)
		shimmer(reward.item)
	}
	spoil();

}

function shimmer(obj: string) {
	elemToShine.value = obj;
	setTimeout(() => {
		elemToShine.value = "";
	}, 500);
}
const isShining = (str: string) => { return elemToShine.value === str }

function stamp(obj: Duty) {
	if (store.isObjectiveComplete(obj, Objective.NORMAL)) {
		elemToStamp.value = obj.name;
		setTimeout(() => {
			elemToStamp.value = "";
		}, 500);
	}

}

const isStamped = (str: string) => { return elemToStamp.value === str }

function spoil() {
	prefs.spoil(props.duty.name);
}

const isRevealed = () => { return prefs.isRevealed(props.duty.name); }

</script>

<template lang='pug'>
.duty.has-text-centered(:data-dutyType='dutyType' :id="dutyType + '-' + duty.id")
	.folderimg.image.is-4by5
		img(src="@/assets/img/special/folder.png")

	.duty-image( :class='{ "complete": store.isObjectiveComplete(duty, Objective.NORMAL), "classified": !isRevealed() }' )
		.image.is-3by1
			img(:src="duty.image")

	.card
		.spacer.is-flex-grow-1.click-target(@click='markDuty')
		.card-header
			.card-header-title.duty-title.title.is-5 #{isRevealed() ? duty.name : "CLASSIFIED"}
		.card-content
			.duty-content
				for reward in duty.rewards
					.reward.image.is-48x48(@click="markReward(reward)" :data-tooltip="isRevealed() ? getFullRewardName(reward) : 'CLASSIFIED'")
						img(:src='getRewardImg(reward.name)' :class='{ "shine": isShining(reward.item), "classified": !isRevealed() }')
						.fill-element(v-if='store.isRewardCollected(duty, reward)')
							img.X(src="/assets/img/X.png")
						div.shine-target( :class='{ "shine shine-anim": isShining(reward.item) }')


	div.stamp-target(:class='{ "stamp": isStamped(duty.name) }')
		.fill-target( v-if='store.isObjectiveComplete(duty, Objective.NORMAL)')
			img.X(src="@/assets/img/caseclosed.svg")
</template>

<style scoped lang="scss">
@use "@/assets/sass/mixins" as *;
@use "@/assets/sass/animations" as *;

.folderimg,
.stamp-target {
	z-index: 2;
}

.duty-image {
	position: absolute;
	top: 10%;
	left: 17%;
	width: 125%;
	z-index: 0;
	transform: rotate(6deg);
	transition: all 0.5s ease-in;

	.image {
		width: 50%;
		height: 100%;

		img {
			object-fit: cover;
			object-position: 20%
		}
	}
}

#special-20026 .duty-image .image img {
	object-position: 50%;
}

.reward img {
	transition: all 0.5s ease-in;
}

.card {
	position: absolute;
	bottom: 0%;
	width: 85%;
	height: 100%;

	background-color: transparent;
	box-shadow: none;

	display: flex;
	flex-direction: column;
	z-index: 2;
}

.duty-content {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	font-family: "Eurostile Regular";
}

.duty {
	height: 100%; // Fix to make column content full-height
	display: flex;
	flex-direction: column;
	position: relative;
	justify-content: space-between;

	.duty-title {
		font-family: "Jupiter Pro Regular";
		color: red;
		font-weight: bold;
		justify-content: center;
	}
}
</style>