
import clsx from "clsx"
import { useState } from "react"
import Input from "../Input"
import {useDispatch} from "react-redux"
import { categorySlice } from "../../../redux/reducers/categorySlice"
import { TextField } from "@mui/material"
import useInputObject from "../../../hooks/useInputObject"
import { MAX_LENGTH_CATEGORY_NAME, MIN_LENGTH_CATEGORY_NAME } from "../../../constants"


export default function EditCategoryForm({isEdit=false, _data=null, onSubmit}){
    const [data, setData, setDataObj] = useInputObject(_data||{
        name: ""
    })

    const [img, setImg] = useState({name:"Chọn Ảnh Bìa"})

    const dispatch = useDispatch()
    
    const handleCreate = (e)=>{
        e.preventDefault()
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

    const handleUpdate = (e)=>{
        e.preventDefault()
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
        <form className="d-flex j-center f-column" onSubmit={isEdit?handleUpdate:handleCreate}>
            <TextField sx={{ width: 300 }} label={"Tên thể loại"} margin="normal" value={data.name} onChange={setData("name")} inputProps={{minLength: MIN_LENGTH_CATEGORY_NAME, maxLength: MAX_LENGTH_CATEGORY_NAME}} required/>

            <input type="file" id="files" onChange={e=>setImg(e.target.files[0]||{name:"Chọn Ảnh Bìa"})} hidden accept="image/*"/>
            <label htmlFor="files">{img.name}</label>

            <button className="m-10" type="submit">{isEdit?"Sửa":"Tạo"}</button>
            
        </form>
    )
}
