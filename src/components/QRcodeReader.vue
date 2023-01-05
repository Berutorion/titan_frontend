<template>
   <div>
    <p class="error">{{ error }}</p>
    <div class="result-container">
      <!-- <p class="decode-result">最近的掃碼結果：{{ result }}</p> -->
      <qrcode-stream @decode="onDecode" @init="onInit" />
    </div>  
  </div>
  </template>
  
  <script setup>
  import { QrcodeStream } from 'vue-qrcode-reader'
  import {onMounted, ref} from "vue"
  import  UserApi from "../apis/UserApi"
  import dateTime from "../helper/dateTime"
  const error = ref("")
  const user = ref({})


      onMounted(async() =>{
        user.value = await UserApi.getUser()
      })

      async function onDecode (result) {
        console.log(result)
        result = JSON.parse(result)
       const checkData = {
        ...result,
        jobId:user.value.data.user.id,
        time:dateTime.timeFormat()
       }
       console.log("user",user.value)
       console.log("checkData",checkData)
       try{
        const res = await UserApi.qrcodeCheck(checkData)
        console.log("res" , res)
        if(res.data.status == "success"){
          alert("打卡成功")
        }
       }catch(error){
        console.log(error)
       }
     
      }
  
      async function  onInit (promise) {
        try {
          await promise
        } catch (err) {
          if (err.name === 'NotAllowedError') {
            error.value = "ERROR: you need to grant camera access permission"
          } else if (err.name === 'NotFoundError') {
            error.value = "ERROR: no camera on this device"
          } else if (err.name === 'NotSupportedError') {
            error.value = "ERROR: secure context required (HTTPS, localhost)"
          } else if (err.name === 'NotReadableError') {
            error.value = "ERROR: is the camera already in use?"
          } else if (err.name === 'OverconstrainedError') {
            error.value = "ERROR: installed cameras are not suitable"
          } else if (err.name === 'StreamApiNotSupportedError') {
            error.value = "ERROR: Stream API is not supported in this browser"
          } else if (err.name === 'InsecureContextError') {
            error.value = 'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.';
          } else {
            error.value = `ERROR: Camera error (${err.name})`;
          }
        }
      }

     
    

  </script>
  

  <style scoped>
.error {
  font-weight: bold;
  color: red;
}
.result-container {
  width: 90%;
}
.decode-result {
  word-wrap: break-word;
}
</style>