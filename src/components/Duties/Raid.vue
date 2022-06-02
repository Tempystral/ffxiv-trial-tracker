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
const elemToShine = ref("");

function markDuty(obj: string) {
	store.markDone(props.duty, obj);
	console.log(`Marked duty ${props.duty.id} as done`);
	shimmer(obj);
}

function shimmer(obj: string) {
	elemToShine.value = obj;
	setTimeout(() => {
		elemToShine.value = "";
	}, 700);
}

</script>

<template lang='pug'>
.duty.raid.tile.is-child.box(:id="dutyType + '-' + duty.id")
	.columns.is-gapless.is-multiline()
		.column.is-1
		.column.is-1.objective-container
			for obj in duty.objectives
				.image.is-48x48(@click='markDuty(obj.name)' :class='{ "shine shine-anim": elemToShine === obj.name }')
					img(:src='`/assets/img/icon/duty_raid_${obj.name}.png`')
					.fill-element(v-if='store.isObjectiveComplete(duty, obj.name)')
						img.X(src="/assets/img/X.png")

		.raid-content.column.is-4
			div
				.duty-title.title.is-5 #{duty.name}
				//- .duty-content This is some content!
		.raid-image.column.is-6
			.image.is-fullwidth( :class='{ "complete": store.areObjectivesComplete(duty, Objective.NORMAL, Objective.SAVAGE) }' )
				img(:src='duty.image')
		
</template>
