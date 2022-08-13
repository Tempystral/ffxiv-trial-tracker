<script setup lang="ts">
import { ref } from 'vue';
import Modal from '/components/Modal.vue';
import localforage from 'localforage';
import { useDutyStore } from './store/DutyStore';
import { getLocalForageSafe, isUserData } from './ts/util';
import Navbar from '/components/Navbar.vue';

// Ensure localforage is set up before anything else
localforage.config({
	name: "FFXIV Tracker",
	storeName: "ffxivtracker"
});

const store = useDutyStore();
// Load data
getLocalForageSafe("duties").then(res => {
	if (res.success == true) {
		const data = res.value as { duties: object };
		if (isUserData(data.duties)) {
			store.$state.duties = data.duties;
			//console.log(store.$state.duties);
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

const showModal = ref(false);

function toggleModal() {
	showModal.value = !showModal.value;
}

</script>

<template lang="pug">
Navbar(@openModal="toggleModal")

//- Renders the contents returned by the vue router
router-view

Modal(:show='showModal' @close="toggleModal")
</template>

<style lang="scss">
@use "/assets/sass/style.scss" as *;
</style>
