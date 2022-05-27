<script setup lang="ts">

defineProps<{
	show: boolean
}>();

// These are the signals the modal can output for other components to listen to
const emit = defineEmits([
	"close",
])

// Output a close emit to whatever component is listening
function closeModal() {
	emit("close")
}
</script>
<!-- The onClick calls closeModal() which emits signal "close" -->
<template lang="pug">
.modal(:class="{ 'is-active': show }")
	.modal-background( @click="closeModal" )
	.modal-content
		.box
			p This is some text
</template>