<script setup>
import CardPage from '../components/CardPage.vue';
import {reactive} from "vue"
import UseApi from '../apis/UserApi';

const userData = reactive({password:"",checkPassword:""})

async function updateUser(){
    if(userData.password === null || userData.checkPassword === null ){
        alert("兩次密碼輸入不同")
    }
    try {
        const res = await UseApi.updateUser(userData)
        if(res.data.status === "success"){
            alert(res.data.message )
        }else{
            alert(res.data.message)
        }
    } catch (error) {
        alert(error)
        throw new Error(error)
    }
}

</script>

<template>
    <div class="container-fluid mt-4 mb-4  p-3 d-flex align-items-center  justify-content-center vstack" style="min-height:500px">
        <div class="card">     
            <div class="card-body" style="width: 400px;">
                <h2 class="card-title  mb-3">Setting</h2>
                <div>
              <div class="form-floating mb-3">
                <input type="password" class="form-control"  placeholder="new Password" v-model.trim="userData.password">
                <label for="floatingPassword">Password</label>
              </div>
              <div class="form-floating mb-3">
                <input type="password" class="form-control"  placeholder="check Password" v-model.trim="userData.checkPassword">
                <label for="floatingPassword">Password</label>
              </div>
              <button class="btn btn-lg btn-primary text-uppercase fw-bold mb-2" @click="updateUser">送出</button>
            </div>
        </div>
    </div>
</div>
   
</template>