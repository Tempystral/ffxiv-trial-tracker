<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Accordion } from '../ts/accordion';
import { useDutyStore } from '../store/DutyStore';
import { usePrefStore } from '../store/PrefStore';


defineProps<{
	show: boolean
}>();

const resetText = ref("Reset");
const resetConfirm = ref(false);

const store = useDutyStore();
const prefs = usePrefStore();

// These are the signals the modal can output for other components to listen to
const emit = defineEmits([
	"close", "reset"
])

// Output a close emit to whatever component is listening
function closeModal() {
	resetConfirm.value = false;
	resetText.value = "Reset";
	emit("close")
}

function reset() {
	if (!resetConfirm.value) {
		resetText.value = "Really reset data?";
		resetConfirm.value = true;
	}
	else if (resetConfirm.value) {
		resetText.value = "Data reset";
		store.$reset();
		prefs.$reset();
		console.log("Data reset");
		emit("reset");
	}
}

onMounted(() => {
	document.querySelectorAll("details.modalDetail").forEach((el) => {
		new Accordion(el as HTMLDetailsElement, "div");
	});
});

</script>
<!-- The onClick calls closeModal() which emits signal "close" -->
<template lang="pug">
.modal(:class="{ 'is-active': show }")
	.modal-background( @click="closeModal" )
	.modal-card
		header.modal-card-head
			p.modal-card-title Settings
			button#modalClose.is-medium.delete(aria-label='Close' @click="closeModal")
		hr
		section.modal-card-body 
			//- .box
				p Theme 
			.box
				.level: .level-left
					.level-item
						label.checkbox
							input(type="checkbox", name="spoilermode" v-model='prefs.spoilermode' ).mr-2
							| Spoiler mode
					.level-item
						p (Hide duty groups you haven't opened)

				.level: .level-left
					.level-item
						button.button.is-danger(@click="reset") #{resetText}
					.level-item
						p Click here to reset all data

			.box
				details.modalDetail
					summary Frequently-Asked Questions
					div
						dl
							dt Q: Why is Urth's Fount listed with the ARR Extremes?
							dd A: It's as difficult as the early extremes and drops unique loot, so it's worth tracking like an Extreme.

							dt Q: Do people actually ask questions all that frequently?
							dd A: Quiet, you.

			.box
				details.modalDetail
					summary Credits
					div
						p Credits
		hr
		footer.modal-card-foot.is-block
			.level
				.level-left
					.level-item
						p.subtitle.is-5 © Tempystral #{new Date().getFullYear()}

</template>

<style lang="scss">
@use "@/assets/sass/mixins" as *;

.modal-card {
	// &:before {
	//   @include fill-element;
	//   // border-style: solid;
	//   // border-image-source: url("/assets/img/theme/frame_lodestone.png");
	//   // border-image-slice: 25%;
	//   // border-image-width: 3em;
	//   // border-radius: 1em;
	//   @include gold-border;
	//   z-index: 1;
	// }

	@include gold-border;
	@include contained-bg;
	background-image: linear-gradient(#565759 0%, #2f2f2c 20%);

	p,
	dd,
	dt,
	label,
	summary {
		font-family: "Eurostile Regular", Arial, Helvetica, sans-serif;
		color: white;
	}

	.box {
		//background-image: linear-gradient(#565759 0%, #2f2f2c 20%);
		background: #202020;

		p,
		label,
		summary {
			font-size: 1.1em;
		}
	}

	.modal-card-head,
	.modal-card-body,
	.modal-card-foot {
		border: none;
		background: none;
		margin-inline: 5px;
		padding-inline: 15px;
	}

	hr {
		margin: initial;
		position: relative;
		left: 2%;
		width: 96%;
		border: 0;
		height: 1px;
		background: #333;
		background-image: linear-gradient(to right,
				#333,
				#ccc 30%,
				#ccc 70%,
				#333 100%);
	}
}
</style>