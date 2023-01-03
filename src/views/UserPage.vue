
<script setup>
import {onMounted, reactive, ref} from 'vue'
import axios from 'axios'
import dayjs from "dayjs"
import router  from '../router'
import UserApi from "../apis/UserApi"

const userData = ref({})
const AtWork = ref(false)

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

async function  check(){
AtWork.value = UserApi.check(dayjs().format("YYYY/MM/DD HH:mm"),userData.value.data.user,AtWork)
  
}

function getCurrentLocation(){
  navigator.geolocation.getCurrentPosition(function(position) {
  console.log(position.coords.latitude, position.coords.longitude);
},(err) =>{
  console.log("未取得資訊",err)
});

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
  <button v-if="AtWork" @click="check">下班</button>
  <button v-else @click="check">上班</button>
  <button @click="getCurrentLocation">取得現在位置</button>
  <button @click="logout">登出</button>
    </div>  
</template>


<style>

</style>