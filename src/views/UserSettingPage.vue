<script setup>
import CardPage from '../components/CardPage.vue';
import {reactive} from "vue"
import UseApi from '../apis/UserApi';
import Toast from '../helper/toast';

const userData = reactive({password:"",checkPassword:""})

async function updateUser(){
    if(userData.password === null || userData.checkPassword === null ){
        Toast.fire({
            title:"兩次密碼輸入不同",
            icon:"error"
        })
    }
    try {
        const res = await UseApi.updateUser(userData)
        if(res.status === 200){
            Toast.fire({
                title:res.data.message,
                icon:"success"
            })
        }else{
            Toast.fire({
                title:res.data.message,
                icon:"error"
            })
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
                <h2 class="card-title  mb-3">更改密碼</h2>
                <div>
              <div class="form-floating mb-3">
                <input type="password" class="form-control"  placeholder="new Password" v-model.trim="userData.password">
                <label for="floatingPassword">新密碼</label>
              </div>
              <div class="form-floating mb-3">
                <input type="password" class="form-control"  placeholder="check Password" v-model.trim="userData.checkPassword">
                <label for="floatingPassword">確認密碼</label>
              </div>
              <button class="btn btn-lg btn-primary text-uppercase fw-bold mb-2" @click="updateUser">送出</button>
            </div>
        </div>
    </div>
</div>
   
</template>