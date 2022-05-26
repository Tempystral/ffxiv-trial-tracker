<script setup lang="ts">
import { ref } from "vue";
import Pugtest from "../components/Pugtest.vue";

import * as gamedata from "../assets/data.json";
import Expansion from "../components/Expansion.vue";
// Do I only need to use ref() for dynamic data?
// Consider: You will want to populate the pages with data from your main json file,
// with names and images and everything, but the actual data being manipulated by the user is a subset of that data


</script>

<template lang="pug">

Expansion( v-bind:exp="gamedata.expansions[0]" )
//- Note the colon, which we are using to v-bind the object
//- Equivalent to Pugtest( v-bind:data={ name: 'This is the name var' } )

</template>

<style>
</style>
