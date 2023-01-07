import clsx from "clsx"
import { useEffect, useState } from "react"
import { login } from "../../../api"
import {Md5} from 'ts-md5';
import {useDispatch} from "react-redux"
import { TextField } from "@mui/material";
import { LOGIN_BTN, MAX_LENGTH_PASSWORD, MAX_LENGTH_USERNAME, MIN_LENGTH_PASSWORD, MIN_LENGTH_USERNAME, PASSWORD, USERNAME } from "../../../constants";
import { userSlice } from "../../../redux/reducers/userSlice";

export default function LoginForm(){
    const [username,setUserName] = useState("admin")
    const [password,setPassword] = useState("admin")
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
                <TextField fullWidth size="small" label={USERNAME} margin="normal" value={username} onChange={e=>setUserName(e.target.value)} required inputProps={{ minLength: MIN_LENGTH_USERNAME, maxLength: MAX_LENGTH_USERNAME }}/>
                <TextField fullWidth size="small" label={PASSWORD} type="password" margin="normal" value={password} onChange={e=>setPassword(e.target.value)} required inputProps={{ minLength: MIN_LENGTH_PASSWORD, maxLength: MAX_LENGTH_PASSWORD}}/>
                <div className="m-top-20">
                    <button className="d-block m-auto" type="submit">{LOGIN_BTN}</button>
                </div>
            </form>
        </div>
    )
}
