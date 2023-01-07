<script setup>
import {onBeforeUnmount, onMounted, ref} from "vue"
import dayjs from "dayjs"
const date = ref("")
const time = ref("")
const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
let clock 
onMounted(async()=> {
   clock = await setInterval(() =>{
            date.value = getNow().date
            time.value = getNow().time
    },1000)
})

onBeforeUnmount(() =>{
    clearInterval(clock)
})

function getNow(){
    const now = dayjs()

    return {
        date:`${now["$M"]+1}月${now["$D"]}日${week[now["$W"]]}`,
        time:now.format("HH:mm:ss")
    }
}
</script>


<template>
    <div class="clock raw">
    <p class="date">{{ date }}</p>
    <p class="time">{{ time }}</p>
</div>
</template>


<style scoped>

p {
    margin: 0;
    padding: 0;
}
.clock {
    font-family: 'Share Tech Mono', monospace;
    color: #4e4c4c;
}

.time {
        letter-spacing: 0.05em;
        font-size: 60px;
        padding: 2.5px 0;
    }
  .date {
        letter-spacing: 0.1em;
        font-size: 18px;
    }
</style>