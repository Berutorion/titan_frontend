<script setup>
import { inject,toRef,ref } from 'vue';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
const mapStore = inject("mapStore")
const testData = toRef(mapStore,"testData")
const Day = ref("")
const companyLocation = ref(1)

const option = {
  1:{latitude : 25.057459343450386 , longitude : 121.61232863636423},
  2:{latitude : 25.068173602724524 , longitude : 121.58583175315873},
  3:{latitude : 25.069425046641317 , longitude : 121.58910962617485}
}

function updateTestData(){
    testData.value.companyLocation = option[companyLocation.value]
    testData.value.day = Day.value === ""?dayjs().format():Day.value

    Swal.fire({
      title:"修改成功",
      icon:"success"
    })
}
</script>

<template>
    <div class="container-fluid mt-4 mb-4  p-3 d-flex align-items-center  justify-content-center vstack" style="min-height:500px">
        <div class="card">     
            <div class="card-body" style="width: 400px;">
                <h2 class="card-title  mb-3">更改測試資料</h2>
                <div>
              <select class="form-select form-select-lg mb-3" v-model="companyLocation">
                <option selected>Open this select menu</option>
                <option value='1'>泰坦</option>
                <option value='2'>住家</option>
                <option value='3'>圖書館</option>
            </select>
              <div class="form-floating mb-3">
                <input type="text" class="form-control"  placeholder="check Password" v-model.trim="Day">
                <label for="floatingPassword">日期</label>
              </div>
              <button class="btn btn-lg btn-primary text-uppercase fw-bold mb-2" @click="updateTestData">送出</button>
            </div>
        </div>
    </div>
</div>
   
</template>