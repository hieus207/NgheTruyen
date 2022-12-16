import clsx from "clsx"
import { useEffect, useState } from "react"
import { login } from "../../../api"
import Input from "../Input"
import {Md5} from 'ts-md5';
import {useDispatch} from "react-redux"
import {userSlice} from "../../../redux/reducers/userSlice"
export default function LoginForm(){
    const [username,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const dispatch = useDispatch()

    
    const handleLogin = () => {
        login({username, password: Md5.hashStr(password)}).then(res => {
            localStorage.setItem("user",JSON.stringify(res.data))
            dispatch(userSlice.actions.loggedIn(res.data))
        }).catch(error => console.error(error))
        
    }


    return(
        <div className="d-flex j-center f-column">
            <Input value={username} onChange={setUserName} placeholder="username"/>
            <Input value={password} onChange={setPassword} placeholder="password" password/>
            <button className="m-10" onClick={handleLogin}>Login</button>
        </div>
    )
}
