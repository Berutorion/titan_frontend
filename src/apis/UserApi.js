import axios from 'axios'
import Toast from '../helper/toast'
const getToken = () =>localStorage.getItem("token")
const instance = axios.create({
  baseURL:"https://twitter-api.ap-northeast-1.elasticbeanstalk.com/api",
 // baseURL:"http://localhost:8080/api",
  validateStatus:(status) =>{ return status <=500},
  timeout:1000
})
const UseApi = {

    //登入
    Login : async(loginData) =>{
      try {
       const res = await instance.post(`/login`,{
          name : loginData.account,
          password : loginData.password
        })
        if(res.status === 200){
          localStorage.removeItem('token')
          localStorage.setItem("token",res.data.token)
        }
        return res
      } catch (error) {
        return error
      }
    },
    //打卡
    check : async(time,userId,atwork) =>{
      try {
          const res = await instance.post(`/user/check`,{
          jobId:userId,
          time},
          {headers: { Authorization: `Bearer ${getToken()}` }})
          return res
      } catch (error) {
        throw new Error(error)
      }
    },
    //qrcode打卡
    qrcodeCheck :async(checkData) =>{
      try {
        const res = await instance.post('/user/qrcodeCheck',checkData,{
          headers: { Authorization: `Bearer ${getToken()}` }
        })
        return res
      } catch (error) {
        throw new Error(error)
      }
      
    },
    gerQRauth :async(time) =>{
      try {
        const res = await instance.get(`/admin/qrcode?${time}`,{
          headers: { Authorization: `Bearer ${getToken()}` }
        })
        return res.data.authNum
      } catch (error) {
        throw new Error(error)
      }
    },
    //驗證
    getUser : async() =>{
      try {
        const res  = await instance.get("/user" ,{
          headers: { Authorization: `Bearer ${getToken()}` }
        })
        return res.data
      } catch (error) {
       throw new Error(error)
      }
  
    },
    updateUser : async(userData) =>{
      const res = instance.patch("/user",userData,{
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      return res
    }
}


export default UseApi
