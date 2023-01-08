<script setup>
import BottomNavigationVue from './components/BottomNavigation.vue';
import Navbar from "./components/NavBar.vue"
import { provide } from 'vue';
import store from './store';

provide("mapStore" , store)
</script>


<template>
<Navbar></Navbar>
<router-view></router-view>
<BottomNavigationVue></BottomNavigationVue>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0
}
</style>>


