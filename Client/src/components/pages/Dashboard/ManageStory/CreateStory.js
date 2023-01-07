import clsx from 'clsx'
import styles from "../dashboard.module.scss"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { storySlice } from '../../../../redux/reducers/storySlice'
import { tellerSlice } from '../../../../redux/reducers/tellerSlice'
import { categorySlice } from '../../../../redux/reducers/categorySlice'
import { TextField, Box } from '@mui/material'

import Autocomplete from '@mui/material/Autocomplete';
import { authorSlice } from '../../../../redux/reducers/authorSlice'
import { authorsState, categoriesState, storiesSuccessState, tellersState } from '../../../../redux/selectors'
import useInputObject from '../../../../hooks/useInputObject'
import { useNavigate } from 'react-router-dom'
import { AUTHOR, CATEGORY, COMMENT_CONTENT, CREATE_BTN, MAX_LENGTH_STORY_NAME, MIN_LENGTH_STORY_DESC, MIN_LENGTH_STORY_NAME, STORY, TELLER } from '../../../../constants'


export default function CreateStory(){
    const [data, setData, setDataObj] = useInputObject({
        name:"",
        authorId: "",
        tellerId: "",
        description: "",
        categoryId: ""
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [image, setImage] = useState({name:"Chọn Ảnh Bìa"})
    const [chapter, setChapter] = useState({name:"Chọn danh sách truyện"})


    const authors = useSelector(authorsState)
    const tellers = useSelector(tellersState)
    const categories = useSelector(categoriesState)
    const isSuccess = useSelector(storiesSuccessState)
    const [error,SetError] = useState("")

    useEffect(()=>{
        dispatch(authorSlice.actions.getAuthorsRequest({all:true}))
        dispatch(tellerSlice.actions.getTellersRequest({all:true}))
        dispatch(categorySlice.actions.getCategoriesRequest({all:true}))

    },[dispatch])

    useEffect(()=>{
        if(isSuccess.createStory===1){
            dispatch(storySlice.actions.resetIsSuccess())
            navigate("/dashboard");
        }
    },[dispatch, navigate, isSuccess.createStory])

    const handleSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData();
        if(image)
            formData.append("img", image)

        for(let file of chapter)
            formData.append("chapter", file)

        for (var key of Object.keys(data)) {
            formData.append(key,data[key])
        }
        dispatch(storySlice.actions.createStoryRequest(formData))
    }

    useEffect(()=>{
        if(data.description.length>=MIN_LENGTH_STORY_DESC)
          SetError("")
      },[data.description])

    return(
        <form className={clsx(styles.wrapper)} onSubmit={handleSubmit}>
            {`${CREATE_BTN} ${STORY}`}
            <div className="d-flex j-center f-column">
                <div>
                    <TextField sx={{ width: 300 }} label={"Tên truyện"} margin="normal" value={data.name} onChange={setData("name")} inputProps={{minLength: MIN_LENGTH_STORY_NAME, maxLength: MAX_LENGTH_STORY_NAME }} required/>
                </div>
                <div>
                    <TextField sx={{ width: 300 }} minRows={5} maxRows={10} label={COMMENT_CONTENT} onInvalid={()=>SetError("Tối thiểu " + MIN_LENGTH_STORY_DESC + " ký tự")} FormHelperTextProps={{className: clsx(styles.helperText)}} helperText={error}  onChange={setData("description")} value={data.description} inputProps={{ minLength: MIN_LENGTH_STORY_DESC}} multiline required/>
                </div>
                <div>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={authors}
                        getOptionLabel={(option)=>option.name}
                        sx={{ width: 300 }}
                        className={"m-auto"}
                        renderInput={(params) =><TextField {...params} label={AUTHOR} margin="normal" required/>}   
                        renderOption={(props, option) => (
                            <Box component="li" {...props} key={option._id}>
                              {option.name}
                            </Box>
                        )}
                        onChange={(event, value) => setDataObj({...data, authorId: value!==null ? value._id:""})}      
                        isOptionEqualToValue={(option, value) => option.value === value.value} 
                        
                    />
                </div>
                <div>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={tellers}
                        getOptionLabel={(option)=>option.name}
                        sx={{ width: 300 }}
                        className={"m-auto"}
                        renderInput={(params) =><TextField {...params} label={TELLER} margin="normal" required/>}   
                        renderOption={(props, option) => (
                            <Box component="li" {...props} key={option._id}>
                              {option.name}
                            </Box>
                        )}
                        onChange={(event, value) => setDataObj({...data, tellerId: value!==null ? value._id:""})}        
                        isOptionEqualToValue={(option, value) => option.value === value.value} 
                    />
                </div>
                
                <div>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={categories}
                        getOptionLabel={(option)=>option.name}
                        sx={{ width: 300 }}
                        className={"m-auto"}
                        renderInput={(params) =><TextField {...params} label={CATEGORY} margin="normal" required/>}   
                        renderOption={(props, option) => (
                            <Box component="li" {...props} key={option._id}>
                              {option.name}
                            </Box>
                        )}
                        onChange={(event, value) => setDataObj({...data, categoryId: value!==null ? value._id:""})}      
                        isOptionEqualToValue={(option, value) => option.value === value.value} 
                    />
                </div>
                <div>
                    <input type="file" id="image" onChange={e=>setImage(e.target.files[0]||{name:"Chọn Ảnh Bìa"})} hidden accept='image/*'/>
                    <label htmlFor="image">{image.name}</label>
                </div>
                <div>
                    <input type="file" id="chapters" onChange={e=>setChapter(e.target.files)} multiple hidden accept='audio/*'/>
                    <label htmlFor="chapters">{chapter.length > 0 ? chapter.length + " File" : chapter.name}</label>
                </div>
                <div>
                <button>{CREATE_BTN}</button>
                </div>
                
            </div>
            

        </form>
    )
}