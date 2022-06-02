<script setup lang="ts">
import { ref } from 'vue';
import Modal from '/components/Modal.vue';
import sassStyles from '/assets/sass/style.scss';
import localforage from 'localforage';
import { useStore } from './ts/store';
import { getLocalForageSafe, isUserData } from './ts/util';

// Ensure localforage is set up before anything else
localforage.config({
	name: "FFXIV Tracker",
	storeName: "ffxivtracker"
});

const store = useStore();
// Load data
getLocalForageSafe("duties").then(res => {
	if (res.success == true) {
		const data = res.value as { duties: object };
		if (isUserData(data.duties)) {
			store.$state.duties = data.duties;
			console.log(store.$state.duties);
		}
	}
	else {
		console.log(res.error)
	}
});
// Subscribe to state changes app-wide
store.$subscribe((_, state) => {
	localforage.setItem("duties", JSON.stringify(state));
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

<style lang="scss">
@use "/assets/sass/style.scss"as *;
</style>
