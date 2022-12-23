<script setup>
import {reactive, ref} from 'vue'
import axios from 'axios'
import dayjs from "dayjs"
const name =ref("")
const password = ref("")
const token = ref("")
const user = ref({})
const isLogin = ref(false)

const url = 'http://localhost:8080/api'

const AtWork = ref(false)
// const userData = reactive({})

function login(){
  axios.post("http://localhost:8080/api/login",{
    name : name.value,
    password : password.value
  }).then((res) =>{
    user.value = res.data.user
    token.value = res.data.token
    AtWork.value = res.data.AtWork
    isLogin.value = true
  }).catch((error) =>{
    console.log(error)
  })
}

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
  console.log("user" , user.value.jobId)
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
  try {
    if(AtWork.value){
    //下班
     const res = await axios.post(`${url}/user/check`,{
      jobId:user.value.id,
      time:dayjs().format("YYYY/MM/DD HH:mm")
    })
    console.log(res.data)
    //AtWork.value = false
  }else{
    //上班
    const res = await axios.post(`${url}/user/check`,{
      jobId:user.value.id,
      time:dayjs().format("YYYY/MM/DD HH:mm")
    })
    console.log(res.data)
    AtWork.value = true
  }
  } catch (error) {
    console.log(error)
  }
  
}
</script>

<template>
<div v-if="isLogin">
  <p>User data</p>
  <button @click='test'>Test</button>
  <button v-if="AtWork" @click="check">下班</button>
  <button v-else @click="check">上班</button>
</div>
  <div v-else>
    <label for="name">使用者</label>
    <input type="text" name="name" v-model="name">
    <label for="password">密碼</label>
    <input type="text" name="password" v-model="password">
    <button @click="login">登入</button>

  </div>

</template>


