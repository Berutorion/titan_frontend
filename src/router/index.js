import {createRouter , createWebHistory} from 'vue-router'
import Userpage from "../views/UserPage.vue"
import LogInPage from "../views/LogInPage.vue"
import UserSettingPage from "../views/UserSettingPage.vue"
import QRcodePage from "../views/QRcodePage.vue"
import AdminPage from "../views/AdminPage.vue"
import mapStore from "../store/index"

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path:"/",
            name:'home',
            component: Userpage
        },
        {
            path:"/login",
            name:'login',
            component: LogInPage
        },
        {
            path:"/usersetting",
            name:'userSetting',
            component: UserSettingPage
        },
        {
            path:"/qrcode",
            name:'qrcode',
            component: QRcodePage
        },
        {
            path:"/admin",
            name:'admin',
            component: QRcodePage
        },
    ]
})

router.beforeEach(async(to,from) =>{
    const currentUser = mapStore.state.currentUser
    let isAuthenticated = false
    const token = mapStore.state.token
    const localToken = localStorage.getItem("token")

    console.log("to",to ,"from" , from)
    console.log(currentUser)
    
    if(localToken && localToken === token && currentUser.userData){
        isAuthenticated = true 
    }

    //  如果 token 無效則轉址到登入頁
  if (!isAuthenticated && !(to.name === 'login')) {   
    localStorage.removeItem('token')
    // Toast.fire({
    //   icon: "warning",
    //   title: "請先登入使用者身分",
    // });
    return{name:"login"}
  }
})

export default router