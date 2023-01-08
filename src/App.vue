<script setup>
import BottomNavigationVue from './components/BottomNavigation.vue';
import Navbar from "./components/NavBar.vue"
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


