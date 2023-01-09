<script setup>
import BottomNavigationVue from './components/BottomNavigation.vue';
import Navbar from "./components/NavBar.vue"
import { provide,ref ,toRef} from 'vue';
import store from './store';

const isLogin = toRef(store.state,"isLogin")
provide("mapStore" , store)
</script>


<template>
<Navbar></Navbar>
<router-view></router-view>
<BottomNavigationVue v-show="isLogin"></BottomNavigationVue>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0
}
</style>>


