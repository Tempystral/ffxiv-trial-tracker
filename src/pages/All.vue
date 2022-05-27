<script setup lang="ts">
import { ref } from "vue";

import gamedata from "../assets/data.json";
import Expansion from "../components/Expansion.vue";

</script>

<template lang="pug">

each expansion in gamedata.expansions
	Expansion( :exp="gamedata.expansions[expansion.id]" )

</template>
