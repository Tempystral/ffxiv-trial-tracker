<script setup lang="ts">
import { onBeforeMount, ref } from "vue";

//import gamedata from "../assets/data.json";
import Expansion from "../components/Expansion.vue";
import NotFound from "../pages/404.vue"
import { type ExpansionType } from "../types";

const props = defineProps<{
	exp: number;
	gamedata: ExpansionType
}>();

</script>

<template lang="pug">
//- div(v-if="2 <= exp && exp <= 6")
//- div(v-else)
if 2 <= exp && exp <= 6
	Expansion( :exp="gamedata" )
else
	NotFound
</template>
