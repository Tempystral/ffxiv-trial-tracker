<script setup lang='ts'>
import { type Collection } from '../types';
import Raid from './Duties/Raid.vue';
import Trial from './Duties/Trial.vue';
import Hildibrand from './Duties/Hildibrand.vue';
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
		summary.group-title.has-text-centered.title.is-2
			.title.is-2 #{collection.title}
		block

if collection.dutyType == 'raid'
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

else if collection.dutyType == 'trial'
	.column.is-10-fullhd.is-12-widescreen.is-12-desktop.is-12-tablet
		+detail
			.duty-group.box
				.group-content.columns.is-multiline
					each duty in collection.duties
						.column.is-3-fullhd.is-3-widescreen.is-3-desktop.is-4-tablet
							Trial(:dutyType='collection.dutyType', :duty='duty')

else if collection.dutyType == 'allianceraid'
	.column.is-8-fullhd.is-12-widescreen.is-12-desktop.is-12-tablet
		+detail
			.duty-group.box
				.group-content.columns.is-multiline.is-centered
					each duty in collection.duties
						.column.is-4-fullhd.is-4-widescreen.is-4-desktop.is-4-tablet
							Trial(:dutyType='collection.dutyType', :duty='duty')

else if collection.dutyType == 'special'
	.column.is-10-fullhd.is-12-widescreen.is-12-desktop.is-12-tablet(:data-dutyType='collection.dutyType' :data-collection='collection.title')
		+detail
			.duty-group.box
				.group-content.columns.is-multiline.is-centered
					each duty in collection.duties
						.column.is-3-fullhd.is-3-widescreen.is-3-desktop.is-4-tablet
							Hildibrand(:dutyType="collection.dutyType", :duty="duty")
				
</template>

<style lang="scss">
@use "@/assets/sass/mixins" as *;
@use "@/assets/sass/variables" as *;

.group-title {
	font-family: "Jupiter Pro Regular";
	@include bevel($gold-fill, $gold-shadow, white);
	-webkit-font-smoothing: subpixel-antialiased;
	text-align: center;

	.title {
		display: inline-block;
	}
}

.column:not([data-dutytype="special"]) {
	.duty-group {
		@include metal-border;
		background: $ff-blue;
	}
}

.column[data-dutytype="special"] {
	.box {
		background: none;
		box-shadow: none;
	}

	&[data-collection="Inspector Hildibrand"] {
		.duty-group {
			position: relative;
			display: grid;
			background-color: black;
			background-image: url("@/assets/img/special/hildibrand_bg_narrow.png");
			background-size: contain;
			background-position: center bottom;
			background-repeat: no-repeat;

			&::before {
				content: "";
				height: 5em;
			}

			&::after {
				content: "";
				height: 20em;
			}

			clip-path: polygon(0% 10%, 100% 0%, 100% 90%, 0 100%);

			.group-content {}
		}
	}

	// .duty-group {
	// 	background-image: "";
	// 	background-size: contain;
	// 	background-repeat: no-repeat;
	// 	border-style: "";
	// 	border-image-source: "";
	// 	border-image-slice: 20%;
	// 	border-image-width: 35px;
	// 	border-image-outset: 5px;
	// }
}

.raid-set-title-container {
	padding: 0;
	background-color: transparent;
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
			transition: .25s transform ease;
		}

		&::after {
			transform: rotate(180deg) translateY(-10%);
			// transform-origin: 50% 60%;
		}

		&::before {
			transform: translateY(10%);
		}
	}

	&[open] summary::before,
	&[open] summary::after {
		transform: rotate(90deg) translateX(10%);
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