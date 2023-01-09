
import { reactive , readonly} from "vue";
import UserApi from "../apis/UserApi"
const state = reactive({
    currentUser:{},
    token:"",
    isLogin:false 
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
    setcurrentUser,
    setToken,
    setIsLogin
}