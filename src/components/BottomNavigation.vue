
<script setup>
import router from '../router';
import { inject } from 'vue';

const mapStore = inject("mapStore")
function logout(){
  mapStore.setToken("")
  mapStore.setIsLogin(false)
  localStorage.removeItem('token')
  router.push("/login")
}

</script>

<template>
    <nav class="mobile-bottom-nav">
	<div class="mobile-bottom-nav__item mobile-bottom-nav__item">
    <router-link class="mobile-bottom-nav__item-content"  to="/">
      <i class="bi bi-house"></i>
			home
     </router-link>	
	</div>
	<div class="mobile-bottom-nav__item">		
    <router-link class="mobile-bottom-nav__item-content"  to="/usersetting">
      <i class="bi bi-gear"></i>
			setting
     </router-link>	
	</div>
  <div class="mobile-bottom-nav__item">		
    <button class="mobile-bottom-nav__item-content btn" style="font-size: 12px;" @click="logout">
      <i class="bi bi-box-arrow-right"></i>
			logout
    </button>	
	</div>
</nav> 
</template>

<style scoped>


   
    .mobile-bottom-nav {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      will-change: transform;
      transform: translateZ(0);
      display: flex;
      height: 50px;
      box-shadow: 0 -2px 5px -2px #333;
      background-color: #fff;
    }
    .mobile-bottom-nav__item {
      flex-grow: 1;
      text-align: center;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .mobile-bottom-nav__item-content {
      box-shadow: none;
      display: flex;
      flex-direction: column;
    }

    a {
      color: #0a0a0a;
      text-decoration:none
    }
</style>