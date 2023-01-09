
<script setup >
import { onMounted,ref ,reactive} from "vue";
import QRCodeVue3 from "qrcode-vue3";
import  UserApi from "../apis/UserApi"
import dateTime from "../helper/dateTime"

const value = ref("")
onMounted(async() =>{
  const qrcode = {
    date:dateTime.timeFormat(),
    authNum: await UserApi.gerQRauth(dateTime.timeFormat())
  }

  value.value =JSON.stringify(qrcode)
})



</script>

<template>
    <div class="container-fluid image align-items-center  justify-content-center" >
        <QRCodeVue3
          :value="value"
          myclass="raw mt-4"
          imgclass=" mx-auto d-block"
        />

    </div>
</template>