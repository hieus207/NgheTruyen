
import clsx from "clsx"
import { useState } from "react"
import {useDispatch} from "react-redux"
import { authorSlice } from "../../../redux/reducers/authorSlice"
import { TextField } from "@mui/material"
import useInputObject from "../../../hooks/useInputObject"
import { MAX_LENGTH_COMMENT_SENDER, MAX_LENGTH_USERNAME, MIN_LENGTH_COMMENT_SENDER, MIN_LENGTH_USERNAME } from "../../../constants"


export default function EditAuthorForm({isEdit=false, _data=null, onSubmit}){
    const [data, setData, setDataObj] = useInputObject(_data||{
        name: "",
        username: "",
        birthDay: ""
    })

    const [img, setImg] = useState({name:"Chọn Ảnh Đại Diện"})

    const dispatch = useDispatch()
    
    const handleCreate = (e)=>{
        e.preventDefault()
        let formData = new FormData()
        if(img instanceof File)
            formData.append("img",img)

        for(let key of Object.keys(data)){
            formData.append(key,data[key])
        }
        dispatch(authorSlice.actions.createAuthorRequest(formData))
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
        dispatch(authorSlice.actions.updateAuthorRequest(formData))
        onSubmit()
    }

    return(
        <form className="d-flex j-center f-column" onSubmit={isEdit?handleUpdate:handleCreate}>
            <TextField sx={{ width: 300 }} label={"Tên tác giả"} margin="normal" value={data.name} onChange={setData("name")} inputProps={{minLength: MIN_LENGTH_COMMENT_SENDER, maxLength: MAX_LENGTH_COMMENT_SENDER}} required/>
            <TextField sx={{ width: 300 }} label={"Biệt danh (username)"} margin="normal" value={data.username} onChange={setData("username")} inputProps={{minLength: MIN_LENGTH_USERNAME, maxLength: MAX_LENGTH_USERNAME }} required/>
            <TextField sx={{ width: 300 }} label={"Ngày sinh"} margin="normal" value={data.birthDay} onChange={setData("birthDay")} type="date" InputLabelProps={{shrink: true}} required/>
            <input type="file" placeholder="Ảnh đại diện"  id="files" onChange={e=>setImg(e.target.files[0]||{name:"Chọn Ảnh Đại Diện"})} hidden accept="image/*"/>
            <label htmlFor="files">{img.name}</label>
            <button className="m-10" type="submit">{isEdit?"Sửa":"Tạo"}</button>
        </form>
    )
}
