
import { reactive , readonly} from "vue";
import UserApi from "../apis/UserApi"
const state = reactive({
    currentUser:{},
    token:""
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


export default {
    state:readonly(state),
    setcurrentUser,
    setisAuthenticated,
    setToken
}