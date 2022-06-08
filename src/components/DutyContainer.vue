<script setup lang='ts'>
import { type Collection } from '../types';
import Raid from './Duties/Raid.vue';
import Trial from './Duties/Trial.vue';
import { Accordion } from "../ts/accordion";
import { computed, onActivated, onBeforeMount, onMounted, ref } from 'vue';
import { usePrefStore } from "../store/PrefStore";
import { getLocalForageSafe } from '../ts/util';
import localforage from 'localforage';

const props = defineProps<{
	collection: Collection
}>()

const prefs = usePrefStore()

function setOpen(e: Event, str: string) {
	e.preventDefault();
	const details = e.currentTarget as HTMLDetailsElement;
	if (details.getAttribute("data-clicked") === "true") {
		prefs.setDetailState(str, details.open);
		details.removeAttribute("data-clicked");
	}
}

onBeforeMount(() => {
	// Load data
	prefs.loadState();
	// Subscribe to state changes
	prefs.$subscribe((_, state) => {
		localforage.setItem("preferences", JSON.stringify(state));
	});
})

onMounted(() => {
	document.querySelectorAll("details.dutyDetail").forEach((el) => {
		new Accordion(el as HTMLDetailsElement, ".duty-group");
	});
});
</script>

<template lang='pug'>
mixin detail
	details(:open='prefs.isOpen(collection.title)' @toggle='setOpen($event, collection.title)').dutyDetail
		summary.group-title.title.is-2.has-text-centered #{collection.title}
		block

if collection.dutyType == 'raid'
	.column.is-2-fullhd.is-1-widescreen.is-0
	.column.is-8-fullhd.is-10-widescreen.is-12-desktop.is-12-tablet
		+detail
			.duty-group.box.tile.is-ancestor.m-0
				.group-content.tile.is-vertical
					each duty in collection.duties
						.raid-set-container.tile.is-12
							.tile.is-parent.is-vertical.is-1
								.raid-set-title-container.tile.is-child.box
									.raid-set-title.title.is-3 #{duty.raidset}
							.tile.is-parent.is-vertical.is-11
								each raid in duty.raids
									Raid(:dutyType='collection.dutyType', :duty='raid')
	.column.is-2-fullhd.is-1-widescreen.is-0

else if collection.dutyType == 'trial'
	.column.is-8-fullhd.is-12-widescreen.is-12-desktop.is-12-tablet
		+detail
			.duty-group.box
				.group-content.columns.is-multiline
					each duty in collection.duties
						.column.is-3-fullhd.is-3-widescreen.is-3-desktop.is-4-tablet
							Trial(:dutyType='collection.dutyType', :duty='duty')

else if collection.dutyType == 'allianceraid'
	.column.is-4-fullhd.is-12-widescreen.is-12-desktop.is-12-tablet
		+detail
			.duty-group.box
				.group-content.columns.is-multiline.is-centered
					each duty in collection.duties
						.column.is-6-fullhd.is-4-widescreen.is-4-desktop.is-4-tablet
							Trial(:dutyType='collection.dutyType', :duty='duty')
</template>

<style lang="scss">
@use "@/assets/sass/mixins" as *;

.group-title {
	font-family: "Jupiter Pro Regular";
	@include bevel($gold-fill, $gold-shadow, white);
	-webkit-font-smoothing: subpixel-antialiased;
}

.column:not([duty-type="special"]) {
	.duty-group {
		@include metal-border;
		background: #08084e9f;
	}
}

.raid-set-title-container {
	padding: 0;
	background-color: rgba(0, 0, 0, 0);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	border: {
		style: ridge;
		width: 4px;
		radius: 2em;
		color: #dedede #c5c5c5;
		top: none;
		left: none;
		bottom: none;
	}

	.raid-set-title {
		font-family: "Jupiter Pro Regular";
		@include bevel($gold-fill, $gold-shadow, white);
		-webkit-font-smoothing: subpixel-antialiased;
		writing-mode: vertical-lr;
		transform: rotate(180deg);
	}
}

details:not(.modalDetail) {
	summary {
		list-style: none;
		cursor: pointer;

		&::marker {
			display: none;
		}

		&::before,
		&::after {
			content: '';
			display: inline-block;
			background-image: url("@/assets/img/Arrow.png");
			background-repeat: no-repeat;
			width: 46px;
			height: 46px;
			transform-origin: 50% 50%;
			transition: .25s transform ease;
		}

		&::after {
			transform: rotate(180deg);
		}
	}

	&[open] summary::before,
	&[open] summary::after {
		transform: rotate(90deg);
	}
}

.arrow-shine {
	animation: arrow-shine .5s steps(4) 1;
}

@keyframes arrow-shine {
	from {
		background-position: 0px;
	}

	to {
		background-position: -184px;
	}
}
</style>