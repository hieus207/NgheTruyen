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
import { authorsState, categoriesState, storiesState, storiesSuccessState, tellersState } from '../../../../redux/selectors'
import useInputObject from '../../../../hooks/useInputObject'
import { useNavigate, useParams } from 'react-router-dom'
import { AUTHOR, CATEGORY, COMMENT_CONTENT, EDIT_BTN, MAX_LENGTH_STORY_NAME, MIN_LENGTH_STORY_DESC, MIN_LENGTH_STORY_NAME, STORY, TELLER } from '../../../../constants'


export default function UpdateStory(){
    
    const { storyId } = useParams();
  
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [image, setImage] = useState({name:"Chọn Ảnh Bìa"})
    const [error,SetError] = useState("")

    const authors = useSelector(authorsState)
    const tellers = useSelector(tellersState)
    const categories = useSelector(categoriesState)
    

    const story = useSelector(storiesState)
    const isSuccess = useSelector(storiesSuccessState)

    useEffect(()=>{
        dispatch(storySlice.actions.getStoryRequest(storyId))
        dispatch(authorSlice.actions.getAuthorsRequest({all:true}))
        dispatch(tellerSlice.actions.getTellersRequest({all:true}))
        dispatch(categorySlice.actions.getCategoriesRequest({all:true}))

    },[dispatch, storyId])


    const [data, setData, setDataObj] = useInputObject(story)

    useEffect(()=>{
        setDataObj(story)
    },[story, setDataObj])

    const handleSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData();
    
        for (var key of Object.keys(data)) {
            formData.append(key,data[key])
        }

        if(image instanceof File){
            formData.append("img", image) 
        }
              

        formData.delete("chapter")

        dispatch(storySlice.actions.updateStoryRequest(formData))
    }
  
    useEffect(()=>{
        if(isSuccess.updateStory===1){
            dispatch(storySlice.actions.resetIsSuccess())
            navigate("/dashboard");

        }
    },[isSuccess.updateStory, dispatch, navigate])

    useEffect(()=>{
        if(data.description&&data.description.length>=MIN_LENGTH_STORY_DESC)
          SetError("")

      },[data.description])
      
    return(
        <form className={clsx("",styles.wrapper)} onSubmit={handleSubmit}>
            {`${EDIT_BTN} ${STORY}`}
            <div className="d-flex j-center f-column">
                <div>
                    <TextField sx={{ width: 300 }} label={"Tên truyện"} margin="normal" value={data.name||""} onChange={setData("name")} inputProps={{minLength: MIN_LENGTH_STORY_NAME, maxLength: MAX_LENGTH_STORY_NAME }} required/>
                </div>
                <div>
                    <TextField sx={{ width: 300 }} minRows={5} maxRows={10} label={COMMENT_CONTENT} onInvalid={()=>SetError("Tối thiểu " + MIN_LENGTH_STORY_DESC + " ký tự")} FormHelperTextProps={{className: clsx(styles.helperText)}} helperText={error}  onChange={setData("description")} value={data.description||""} inputProps={{ minLength: MIN_LENGTH_STORY_DESC}} multiline required/>
                </div>
                <div>
                    {authors.length>0&&story.authorId&&
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={authors}
                        defaultValue={authors.find(author=>author._id===story.authorId)}
                        getOptionLabel={(option)=>option.name}
                        sx={{ width: 300 }}
                        className={"m-auto"}
                        renderInput={(params) =><TextField {...params} label={AUTHOR} value={authors.find(author=>author._id===story.authorId).name} margin="normal" required/>}   
                        renderOption={(props, option) => (
                            <Box component="li" {...props} key={option._id}>
                              {option.name}
                            </Box>
                        )}
                        
                        onChange={(event, value) => setDataObj({...data, authorId: value!==null ? value._id:""})}      
                        isOptionEqualToValue={(option, value) => option.value === value.value} 
                    />
                    }
                </div>
                <div>
                {tellers.length>0&&story.tellerId&&
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={tellers}
                        defaultValue={tellers.find(teller=>teller._id===story.tellerId)}
                        getOptionLabel={(option)=>option.name}
                        sx={{ width: 300 }}
                        className={"m-auto"}
                        renderInput={(params) =><TextField {...params} label={TELLER} value={tellers.find(teller=>teller._id===story.tellerId).name} margin="normal" required/>}   
                        renderOption={(props, option) => (
                            <Box component="li" {...props} key={option._id}>
                              {option.name}
                            </Box>
                        )}
                        onChange={(event, value) => setDataObj({...data, tellerId: value!==null ? value._id:""})}        
                        isOptionEqualToValue={(option, value) => option.value === value.value} 
                    />
                }
                </div>
                
                <div>
                {categories.length>0&&story.categoryId&&
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={categories}
                        getOptionLabel={(option)=>option.name}
                        defaultValue={categories.find(category=>category._id===story.categoryId)}
                        sx={{ width: 300 }}
                        className={"m-auto"}
                        renderInput={(params) =><TextField {...params} value={categories.find(category=>category._id===story.categoryId).name} label={CATEGORY} margin="normal" required/>}   
                        renderOption={(props, option) => (
                            <Box component="li" {...props} key={option._id}>
                              {option.name}
                            </Box>
                        )}
                        onChange={(event, value) => setDataObj({...data, categoryId: value!==null ? value._id:""})}      
                        isOptionEqualToValue={(option, value) => option.value === value.value} 
                    />
                }
                </div>
                <div>
                    <input type="file" id="image" onChange={e=>setImage(e.target.files[0]||{name:"Chọn Ảnh Bìa"})} hidden accept='image/*'/>
                    <label htmlFor="image">{image.name}</label>
                </div>
                <div>
                <button>{EDIT_BTN}</button>
                </div>
            </div>
        </form>
    )
}