import clsx from "clsx"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function SearchForm(){
    const [name, setName] = useState("")
    const navigate = useNavigate()
    const handleSearch = ()=>{
        navigate("/search"+(name==""?"":"?name="+name))
    }
    
    return(
        <>
            <input value={name} onChange={e=>setName(e.target.value)}/>
            <button onClick={handleSearch}>Search</button>
        </>
    )
}