
<script setup>
import {reactive, ref} from 'vue'
import UserApi from "../apis/UserApi"
import router  from '../router'
const loginData = reactive({account:"",password:"",})

function login(){
  UserApi.Login(loginData)
  router.push('/')
}
</script>

<template>
<div>
    <label for="name">使用者</label>
    <input type="text" name="name" v-model="loginData.account">
    <label for="password">密碼</label>
    <input type="text" name="password" v-model="loginData.password">
    <button @click="login">登入</button>
</div>
</template>