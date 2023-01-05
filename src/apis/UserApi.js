import axios from 'axios'

const getToken = () =>localStorage.getItem("token")
const instance = axios.create({
  baseURL:"http://localhost:8080/api",
  timeout:1000 ,
  headers: { Authorization: `Bearer ${getToken()}` }
})

const UseApi = {

    //登入
    Login : async(loginData) =>{
      try {
       const data = await instance.post(`/login`,{
          name : loginData.account,
          password : loginData.password
        })
        localStorage.setItem("token",data.data.token)
        console.log(data.data)
      } catch (error) {
        console.log(error)
      }
    },
    //打卡
    check : async(time,user,AtWork) =>{
      try {
        if(AtWork.value){
        //下班
         const res = await instance.post(`/user/check`,{
          jobId:user.id,
          time:time//dayjs().valueof()
        })
      }else{
        //上班
        const res = await instance.post(`/user/check`,{
          jobId:user.id,
          time:time
        })
        return true // AtWork.value
      }
      } catch (error) {
        throw new Error(error)
      }
    },
    //qrcode打卡
    qrcodeCheck :async(checkData) =>{
      try {
        const res = await instance.post('/user/qrcodeCheck',checkData)
        return res
      } catch (error) {
        throw new Error(error)
      }
      
    },
    gerQRauth :async(time) =>{
      try {
        const res = await instance.get(`/admin/qrcode?${time}`)
        return res.data.authNum
      } catch (error) {
        throw new Error(error)
      }
    },
    //驗證
    getUser : async() =>{
      try {
        const data  = await instance.get("/user")
        return data
      } catch (error) {
       console.log(error)
        return false
      }
  
    }
}


export default UseApi
