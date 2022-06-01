<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '../ts/store';


defineProps<{
	show: boolean
}>();

const resetText = ref("Reset");
const resetConfirm = ref(false);
const store = useStore();

// These are the signals the modal can output for other components to listen to
const emit = defineEmits([
	"close"
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
		store.$state = { duties: [] };
		console.log("Data reset");
	}
}


</script>
<!-- The onClick calls closeModal() which emits signal "close" -->
<template lang="pug">
.modal(:class="{ 'is-active': show }")
	.modal-background( @click="closeModal" )
	.modal-card
		header.modal-card-head
			p.modal-card-title Settings
			button.is-medium.delete(aria-label="close" @click="closeModal")
		hr
		section.modal-card-body 
			//- .box
				p Theme 
			.box.level
				.level-left
					.level-item
						p Click here to reset all settings: 
					.level-item
						button.button.is-danger(@click="reset") #{resetText}
			.box
				details
					summary Credits
					p Credits 
		footer.modal-card-foot.is-block
			.level
				.level-left
					.level-item
						p.subtitle.is-5 © Tempystral #{new Date().getFullYear()}

</template>