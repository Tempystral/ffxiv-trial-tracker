<script setup lang='ts'>
import localforage from "localforage";
import { ref, toRef } from "vue";
import { useDutyStore } from '../../store/DutyStore'
import { Objective, type RewardType, type Duty } from "../../types";
import { getFullRewardName, getRewardImg, getObjectiveImg } from "../../ts/util";

const props = defineProps<{
	dutyType: string,
	duty: Duty
}>()

const store = useDutyStore();
const elemToShine = ref("");
const rewards = ref({ "normal": [] as Array<RewardType>, "savage": [] as Array<RewardType> });
// Set up reward slices
if (props.duty.rewards != null) {
	rewards.value = {
		"normal": props.duty.rewards.filter(r => { return r.objective == "normal" }) || null,
		"savage": props.duty.rewards.filter(r => { return r.objective == "savage" }) || null
	}
}

function markDuty(obj: string) {
	store.markDone(props.duty, obj);
	console.log(`Marked duty ${props.duty.id} as done`);
	shimmer(obj);
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
	}, 700);
}
const isShining = (str: string) => { return elemToShine.value === str }
function getRaidSet(diff: string) { return props.duty.rewards.find(r => { r.name == diff }) }
function hasRewards(str: string) { return rewards.value[str as keyof object] && (rewards.value[str as keyof object] as Array<RewardType>).length }
</script>

<template lang='pug'>
.duty.raid.tile.is-child.box(:id="dutyType + '-' + duty.id")
	.columns.is-gapless.is-multiline
		.raid-image.column.is-5
			.image.is-fullwidth( :class='{ "complete": store.areObjectivesComplete(duty, duty.objectives.map(o => o.name)) }' )
				img(:src='duty.image')
			.raid-content-title-container
				.duty-title.title.is-4 #{duty.name}
			div.shine-target(:class='{ "shine shine-anim": isShining(duty.name) }')

		.raid-content.column.is-7
			.columns.is-gapless.is-centered
				for obj in duty.objectives
					.column.is-half(:class='{"is-justify-content-center": !hasRewards(obj.name), "is-justify-content-space-evenly": hasRewards(obj.name) }')
						.level.mb-0.is-justify-content-center(@click='markDuty(obj.name)')
							.level-left.click-target
								.level-item
									.image.is-48x48
										img(:src='getObjectiveImg(obj.name)')
										.fill-element(v-if='store.isObjectiveComplete(duty, obj.name)')
											img.X(src="/assets/img/X.png")
										div.shine-target( :class='{ "shine shine-anim": isShining(obj.name) }')
								.level-item
									h5.mb-0 #{obj.name.toLocaleUpperCase()}
						hr(v-if='hasRewards(obj.name)')
						.level
							for reward in rewards[obj.name]
								.level-item
									.reward.image.is-48x48(@click="markReward(reward)" :data-tooltip="getFullRewardName(reward)")
										img(:src='getRewardImg(reward.name)')
										.fill-element(v-if='store.isRewardCollected(duty, reward)')
											img.X(src="/assets/img/X.png")
										div.shine-target( :class='{ "shine shine-anim": isShining(reward.item) }')

		
</template>

<style scoped lang="scss">
.raid {
	padding: 0;
	position: relative;
	font-family: "Eurostile Regular";

	.raid-content>.columns {
		height: 100%;

		.column {
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
		}
	}

	.raid-content-title-container {
		background-image: linear-gradient(to bottom, black 50%, transparent);
		position: absolute;
		width: 100%;
		top: 0;
		right: 0;
		z-index: 1;
		text-align: center;
		text-shadow: #000000;
		border-radius: 0.6em;
	}

	.raid-image {
		position: relative;

		.image {
			img {
				height: 100%;
			}

			height: 100%;
			border-radius: 0 1em 1em 0;
			// -webkit-mask-image: linear-gradient(
			//   to left,
			//   rgba(0, 0, 0, 1) 80%,
			//   rgba(0, 0, 0, 0)
			// );
		}
	}
}

hr {
	margin: initial;
	position: relative;
	left: 2%;
	width: 96%;
	border: 0;
	height: 1px;
	background: none;
	background-image: linear-gradient(to right,
			#ccc,
			#333 30%,
			#333 70%,
			#ccc 100%);
}
</style>