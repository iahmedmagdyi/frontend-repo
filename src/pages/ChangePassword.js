import React, { useState } from 'react'
import axios from "axios";

const ChangePassword = () => {
  const [oldPassword  , setOldPassword] = useState("")
  const [newPassword  , setNewPassword] = useState("")

    const changPassword=()=>{
        axios.put("http://127.0.0.1:3001/auth/changepassword" ,
         {oldPassword:oldPassword , newPassword : newPassword},
         {
          headers: { accesstoken: localStorage.getItem("accesstoken") }
         }).then((responese)=>{
          if(responese.data.error){
            alert(responese.data.error)
          }
         })
    }
  return (
    <div>
       <h1> change your password</h1>
       <input type="text" placeholder='your old password' onChange={(e)=>{setOldPassword(e.target.value)}}/>
       <input type="text" placeholder='your new password' onChange={(e)=>{setNewPassword(e.target.value)}}/>
       <button onClick={changPassword}>save changes</button>
    </div>
  )
}

export default ChangePassword
