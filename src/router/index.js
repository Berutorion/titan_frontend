import {createRouter , createWebHistory} from 'vue-router'
import Userpage from "../views/UserPage.vue"
import LogInPage from "../views/LogInPage.vue"
import UserSettingPage from "../views/UserSettingPage.vue"
import QRcodePage from "../views/QRcodePage.vue"
import AdminPage from "../views/AdminPage.vue"

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
            name:'qrcode',
            component: QRcodePage
        },
    ]
})

// router.beforeEach(async(to) =>{
//     const token = localStorage.getItem("token")
//     if(to.name !== 'login' && !token ){
//         console.log('驗證失敗')
//         return {name:"login"}
//     }else if(!to.name){
//         return {name:"login"}
//     }
// })

export default router