import clsx from "clsx"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ImSearch } from "react-icons/im";
export default function SearchForm(){
    const [name, setName] = useState("")
    const navigate = useNavigate()
    const handleSearch = ()=>{
        navigate("/search"+(name===""?"":"?name="+name))
    }
    
    return(
        <div className="d-flex a-center">
            <input value={name} onChange={e=>setName(e.target.value)} style={{width:"100px",borderRadius:"10px 0 0 10px"}}/>
            <button onClick={handleSearch}  style={{height:'21px'}}><ImSearch/></button>
        </div>
    )
}