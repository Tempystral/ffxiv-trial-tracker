<script setup lang='ts'>
import localforage from 'localforage';
import { onBeforeMount, onMounted } from 'vue';
import { usePrefStore } from '../../../store/PrefStore';
import { Accordion } from '../../../ts/accordion';
import { type Collection } from '../../../types';
import Hildibrand from './Hildibrand.vue';
import Trial from '../Trial.vue';

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

<template lang="pug">
mixin detail
	details(:open='prefs.isOpen(collection.title)' @toggle='setOpen($event, collection.title)').dutyDetail
		summary.group-title.has-text-centered.title.is-2
			.title.is-2 #{collection.title}
		block

if collection.title.includes('Hildibrand')
	.column.is-10-fullhd.is-12-widescreen.is-12-desktop.is-12-tablet(:data-dutyType='collection.dutyType' :data-collection='collection.title')
		+detail
			.duty-group.box
				.group-content.columns.is-multiline.is-centered
					each duty in collection.duties
						.column.is-3-fullhd.is-3-widescreen.is-3-desktop.is-4-tablet
							Hildibrand(:dutyType="collection.dutyType", :duty="duty")
//- else if collection.title.includes('Triad')
//- 	.column.is-8-fullhd.is-12-widescreen.is-12-desktop.is-12-tablet(:data-dutyType='collection.dutyType' :data-collection='collection.title')
//- 		+detail
//- 			.duty-group.box
//- 				.triadcontainer
//- 					#sophia-bg.triadbg
//- 					#seph-bg.triadbg
//- 					#zurv-bg.triadbg
//- 					#border.triadbg
//- 				.group-content.columns.is-multiline.is-centered
//- 					each duty in collection.duties
//- 						.column.is-4-fullhd.is-4-widescreen.is-4-desktop.is-4-tablet
//- 							Triad(:dutyType='collection.dutyType', :duty='duty')
</template>

<style lang="scss">
@use "@/assets/sass/mixins" as *;

.column[data-dutytype="special"] {

	&[data-collection="Inspector Hildibrand"] {
		.box {
			background: none;
			box-shadow: none;
		}

		.duty-group {
			position: relative;
			display: grid;
			background-color: black;
			background-image: url("@/assets/img/special/hildibrand_bg_narrow.png");
			background-size: contain;
			background-position: center bottom;
			background-repeat: no-repeat;
			clip-path: polygon(0% 10%, 100% 0%, 100% 90%, 0 100%);

			&::before {
				content: "";
				height: 5em;
			}

			&::after {
				content: "";
				height: 20em;
			}
		}
	}

	&[data-collection="Warring Triad"] {
		.duty-group {
			//@include metal-border;
			background: center top / cover no-repeat url("@/assets/img/bg/azys_lla.webp");
			position: relative;
			height: 55em;
		}

		.triadcontainer {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border-radius: 6px;
			border: solid .50rem black;

			.triadbg {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: 0;
			}

			#border {
				box-shadow: inset 0px 0px .5em .5em black;
			}

			#seph-bg {
				background: center 10% / cover no-repeat url("@/assets/img/special/triad/sephirot.webp");
				height: 100%;
			}

			#sophia-bg {
				background: center 10% / cover no-repeat url("@/assets/img/special/triad/sophia.webp");
				height: 100%;
			}

			#zurv-bg {
				background: center 10% / cover no-repeat url("@/assets/img/special/triad/zurvan.webp");
				height: 100%;
			}
		}

		// .group-content {
		// 	padding-top: 10em;
		// 	padding-bottom: 20em;
		// }
	}
}
</style>