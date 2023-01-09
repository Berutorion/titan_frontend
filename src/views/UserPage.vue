
<script setup>
import {onMounted, ref,inject,toRef} from 'vue'
import dayjs from "dayjs"
import UserApi from "../apis/UserApi"
import getDistance from 'geolib/es/getDistance';
import isHolidayfunc from "../helper/isHoliday"
import Swal from 'sweetalert2' 
import Toast from '../helper/toast';
import dateTime from '../helper/dateTime';
import qrReader from '../components/QRcodeReader.vue'
import Clock from "../components/Clock.vue"
import CardPageVue from '../components/CardPage.vue'

const mapStore = inject("mapStore")
const currentUser = toRef(mapStore.state,"currentUser")
const companyLocation = toRef(mapStore.testData,"companyLocation")
const isHoliday = ref(false)
const gpspage = ref(true)

onMounted( async() =>{
  isHoliday.value = isHolidayfunc()
})

 async function check(){
  try {
    Swal.fire({
      icon:'info',
      title:'打卡中...',
      allowOutsideClick:false
    })
    Swal.showLoading()
    const distance = await GPSAuthenticate()
    Swal.close()
  if(distance < 400){
    const res = await UserApi.check(dateTime.timeFormat()
    ,currentUser.value.userData.id
    ,currentUser.value.userData.AtWork)

    if(res.status === 200){
      Toast.fire({
        title:res.data.message,
        icon:"success"
      })
      await mapStore.setcurrentUser()
    }else{
      Toast.fire({
        title:res.data.message,
        icon:"error"
      })
    }
  }else{
    Swal.fire({
    title: 'Gps 打卡',
    text: `不在公司打卡範圍內，目前距離公司${distance}公尺`,
    icon:"warning",
    allowOutsideClick: false,
        });
  }  
  } catch (error) {
    if(error instanceof GeolocationPositionError ){
      Toast.fire({
      title:"請開啟GPS權限，才能繼續打卡",
      icon:"error"
    })
    }else{
      Toast.fire({
      title:error,
      icon:"error"
    })
    }
    
  }

}

 async function GPSAuthenticate(){
  const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
 const current = {latitude : position.coords.latitude , longitude : position.coords.longitude}
 return getDistance(companyLocation.value,current) //單位公尺
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
    <h1>
    Hello,{{ currentUser.userData.name}}
    </h1>
  </template>
  <template #body>
    <div class="card-body">
      <div class="card-title">上班時間:{{currentUser.userData.checkIn}}</div>
      <div class="card-title">下班時間:{{currentUser.userData.checkOut}}</div>
    </div>
  </template>
  <template #footer>
      <div v-if="isHoliday">
        <button class=" btn-secondary btncard" v-bind:disabled="isHoliday" @click="check">今日休假</button>
      </div>
      <div v-else>
        <button class=" btn-secondary btncard" v-if="currentUser.userData.AtWork" v-bind:disabled="isHoliday" @click="check">下班</button>
        <button class=" btn-secondary btncard" v-else v-bind:disabled="isHoliday" @click="check">上班</button>
      </div>
      
  </template>
 </CardPageVue>

 <CardPageVue v-else>
  <template #header>
    <span>QRcode打卡</span>
  </template>
  <template #body>
    <qrReader></qrReader>
  </template>
  <template #footer>
    <div></div>
  </template>
 </CardPageVue>
</div>
  </div>
 
</template>


<style scoped>

.btncard {
    height: 140px;
    width: 140px;
    border-radius: 50%
}

</style>