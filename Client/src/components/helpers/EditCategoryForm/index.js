
import clsx from "clsx"
import { useState } from "react"
import Input from "../Input"
import {useDispatch} from "react-redux"
import { categorySlice } from "../../../redux/reducers/categorySlice"
import { TextField } from "@mui/material"
import useInputObject from "../../../hooks/useInputObject"


export default function EditCategoryForm({isEdit=false, _data=null, onSubmit}){
    const [data, setData, setDataObj] = useInputObject(_data||{
        name: ""
    })

    const [img, setImg] = useState({name:"Select Image"})

    const dispatch = useDispatch()
    
    const handleCreate = ()=>{
        let formData = new FormData()
        if(img instanceof File)
            formData.append("img",img)

        for(let key of Object.keys(data)){
            formData.append(key,data[key])
            // console.log(key)
        }
        dispatch(categorySlice.actions.createCategoryRequest(formData))
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
        dispatch(categorySlice.actions.updateCategoryRequest(formData))
        onSubmit()
    }

    return(
        <div className="d-flex j-center f-column">
            <TextField sx={{ width: 300 }} label={"Tên thể loại"} margin="normal" value={data.name} onChange={setData("name")}/>
            <input type="file"  id="files" onChange={e=>setImg(e.target.files[0]||{name:"Select Image"})} hidden/>
            <label htmlFor="files">{img.name}</label>
            {isEdit?
            <button className="m-10" onClick={handleUpdate}>Sửa</button>
            :
            <button className="m-10" onClick={handleCreate}>Tạo</button>
            }
        </div>
    )
}
