
<script setup>
import {onMounted, ref,inject,toRef} from 'vue'
import dayjs from "dayjs"
import router  from '../router'
import UserApi from "../apis/UserApi"
import getDistance from 'geolib/es/getDistance';
import qrReader from '../components/QRcodeReader.vue'
import Clock from "../components/Clock.vue"
import CardPageVue from '../components/CardPage.vue'
import isHolidayfunc from "../helper/isHoliday"

const mapStore = inject("mapStore")
const currentUser = toRef(mapStore.state,"currentUser")
const AtWork = ref(false)
const checkButton = ref("上班")
const isHoliday = ref(false)
const gpspage = ref(true)


onMounted( async() =>{
  AtWork.value = currentUser.value.userData.AtWork
  if(isHolidayfunc()){
    isHoliday.value = true
    checkButton.value = "今日休假"
  }else{
    if(AtWork.value){
      checkButton.value = "下班"
    }else{
      checkButton.value = "上班"
    }
  }
})


 async function check(){
  const distance = await GPSAuthenticate()
  if(distance < 400){
    AtWork.value = UserApi.check(dayjs().format("YYYY/MM/DD HH:mm"),currentUser.value.userData.id,AtWork)
    alert('打卡成功')
  }else{
    alert(`不再公司打卡範圍內，目前距離公司${distance}`)
  }  
}

 async function GPSAuthenticate(){
  button.value = true
 //const company = {latitude : 25.057459343450386 , longitude : 121.61232863636423} //泰坦
  const company = {latitude : 25.0693807 , longitude : 121.5889087} //圖書館
  const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
 const current = {latitude : position.coords.latitude , longitude : position.coords.longitude}
 button.value = false
 return getDistance(company,current) //單位公尺
}

function switchPage(event) {
  const parent = event.target.parentElement.parentElement.children
  parent.forEach((item) =>{
    item.firstChild.classList.remove("active")
  })
  event.target.classList.add("active")
  gpspage.value = event.target.textContent === "GPS"?true:false

}

</script>

<template>
<div class="container-fluid mt-4 mb-4 p-3 d-flex align-items-center vstack">
  <div class="raw">
    <Clock></Clock>
  </div>
  <div class="raw">
    <ul class="nav nav-tabs">
  <li class="nav-item">
    <button  class="nav-link active" @click="switchPage" >GPS</button>
  </li>
  <li class="nav-item">
    <button class="nav-link" @click="switchPage">QRcode</button>
  </li>
</ul>
 <CardPageVue v-if="gpspage" >
  <template #header>
    <h1>Hello</h1>
  </template>
  <template #body>
    <div>
      <span>上班時間:12:00</span>
      <span>下班時間:12:00</span>
    </div>
  </template>
  <template #footer>
      <button class=" btn-secondary btncard" v-bind:disabled="isHoliday" @click="check">{{checkButton}}</button>
  </template>
 </CardPageVue>

 <CardPageVue v-else>
  <template #header>
    <span>QRcode打卡</span>
  </template>
  <template #body>
    <qrReader></qrReader>
  </template>
 </CardPageVue>
</div>
  </div>
 
  

    <!-- <div>
      <p>User data</p>
  <button @click='test'>Test</button>
  <button v-if="AtWork" @click="check" v-bind:disabled="button">下班</button>
  <button v-else @click="check" v-bind:disabled="button">上班</button>
  <button @click="GPSAuthenticate">取得現在位置</button>
  <button class="btn btn-primary" @click="logout">登出</button>
    </div>   -->

<!-- <button id="show-modal" @click="showModal = true">Show Modal</button> -->


</template>


<style>

.btncard {
    height: 140px;
    width: 140px;
    border-radius: 50%
}

</style>