
<script setup>
import {onMounted, reactive, ref} from 'vue'
import axios from 'axios'
import dayjs from "dayjs"
import router  from '../router'
import UserApi from "../apis/UserApi"
import getDistance from 'geolib/es/getDistance';

const userData = ref({})
const AtWork = ref(false)
const button = ref(false)

onMounted( async() =>{
  userData.value = await UserApi.getUser()
  AtWork.value = userData.value.data.AtWork
})

function data(){
  axios.get("https://cdn.jsdelivr.net/gh/ruyut/TaiwanCalendar/data/2023.json")
  .then((res) =>{
    console.log(res)
  })
  .catch((err) =>{
    console.log(err)
  })
}

function test(){
  console.log("userData" , userData.value)
  console.log(userData.value.data.AtWork)
  // axios.get("http://localhost:8080/test",
  // {headers: { Authorization: `Bearer ${token.value}` },
  //   })
  // .then((res) =>{
  //   console.log(res.data)
  // })
  // .catch((err) =>{
  //   console.log(err.response.data)
  // })
}

 async function check(){
  const distance = await GPSAuthenticate()
  console.log('dis' , distance)
  if(distance < 400){
    AtWork.value = UserApi.check(dayjs().format("YYYY/MM/DD HH:mm"),userData.value.data.user,AtWork)
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

function logout(){
  localStorage.removeItem('token')
  router.push("/login")
}
</script>

<template>
    <div>
      <p>User data</p>
  <button @click='test'>Test</button>
  <button v-if="AtWork" @click="check" v-bind:disabled="button">下班</button>
  <button v-else @click="check" v-bind:disabled="button">上班</button>
  <button @click="GPSAuthenticate">取得現在位置</button>
  <button @click="logout">登出</button>
    </div>  
</template>


<style>

</style>