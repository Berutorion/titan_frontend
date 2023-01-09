
import { reactive , readonly} from "vue";
import UserApi from "../apis/UserApi"
import dayjs from "dayjs";
const state = reactive({
    currentUser:{},
    token:"",
    isLogin:false 
})

const testData = reactive({
    //泰坦公司位置
    companyLocation : {latitude : 25.057459343450386 , longitude : 121.61232863636423},
    day:dayjs().format("YYYY/MM/DD")
})

async function setcurrentUser() {
    try {
        state.currentUser = await UserApi.getUser()
    } catch (error) {
        
    }
}

function setToken(token){
    state.token = token
}

function setIsLogin(value){
    state.isLogin = value
}

export default {
    state:readonly(state),
    testData,
    setcurrentUser,
    setToken,
    setIsLogin
}