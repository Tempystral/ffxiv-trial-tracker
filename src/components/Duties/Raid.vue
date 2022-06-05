<script setup lang='ts'>
import localforage from "localforage";
import { ref, toRef } from "vue";
import { useStore } from "../../ts/store";
import { Objective, type RewardType, type Duty } from "../../types";
import { getFullRewardName, getRewardImg } from "../../ts/util";

const props = defineProps<{
	dutyType: string,
	duty: Duty
}>()

const store = useStore();
const elemToShine = ref("");
// Set up reward slices
const rewards = toRef(props, "duty").value.rewards || null
let normalRewards: Array<RewardType> = [];
let savageRewards: Array<RewardType> = [];
if (rewards != null) {
	normalRewards = rewards.filter(r => { return r.objective == "normal" })
	savageRewards = rewards.filter(r => { return r.objective == "savage" })
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

</script>

<template lang='pug'>
.duty.raid.tile.is-child.box(:id="dutyType + '-' + duty.id")
	.columns.is-gapless.is-multiline()
		.column.is-2.reward-container
			for reward in normalRewards
				.reward.image.is-48x48(@click="markReward(reward)" :data-tooltip="getFullRewardName(reward)")
					img(:src='getRewardImg(reward.name)')
					.fill-element(v-if='store.isRewardCollected(duty, reward)')
						img.X(src="/assets/img/X.png")
					div.shine-target( :class='{ "shine shine-anim": isShining(reward.item) }')

		.column.is-2.objective-container
			for obj in duty.objectives
				.level.mb-0(@click='markDuty(obj.name)')
					.level-left
						.level-item.image.is-48x48
							img(:src='`/assets/img/icon/duty_raid_${obj.name}.png`')
							.fill-element(v-if='store.isObjectiveComplete(duty, obj.name)')
								img.X(src="/assets/img/X.png")
							div.shine-target( :class='{ "shine shine-anim": isShining(obj.name) }')
						.level-item
							h5.mb-0 #{obj.name.toLocaleUpperCase()}

		.raid-content.column.is-3
			//- .raid-content-title-container
			//- 	.duty-title.title.is-5 #{duty.name}
			//- .duty-content.is-flex.is-flex-direction-row
			//- 	for obj in duty.objectives
			//- 		.image.is-48x48(@click='markDuty(obj.name)' :class='{ "shine shine-anim": elemToShine === obj.name }')
			//- 			img(:src='`/assets/img/icon/duty_raid_${obj.name}.png`')
			//- 			.fill-element(v-if='store.isObjectiveComplete(duty, obj.name)')
			//- 				img.X(src="/assets/img/X.png")

		.raid-image.column.is-5
			.image.is-fullwidth( :class='{ "complete": store.areObjectivesComplete(duty, Objective.NORMAL, Objective.SAVAGE) }' )
				img(:src='duty.image')
			.raid-content-title-container
				.duty-title.title.is-4 #{duty.name}
	//- div.shine-target(:class='{ "shine shine-anim": isShining(duty.name) }')
</template>
