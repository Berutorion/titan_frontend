import {createRouter , createWebHistory} from 'vue-router'
import Userpage from "../views/UserPage.vue"
import LogInPage from "../views/LogInPage.vue"
import QRcodePage from "../views/QRcodePage.vue"
import UserApi from '../apis/UserApi'
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
            path:"/qrcode",
            name:'qrcode',
            component: QRcodePage
        },
    ]
})

router.beforeEach(async(to) =>{
    const user = await UserApi.getUser()
    if(to.name !== 'login' && !user){
        console.log('驗證失敗' ,user )
        return {name:"login"}
    }
})

export default router