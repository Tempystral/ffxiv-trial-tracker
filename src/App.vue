<script setup lang="ts">
import { ref } from 'vue';
import Modal from '/components/Modal.vue';
import sassStyles from '/assets/sass/style.scss';

const showModal = ref(false)

function toggleModal() {
	showModal.value = !showModal.value;
}
</script>

<template lang="pug">
.box#settingsButton
	.image.is-48x48(@click='toggleModal')
		img(src="/assets/img/icon/meteor_flat.png")

//- Renders the contents returned by the vue router
router-view

Modal(:show='showModal' @close="toggleModal")
</template>

<style>
</style>
