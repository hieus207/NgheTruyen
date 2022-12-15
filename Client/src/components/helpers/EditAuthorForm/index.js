
import clsx from "clsx"
import { useState } from "react"
import {useDispatch} from "react-redux"
import { authorSlice } from "../../../redux/reducers/authorSlice"
import { TextField } from "@mui/material"
import useInputObject from "../../../hooks/useInputObject"


export default function EditAuthorForm({isEdit=false, _data=null}){
    const [data, setData, setDataObj] = useInputObject(_data||{
        name: "",
        username: "",
        birthDay: ""
    })

    const [img, setImg] = useState({name:"Select Avatar"})

    const dispatch = useDispatch()
    
    const handleCreate = ()=>{
        let formData = new FormData()
        if(img instanceof File)
            formData.append("img",img)

        for(let key of Object.keys(data)){
            formData.append(key,data[key])
            // console.log(key)
        }
        dispatch(authorSlice.actions.createAuthorRequest(formData))
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
        console.log("VAO SUA AUTHOR")
        dispatch(authorSlice.actions.updateAuthorRequest(formData))
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
