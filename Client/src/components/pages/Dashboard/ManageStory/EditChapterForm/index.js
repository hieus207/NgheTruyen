import { useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import {useDispatch} from "react-redux"
import { CREATE_BTN, EDIT_BTN } from "../../../../../constants"
import useInputObject from "../../../../../hooks/useInputObject"
import { storySlice } from "../../../../../redux/reducers/storySlice"



export default function EditChapterForm({isEdit=false, _data=null, _chapterIndex=-1}){
    const [data] = useInputObject({_id : _data._id})
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState("")
    const [chapters, setChapters] = useState({name:isEdit?"Chọn truyện":"Chọn danh sách truyện"})

    const dispatch = useDispatch()
    
    const handleCreate = ()=>{
        if(chapters.length>0){
            setError("")
            setLoading(true)
            let formData = new FormData()
            for(let key of Object.keys(data)){
                formData.append(key,data[key])
            }
            for(let file of chapters)
                formData.append("chapter", file)
            dispatch(storySlice.actions.addChapterRequest(formData))
        }else{
            setError("Cần chọn tối thiểu 1 file!")
        }
    }

    const handleUpdate = ()=>{
        if(chapters.length>0){
            setError("")
            setLoading(true)
            let formData = new FormData()
            for(let key of Object.keys(data)){
                formData.append(key,data[key])
            }
            formData.append("chapterIndex", _chapterIndex)
            for(let file of chapters)
                formData.append("chapter", file)
            dispatch(storySlice.actions.editChapterRequest(formData))
        }else{
            setError("Cần chọn tối thiểu 1 file!")
        }
    }

    return(
        <div className="d-flex j-center f-column" >
            <input type="file" id="files" onChange={e=>setChapters(e.target.files)} multiple hidden required  accept="audio/*"/>
            <label htmlFor="files">{chapters.length>0?chapters.length+" File":chapters.name}</label>
            <div className="helperText m-auto">{error}</div>
            <div hidden={!loading}>
                <AiOutlineLoading3Quarters className='rotate loading-relative'/>
            </div>
            <div className="m-auto">
            <button className="m-10" onClick={isEdit?handleUpdate:handleCreate}>{isEdit?EDIT_BTN:CREATE_BTN}</button>
            </div>
        </div>
    )
}
