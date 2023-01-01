import clsx from "clsx"
import { useEffect, useState } from "react"
import { login } from "../../../api"
import Input from "../Input"
import {Md5} from 'ts-md5';
import {useDispatch} from "react-redux"
import {userSlice} from "../../../redux/reducers/userSlice"
import { TextField } from "@mui/material";
import { LOGIN_BTN, MAX_LENGTH_PASSWORD, MAX_LENGTH_USERNAME, MIN_LENGTH_PASSWORD, MIN_LENGTH_USERNAME } from "../../../constants";

export default function LoginForm(){
    const [username,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const dispatch = useDispatch()

    
    const handleLogin = (e) => {
        e.preventDefault();
        login({username, password: Md5.hashStr(password)}).then(res => {
            localStorage.setItem("user",JSON.stringify(res.data))
            dispatch(userSlice.actions.loggedIn(res.data))
        }).catch(error => console.error(error))
        
    }


    return(
        <div >
            <form onSubmit={handleLogin} className="d-flex j-center f-column">
                <TextField fullWidth label={"Tên tài khoản"} margin="normal" value={username} onChange={e=>setUserName(e.target.value)} required inputProps={{ minLength: MIN_LENGTH_USERNAME, maxLength: MAX_LENGTH_USERNAME }}/>
                <TextField fullWidth label={"Mật khẩu"} type="password" margin="normal" value={password} onChange={e=>setPassword(e.target.value)} required inputProps={{ minLength: MIN_LENGTH_PASSWORD, maxLength: MAX_LENGTH_PASSWORD}}/>
                <button className="m-10" type="submit">{LOGIN_BTN}</button>
            </form>
        </div>
    )
}
