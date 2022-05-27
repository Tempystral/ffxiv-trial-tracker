<script setup lang="ts">
import { ref } from "vue";

import * as gamedata from "../assets/data.json";
import Expansion from "../components/Expansion.vue";

const props = defineProps<{
	exp: string;
}>();

</script>

<template lang="pug">

Expansion( :exp="gamedata.expansions[parseInt(exp)]" )

</template>
