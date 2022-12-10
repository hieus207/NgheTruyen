import clsx from "clsx"

export default function Input({value = "", onChange = null, onChangeObject = null, field = "", password = false, file = false, placeholder = "", required = false, multiple = false}){
    return(
        <input className="m-10" value={value} onChange={onChangeObject!=null?e=> onChangeObject(obj => {return {...obj,[field]: e.target.value}}) : e => onChange(e.target.value)} type={clsx({"password":password,"file":file})} placeholder={placeholder} required={required} multiple={multiple}/>
    )
}
