
import clsx from "clsx"
import { useEffect, useState } from "react"
import Input from "../Input"
import {useDispatch} from "react-redux"
import { tellerSlice } from "../../../redux/reducers/tellerSlice"
import { TextField } from "@mui/material"
import useInputObject from "../../../hooks/useInputObject"

export default function EditTellerForm({isEdit=false, _data = null , onSubmit}){
    const [data, setData, setDataObj] = useInputObject(_data||{
        name: "",
        username: "",
        birthDay: ""
    })

    const [img, setImg] = useState({name:"Select Avatar"})

    const dispatch = useDispatch()
    
    const handleCreate = ()=>{
        let formData = new FormData()

        for(let key of Object.keys(data)){
            formData.append(key,data[key])
            // console.log(key)
        }

        if(img instanceof File){
            formData.append("img",img)
        }

        dispatch(tellerSlice.actions.createTellerRequest(formData))
        onSubmit()
    }

    const handleUpdate = ()=>{
        let formData = new FormData()

        for(let key of Object.keys(data)){
            formData.append(key,data[key])
            // console.log(key)
        }

        if(img instanceof File){
            formData.delete("img")
            formData.append("img",img)
        }

        dispatch(tellerSlice.actions.updateTellerRequest(formData))
        console.log("GOI ONSUBMIT");
        onSubmit()
    }

    return(
        <div className="d-flex j-center f-column">
            <TextField sx={{ width: 300 }} label={"Tên người đọc"} margin="normal" value={data.name} onChange={setData("name")}/>
            <TextField sx={{ width: 300 }} label={"Biệt danh (username)"} margin="normal" value={data.username} onChange={setData("username")}/>
            <TextField sx={{ width: 300 }} label={"Ngày sinh"} margin="normal" value={data.birthDay} onChange={setData("birthDay")}/>
            <input type="file" placeholder="Ảnh đại diện"  id="files" onChange={e=>setImg(e.target.files[0]||{name:"Select Avatar"})} hidden/>
            <label htmlFor="files">{img.name}</label>
            {isEdit?
            <button className="m-10" onClick={handleUpdate}>Sửa</button>
            :
            <button className="m-10" onClick={handleCreate}>Tạo</button>
            }
            
        </div>
    )
}
