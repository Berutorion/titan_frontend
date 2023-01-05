
<script setup >
import { onMounted,ref ,reactive} from "vue";
import QRCodeVue3 from "qrcode-vue3";
import  UserApi from "../apis/UserApi"
import dateTime from "../helper/dateTime"

const value = ref("")
onMounted(async() =>{
  const qrcode = {
    time:dateTime.timeFormat(),
    authNum: await UserApi.gerQRauth(dateTime.timeFormat())
  }

  value.value =JSON.stringify(qrcode)
})



</script>

<template>
    <div>
        <QRCodeVue3
          v-bind:value="value"
        />
    </div>
</template>