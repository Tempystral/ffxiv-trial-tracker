<script setup lang="ts">
import { ref } from "vue";

import * as gamedata from "../assets/data.json";
import Expansion from "../components/Expansion.vue";
import Modal from '../components/Modal.vue';
import sassStyles from '../assets/sass/style.scss';

const showModal = ref(false)

function toggleModal() {
	showModal.value = !showModal.value;
}
</script>

<template lang="pug">
.box#settingsButton
	.image.is-48x48(@click='toggleModal')
		img(src="/assets/img/icon/meteor_flat.png")

Expansion( :exp="gamedata.expansions[0]" )

Modal(:show='showModal' @close="toggleModal")
</template>

<style>
</style>

<!-- 
Do I only need to use ref() for dynamic data?
Consider: You will want to populate the pages with data from your main json file,
with names and images and everything, but the actual data being manipulated by the user is a subset of that data
-->