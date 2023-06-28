import axios from 'axios'
import React, { useState  , useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

const Login = () => {
     const [username , setUsername] = useState("")
     const [password , setPassword] = useState("")
     const {setAuthState} = useContext(AuthContext)
     const navigate = useNavigate();
    
    const login = ()=>{
        const data = {username :username , password : password}
        axios.post("http://127.0.0.1:3001/auth/login" ,data ).then((response)=>{

            if(response.data.error){
                alert(response.data.error)
            }else {
                localStorage.setItem("accesstoken" ,response.data.token)
                setAuthState({username:response.data.username , id : response.data.id , status : true})
                navigate("/")
            }
            
        })
    }
    return (
        <div className="loginContainer">
            <label>Username:</label>
            <input
                type="text"
                onChange={(e)=>{
                    setUsername(e.target.value)
                }}
              
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}
            
            />

            <button onClick={login}> Login </button>
        </div>
    )
}

export default Login
