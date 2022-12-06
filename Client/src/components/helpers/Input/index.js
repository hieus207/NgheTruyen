import clsx from "clsx"

export default function Input({value = "", onChange = null, password = false, placeholder = ""}){
    return(
        <input className="m-10" value={value} onChange={e => onChange(e.target.value)} type={password?"password":"text"} placeholder={placeholder}/>
    )
}
