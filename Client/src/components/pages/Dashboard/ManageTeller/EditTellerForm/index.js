import { useState } from "react"
import {useDispatch} from "react-redux"
import { TextField } from "@mui/material"
import { CREATE_BTN, EDIT_BTN, MAX_LENGTH_COMMENT_SENDER, MAX_LENGTH_USERNAME, MIN_LENGTH_COMMENT_SENDER, MIN_LENGTH_USERNAME } from "../../../../../constants"
import useInputObject from "../../../../../hooks/useInputObject"
import { tellerSlice } from "../../../../../redux/reducers/tellerSlice"

export default function EditTellerForm({isEdit=false, _data = null , onSubmit}){
    const [data, setData] = useInputObject(_data||{
        name: "",
        username: "",
        birthDay: ""
    })

    const [img, setImg] = useState({name:"Chọn Ảnh Đại Diện"})

    const dispatch = useDispatch()
    
    const handleCreate = (e)=>{
        e.preventDefault()
        let formData = new FormData()
        for(let key of Object.keys(data)){
            formData.append(key,data[key])
        }
        if(img instanceof File){
            formData.append("img",img)
        }
        dispatch(tellerSlice.actions.createTellerRequest(formData))
        onSubmit()
    }

    const handleUpdate = (e)=>{
        e.preventDefault()
        let formData = new FormData()
        for(let key of Object.keys(data)){
            formData.append(key,data[key])
        }
        if(img instanceof File){
            formData.delete("img")
            formData.append("img",img)
        }
        dispatch(tellerSlice.actions.updateTellerRequest(formData))
        onSubmit()
    }

    return(
        <form className="d-flex j-center f-column" onSubmit={isEdit?handleUpdate:handleCreate}>
            <TextField sx={{ width: 300 }} label={"Tên người đọc"} margin="normal" value={data.name} onChange={setData("name")} inputProps={{minLength: MIN_LENGTH_COMMENT_SENDER, maxLength: MAX_LENGTH_COMMENT_SENDER }} required/>
            <TextField sx={{ width: 300 }} label={"Biệt danh (username)"} margin="normal" value={data.username} onChange={setData("username")} inputProps={{minLength: MIN_LENGTH_USERNAME, maxLength: MAX_LENGTH_USERNAME }} required/>
            <TextField sx={{ width: 300 }} label={"Ngày sinh"} margin="normal" value={data.birthDay} onChange={setData("birthDay")} type="date" InputLabelProps={{shrink: true}} required/>
            <input type="file" placeholder="Ảnh đại diện"  id="files" onChange={e=>setImg(e.target.files[0]||{name:"Chọn Ảnh Đại Diện"})} hidden accept="image/*"/>
            <label htmlFor="files">{img.name}</label>
            <div className="m-auto">
            <button className="m-10" type="submit">{isEdit?EDIT_BTN:CREATE_BTN}</button>      
            </div>      
        </form>
    )
}
