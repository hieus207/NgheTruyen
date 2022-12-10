
import clsx from "clsx"
import { useState } from "react"
import Input from "../Input"
import {useDispatch} from "react-redux"
import { categorySlice } from "../../../redux/reducers/categorySlice"


export default function CreateAuthorForm(){
    const [data, setData] = useState({
        name: ""
    })

    const [img, setImg] = useState({name:"Select Image"})

    const dispatch = useDispatch()
    
    const handleSubmit = ()=>{
        let formData = new FormData()
        if(img instanceof File)
            formData.append("img",img)

        for(let key of Object.keys(data)){
            formData.append(key,data[key])
            // console.log(key)
        }
        dispatch(categorySlice.actions.createCategoryRequest(formData))
    }

    return(
        <div className="d-flex j-center f-column">
            <Input value={data.name} onChangeObject={setData} placeholder="Tên thể loại" field="name"/>
            <input type="file"  id="files" onChange={e=>setImg(e.target.files[0]||{name:"Select Image"})} hidden/>
            <label htmlFor="files">{img.name}</label>
            <button className="m-10" onClick={handleSubmit}>Tạo</button>
        </div>
    )
}
