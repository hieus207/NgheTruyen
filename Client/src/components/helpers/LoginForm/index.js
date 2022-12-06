
import clsx from "clsx"
import { useState } from "react"
import Input from "../Input"

export default function LoginForm(){
    const [username,setUserName] = useState("")
    const [password,setPassword] = useState("")
    return(
        <div className="d-flex j-center f-column">
            <Input value={username} onChange={setUserName} placeholder="username"/>
            <Input value={password} onChange={setPassword} placeholder="password" password/>
            <button className="m-10">Login</button>
        </div>
    )
}
