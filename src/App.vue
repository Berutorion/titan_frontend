<script setup>
import {reactive, ref} from 'vue'
import axios from 'axios'
const name =ref("")
const password = ref("")
const token = ref("")
const isLogin = ref(false)
// const userData = reactive({})

function login(){
  axios.post("http://localhost:8080/login",{
    name : name.value,
    password : password.value
  }).then((res) =>{
    token.value = res.data.data
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
  console.log("token" , token.value)
  axios.get("http://localhost:8080/test",
  {headers: { Authorization: `Bearer ${token.value}` },
    })
  .then((res) =>{
    console.log(res.data)
  })
  .catch((err) =>{
    console.log(err.response.data)
  })
}
</script>

<template>
<div v-if="isLogin">
  <p>User data</p>
  <button @click='data'>Test</button>
</div>
  <div v-else>
    <label for="name">使用者</label>
    <input type="text" name="name" v-model="name">
    <label for="password">密碼</label>
    <input type="text" name="password" v-model="password">
    <button @click="login">登入</button>

  </div>

</template>


