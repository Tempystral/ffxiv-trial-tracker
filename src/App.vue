<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Modal from '/components/Modal.vue';
import sassStyles from '/assets/sass/style.scss';
import localforage from 'localforage';

// Ensure localforage is set up before anything else
localforage.config({
	name: "FFXIV Tracker",
	storeName: "ffxivtracker"
});

const showModal = ref(false)

function toggleModal() {
	showModal.value = !showModal.value;
}

</script>

<template lang="pug">
//- TODO: Navbar (put button in navbar or no?)
.box#settingsButton
	.image.is-48x48(@click='toggleModal')
		img(src="/assets/img/icon/meteor_flat.png")

//- Renders the contents returned by the vue router
router-view

Modal(:show='showModal' @close="toggleModal")
</template>
