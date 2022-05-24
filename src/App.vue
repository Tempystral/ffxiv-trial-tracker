<script setup lang="ts">
import { ref } from "vue";
import Pugtest from "./components/Pugtest.vue";

const dataObj = { name: 'This is the name var' };
// Do I only need to use ref() for dynamic data?
// Consider: You will want to populate the pages with data from your main json file,
// with names and images and everything, but the actual data being manipulated by the user is a subset of that data

</script>

<template lang="pug">

img(alt="Vue logo" src="./assets/logo.png")

//- Note the colon, which we are using to v-bind the object
//- Equivalent to Pugtest( v-bind:data={ name: 'This is the name var' } )
Pugtest( v-bind:data="dataObj" )

</template>

<style>
</style>
