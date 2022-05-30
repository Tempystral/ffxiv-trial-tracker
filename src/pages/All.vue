<script async setup lang="ts">
import gamedata from "../assets/data.json";
import Expansion from "../components/Expansion.vue";

</script>

<template lang="pug" #default>
each expansion in gamedata.expansions
	Expansion( :exp="gamedata.expansions[expansion.id]" )
</template>
