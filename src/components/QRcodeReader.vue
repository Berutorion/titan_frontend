
  <script setup>
  import { QrcodeStream } from 'vue-qrcode-reader'
  import {onMounted, ref ,inject,toRef} from "vue"
  import  UserApi from "../apis/UserApi"
  import dateTime from "../helper/dateTime"
  import Toast from '../helper/toast'
  import Swal from 'sweetalert2' 

  const error = ref("")
  const mapStore = inject("mapStore")
  const currentUser = toRef(mapStore.state,"currentUser")
  const camera = ref("auto")
  const showScanConfirmation = ref(false)
     
      async function onDecode (result) {
       result = JSON.parse(result)
       const checkData = {
        ...result,
        jobId:currentUser.value.userData.id,
        time:dateTime.timeFormat()
       }
       try{
        //關閉相機
        pause()
        const res = await UserApi.qrcodeCheck(checkData)
        if(res.status === 200){
          Toast.fire({
            title:res.data.message,
            icon:"success"
          })
          //更新使用者資料
          mapStore.setcurrentUser()
        }else{
          Toast.fire({
            title:res.data.message,
            icon:"error"
          })
        }
        //開啟相機，才能重複掃描
        await timeout (500)
        unpause () 
       }catch(error){
        Toast.fire({
            title:error,
            icon:"error"
          })
         unpause () 
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
          Swal.fire({
          title: error.value,
          icon:"error",
          allowOutsideClick: false,
        });
        } finally {
       showScanConfirmation.value = camera.value === "off"
      }
      }

      function paintBoundingBox (detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const { boundingBox: { x, y, width, height } } = detectedCode

        ctx.lineWidth = 2
        ctx.strokeStyle = '#007bff'
        ctx.strokeRect(x, y, width, height)
      }
    }

    function unpause () {
      camera.value = 'auto'
    }

    function pause () {
      camera.value = 'off'
    }

    function timeout (ms) {
      return new Promise(resolve => {
        window.setTimeout(resolve, ms)
      })}
  </script>

<template>
  <div>
   <div class="result-container">
     <qrcode-stream :camera="camera" :track="paintBoundingBox" @decode="onDecode" @init="onInit">
      <div v-show="showScanConfirmation" class="container" style="weight:200px">
        <div class="title">相機重置...
          <svg viewBox="25 25 50 50">
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
        </div>     
      </div>
    </qrcode-stream>
   </div>  
 </div>
 </template>
 
  

  <style scoped>
.result-container {
  width: 90%;
}

svg {
 width: 3.25em;
 transform-origin: center;
 animation: rotate4 2s linear infinite;
}

circle {
 fill: none;
 stroke: hsl(214, 97%, 59%);
 stroke-width: 2;
 stroke-dasharray: 1, 200;
 stroke-dashoffset: 0;
 stroke-linecap: round;
 animation: dash4 1.5s ease-in-out infinite;
}

@keyframes rotate4 {
 100% {
  transform: rotate(360deg);
 }
}

@keyframes dash4 {
 0% {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
 }

 50% {
  stroke-dasharray: 90, 200;
  stroke-dashoffset: -35px;
 }

 100% {
  stroke-dashoffset: -125px;
 }
}

</style>