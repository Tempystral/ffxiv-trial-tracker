<script async setup lang="ts">
//import gamedata from "../assets/data.json";
import Expansion from "../components/Expansion.vue";

const props = defineProps<{
	gamedata: object;
}>();

console.log(props.gamedata)

</script>

<template lang="pug" #default>
each expansion in gamedata.expansions
	Expansion( :exp="gamedata.expansions.find( (ex) => ex.id == expansion.id)")
</template>
