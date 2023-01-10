
## Titan_Attendance_System

**後端Github Repository網址：** [titan_backend](https://github.com/Berutorion/titan_backend)


---
## 🔎目錄

- [ Titan Attendance System](#Titan_Attendance_System)
  - [目錄](#目錄)
  - [專案功能介紹](#專案功能介紹)
  - [專案畫面預覽](#專案畫面預覽)
  - [專案使用說明](#專案使用說明)
  - [專案採用技術](#專案採用技術)
---


## ✅專案功能介紹

**前台登入 :**
- 登入/登出功能
- 打卡功能功能
    - GPS驗證打卡
    - QRcode打卡
- 用戶功能
    - 密碼修改
    
**後台登入 :**
- QRcode 生成
    
### 提供測試帳號

* 一般使用者
    * account: `user1` / password: `titaner`
    * account: `user2` / password: `titaner`
    
* 後臺管理員
    * account: `admin ` / password: `tiadmin`

👉 專案由此進入[線上入口](https://berutorion.github.io/titan_frontend/)    

---

## 💻專案畫面預覽



**使用者登入頁**
![使用者登入頁]()

**使用者打卡頁面**
![使用者註冊頁]()

**個人資料設定頁**
![個人資料設定頁]()

**管理者頁面**
![後台登入頁]()


---

## 💡專案使用說明

1. 使用git複製本專案
```
git clone https://github.com/Berutorion/titan_frontend.git
```

2. 下載完畢後，進到專案資料夾
```
cd titan_frontend
```

3. 操作以下指令安裝所需的套件
```
npm install
```

4. 在專案根目錄執行以下指令，在本地啟動專案
```
npm run dev
```
5. 網頁成功連接後可使用`Local`或者`Network`的網址資訊在瀏覽器中開啟


6. 開發完成後，於專案根目錄下使用此指令打包專案用於佈署
```
./deploy.sh
```

---


## 🛠專案採用技術

- [Vue.js](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [npm](https://www.npmjs.com/)
- [axios](https://github.com/axios/axios)




---
