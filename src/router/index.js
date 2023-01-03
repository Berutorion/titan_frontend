import {createRouter , createWebHistory} from 'vue-router'
import Userpage from "../views/UserPage.vue"
import LogInPage from "../views/LogInPage.vue"
import UseApi from '../apis/UserApi'
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
        }
    ]
})

router.beforeEach(async(to) =>{
    const user = await UseApi.getUser()
    if(to.name !== 'login' && !user){
        return {name:"login"}
    }
})

export default router