
<script setup>
import {reactive,inject, toRef} from 'vue'
import UserApi from "../apis/UserApi"
import router  from '../router'
import Toast from "../helper/toast"
const loginData = reactive({account:"",password:"",})
const mapStore = inject("mapStore")
const currentUser = toRef(mapStore.state,"currentUser")

async function login(){
  try {
    const res = await UserApi.Login(loginData)
    if(res.status === 200){
      //更新目前使用者資料
    await mapStore.setcurrentUser()
    console.log(currentUser.value)
    mapStore.setToken(res.data.token)
    mapStore.setIsLogin(true)
    if(currentUser.value.userData.role === "user"){
      router.push('/')
      Toast.fire({
        title:res.data.message,
        icon:"success"
      })
    }else if(currentUser.value.userData.role === "admin"){
      router.push('/admin')
      Toast.fire({
        title:res.data.message,
        icon:"success"
      })
    }
    }else{
      Toast.fire({
            title:res.data.message,
            icon:"error"
          })
    }
    
  } catch (error) {
    Toast.fire({
            title:error,
            icon:"error"
          })
  }



}
</script>

<template>
  <div class="container-fluid ps-md-0">
<div class="row g-0">
  <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
  <div class="col-md-8 col-lg-6">
    <div class="login d-flex align-items-center py-5">
      <div class="container">
        <div class="row">
          <div class="col-md-9 col-lg-8 mx-auto">
            <h3 class="login-heading mb-4">Welcome back!</h3>

            <!-- Sign In Form -->
            <div>
              <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model.trim="loginData.account">
                <label for="floatingInput">Email address</label>
              </div>
              <div class="form-floating mb-3">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model.trim="loginData.password">
                <label for="floatingPassword">Password</label>
              </div>

              <!-- <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" value="" id="rememberPasswordCheck">
                <label class="form-check-label" for="rememberPasswordCheck">
                  Remember password
                </label>
              </div> -->

              <div class="d-grid">
                <button class="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" @click="login">Sign in</button>
                <div class="text-center">
                  <a class="small" href="/qrcode">Forgot password?</a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<style scoped>
.login {
min-height: 100vh;
}

.bg-image {
background-image: url('https://source.unsplash.com/WEQbe2jBg40/600x1200');
background-size: cover;
background-position: center;
}

.login-heading {
font-weight: 300;
}

.btn-login {
font-size: 0.9rem;
letter-spacing: 0.05rem;
padding: 0.75rem 1rem;
}
</style>