
import clsx from "clsx"
import { useState } from "react"
import Input from "../Input"
import {useDispatch} from "react-redux"
import { authorSlice } from "../../../redux/reducers/authorSlice"


export default function CreateAuthorForm(){
    const [data, setData] = useState({
        name: "",
        username: "",
        birthDay: ""
    })

    const [img, setImg] = useState({name:"Select Avatar"})

    const dispatch = useDispatch()
    
    const handleSubmit = ()=>{
        let formData = new FormData()
        if(img instanceof File)
            formData.append("img",img)

        for(let key of Object.keys(data)){
            formData.append(key,data[key])
            // console.log(key)
        }
        dispatch(authorSlice.actions.createAuthorRequest(formData))
    }

    return(
        <div className="d-flex j-center f-column">
            <Input value={data.name} onChangeObject={setData} placeholder="Tên người đọc" field="name"/>
            <Input value={data.username} onChangeObject={setData} placeholder="username" field="username"/>
            <Input value={data.birthDay} onChangeObject={setData} placeholder="Ngày sinh" field="birthDay"/>
            <input type="file" placeholder="Ảnh đại diện"  id="files" onChange={e=>setImg(e.target.files[0]||{name:"Select Avatar"})} hidden/>
            <label htmlFor="files">{img.name}</label>
            <button className="m-10" onClick={handleSubmit}>Tạo</button>
        </div>
    )
}
