
import clsx from "clsx"
import { useState } from "react"
import {useDispatch} from "react-redux"
import useInputObject from "../../../hooks/useInputObject"
import { storySlice } from "../../../redux/reducers/storySlice"



export default function EditChapterForm({isEdit=false, _data=null, _chapterIndex=-1}){
    const [data, setData, setDataObj] = useInputObject({_id : _data._id})

    const [chapters, setChapters] = useState({name:"Chọn danh sách truyện"})
    const dispatch = useDispatch()
    
    const handleCreate = ()=>{
        // console.log("DATA:",_data)
        // console.log()
        let formData = new FormData()

        for(let key of Object.keys(data)){
            formData.append(key,data[key])
            // console.log(key)
        }

        // console.log(chapter);
        for(let file of chapters)
            formData.append("chapter", file)


        dispatch(storySlice.actions.addChapterRequest(formData))
    }

    const handleUpdate = ()=>{
        let formData = new FormData()

        for(let key of Object.keys(data)){
            formData.append(key,data[key])
            // console.log(key)
        }

        formData.append("chapterIndex", _chapterIndex)
        
        for(let file of chapters)
            formData.append("chapter", file)


        dispatch(storySlice.actions.editChapterRequest(formData))
    }

    return(
        <div className="d-flex j-center f-column">
            
            <input type="file" id="files" onChange={e=>setChapters(e.target.files)} multiple hidden required  accept="audio/*"/>
            <label htmlFor="files">{chapters.length>0?chapters.length+" File":chapters.name}</label>

            {
            isEdit?
            <button className="m-10" onClick={handleUpdate}>Sửa</button>
            :
            <button className="m-10" onClick={handleCreate}>Tạo</button>
            }
            
        </div>
    )
}
