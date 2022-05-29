<script async setup lang="ts">
import { reactive, ref } from "vue";
import gamedata from "../assets/data.json";
import Expansion from "../components/Expansion.vue";
import { createUserData, getGameData, loadUserData } from "../ts/util"

const data = reactive(gamedata);


</script>

<template lang="pug" #default>
each expansion in data.expansions
	Expansion( :exp="data.expansions[expansion.id]" )
</template>
